import { MessageSquareText, SearchCheck, MapPinCheck, ArrowRight } from 'lucide-react';

export function HowToEnquire() {
  const steps = [
    {
      number: '01',
      title: 'Tell Us What You Need',
      description: 'Share your bike/scooter model and required part.',
      icon: MessageSquareText,
    },
    {
      number: '02',
      title: 'Check Availability',
      description: 'Our team can help you check the required part.',
      icon: SearchCheck,
    },
    {
      number: '03',
      title: 'Visit or Enquire',
      description: 'Visit Preeti Enterprises or contact the shop for your requirement.',
      icon: MapPinCheck,
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Simple Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How to Buy / Enquire
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Three straightforward steps to source your two-wheeler components.
          </p>
        </div>

        {/* 3 Step Process Container */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-slate-900/80 border border-slate-800 p-8 flex flex-col items-start hover:border-slate-700 transition-all shadow-md group"
              >
                {/* Step indicator */}
                <div className="w-full flex items-center justify-between mb-6">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-orange-500 group-hover:scale-110 transition-transform">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-600 group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow indicator between steps for desktop */}
                {idx < 2 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-20 text-slate-600">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
