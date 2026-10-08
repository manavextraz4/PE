export type CustomerType = 'Retail' | 'Wholesale';

export type EnquiryProgressStatus = 
  | 'Received'
  | 'Checking Stock'
  | 'Available for Pickup'
  | 'Dispatched'
  | 'Completed';

export interface StatusTimelineItem {
  status: EnquiryProgressStatus;
  timestamp: string;
  note: string;
}

export interface CustomerEnquiry {
  id: string; // e.g. PE-8492
  userId: string;
  userEmail?: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerType: CustomerType;
  vehicleModel: string;
  partRequired: string;
  quantity: string;
  brandPreference?: string;
  additionalNotes?: string;
  status: EnquiryProgressStatus;
  timeline: StatusTimelineItem[];
  estimatedAvailability?: string;
}

export interface CustomerUser {
  id: string;
  name: string;
  phone: string;
  customerType: CustomerType;
  businessName?: string;
  preferredVehicle?: string;
  createdAt: string;
}
