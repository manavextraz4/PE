import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User as FirebaseUser, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../firebase.ts';
import { CustomerUser, CustomerEnquiry, CustomerType, EnquiryProgressStatus } from '../types/customer.ts';

interface CustomerAuthContextType {
  currentUser: FirebaseUser | null;
  customerProfile: CustomerUser | null;
  enquiries: CustomerEnquiry[];
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfileType: (type: CustomerType, phone?: string) => Promise<void>;
  submitEnquiry: (enquiryData: Omit<CustomerEnquiry, 'id' | 'userId' | 'createdAt' | 'status' | 'timeline'>) => Promise<string>;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined);

export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [customerProfile, setCustomerProfile] = useState<CustomerUser | null>(null);
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch or create customer profile
        const userDocRef = doc(db, 'users', user.uid);
        try {
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setCustomerProfile(userDocSnap.data() as CustomerUser);
          } else {
            // Create initial customer profile
            const newProfile: CustomerUser = {
              id: user.uid,
              name: user.displayName || 'Valued Customer',
              phone: user.phoneNumber || '',
              customerType: 'Retail',
              createdAt: new Date().toISOString(),
            };
            await setDoc(userDocRef, newProfile);
            setCustomerProfile(newProfile);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
        }
      } else {
        setCustomerProfile(null);
        setEnquiries([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Listen to User Enquiries in real-time
  useEffect(() => {
    if (!currentUser) {
      setEnquiries([]);
      return;
    }

    const q = query(
      collection(db, 'enquiries'),
      where('userId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedEnquiries: CustomerEnquiry[] = [];
        snapshot.forEach((doc) => {
          fetchedEnquiries.push(doc.data() as CustomerEnquiry);
        });

        // Sort by creation date descending
        fetchedEnquiries.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setEnquiries(fetchedEnquiries);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'enquiries');
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google Sign-In Error: ', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Sign-Out Error: ', error);
      throw error;
    }
  };

  const updateProfileType = async (type: CustomerType, phone?: string) => {
    if (!currentUser || !customerProfile) return;
    const userDocRef = doc(db, 'users', currentUser.uid);
    const updated: CustomerUser = {
      ...customerProfile,
      customerType: type,
      phone: phone !== undefined ? phone : customerProfile.phone,
    };
    try {
      await setDoc(userDocRef, updated, { merge: true });
      setCustomerProfile(updated);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${currentUser.uid}`);
    }
  };

  const submitEnquiry = async (
    enquiryData: Omit<CustomerEnquiry, 'id' | 'userId' | 'createdAt' | 'status' | 'timeline'>
  ): Promise<string> => {
    if (!currentUser) {
      throw new Error('Please sign in with Google to record enquiries in your account.');
    }

    // Generate readable tracking ID e.g. PE-7842
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `PE-${randomSuffix}`;
    const nowIso = new Date().toISOString();

    const newEnquiry: CustomerEnquiry = {
      ...enquiryData,
      id: trackingId,
      userId: currentUser.uid,
      createdAt: nowIso,
      status: 'Received',
      timeline: [
        {
          status: 'Received',
          timestamp: nowIso,
          note: 'Enquiry received. Preeti Enterprises team is checking stock in Jeypore warehouse.',
        },
      ],
    };

    const docRef = doc(db, 'enquiries', trackingId);
    try {
      await setDoc(docRef, {
        ...newEnquiry,
        serverTime: serverTimestamp(),
      });
      return trackingId;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `enquiries/${trackingId}`);
      return trackingId;
    }
  };

  return (
    <CustomerAuthContext.Provider
      value={{
        currentUser,
        customerProfile,
        enquiries,
        isLoading,
        loginWithGoogle,
        logout,
        updateProfileType,
        submitEnquiry,
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext);
  if (!context) {
    throw new Error('useCustomerAuth must be used within a CustomerAuthProvider');
  }
  return context;
}
