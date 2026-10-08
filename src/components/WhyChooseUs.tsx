import { 
  Boxes, 
  Bike, 
  MapPin, 
  PhoneCall, 
  UserCheck 
} from 'lucide-react';

export function WhyChooseUs() {
  const reasons = [
    {
      title: 'No. 1 Wholesaler & Retail',
      description: 'No. 1 two-wheeler auto parts wholesaler in undivided Koraput district, serving retailers, workshops, and individual riders.',
      icon: Boxes,
      highlight: 'Undivided Koraput Dist.',
    },
    {
      title: 'Two-Wheeler Focus',
      description: 'Dedicated to motorcycle and scooter auto-parts requirements.',
      icon: Bike,
      highlight: 'Motorcycles & Scooters',
    },
    {
      title: 'Convenient Local Location',
      description: 'Located at Purnagard Chowk, Canal Road, Jeypore.',
      icon: MapPin,
      highlight: 'Canal Road, Jeypore',
    },
    {
      title: 'Easy Enquiries',
      description: 'Customers can quickly call the shop to ask about parts and availability.',
      icon: PhoneCall,
      highlight: 'Direct Contact',
    },
    {
      title: 'Customer-Focused Service',
      description: 'Make it easy for customers to explain their vehicle and part requirements.',
      icon: UserCheck,
      highlight: 'Direct Assistance',
    },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-20 lg:py-24 bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Our Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Choose Preeti Enterprises?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            A reliable local dealer committed to simplifying two-wheeler spare parts procurement in Jeypore.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, idx) => {
            const IconComponent = reason.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-orange-500/40 hover:bg-slate-950 transition-all duration-200 group flex flex-col justify-between shadow-md"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500/20 group-hover:scale-105 transition-all">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-white tracking-tight group-hover:text-orange-400 transition-colors">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    {reason.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-orange-400/80">{reason.highlight}</span>
                  <span className="text-slate-400">0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
