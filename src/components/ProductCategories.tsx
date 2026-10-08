import { useState } from 'react';
import { 
  Cog, 
  Disc, 
  Layers, 
  Zap, 
  Activity, 
  Cable, 
  ShieldCheck, 
  Wrench,
  AlertCircle,
  Phone,
  MessageCircle,
  Search
} from 'lucide-react';
import { PRODUCT_CATEGORIES, CategoryItem, BUSINESS_INFO } from '../data/businessData.ts';

interface ProductCategoriesProps {
  onSelectCategory?: (categoryName: string) => void;
}

export function ProductCategories({ onSelectCategory }: ProductCategoriesProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Icon mapping
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cog':
        return <Cog className="w-5 h-5" />;
      case 'Disc':
        return <Disc className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'Cable':
        return <Cable className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Wrench':
      default:
        return <Wrench className="w-5 h-5" />;
    }
  };

  const handleEnquire = (category: CategoryItem) => {
    if (onSelectCategory) {
      onSelectCategory(category.name);
    }
    const target = document.getElementById('requirement-finder');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppCategory = (category: CategoryItem) => {
    const text = `Hello Preeti Enterprises, I want to enquire about two-wheeler ${category.name} (including ${category.items.slice(0, 3).join(', ')}). Please let me know current availability and price.`;
    const url = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="products" className="py-16 sm:py-20 lg:py-24 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Two-Wheeler Only · Motorcycles & Scooters
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Two-Wheeler Auto Parts & Accessories
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Specialized replacement parts and accessories for Indian motorcycles and scooters. Contact us to check availability for your bike or scooter model.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCT_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="group rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-orange-500/40 hover:bg-slate-900 transition-all duration-200 flex flex-col overflow-hidden shadow-lg hover:shadow-orange-950/20"
            >
              {/* Category Image Header */}
              <div className="relative h-44 overflow-hidden bg-slate-950">
                <img
                  src={category.image}
                  alt={`${category.name} for two-wheelers`}
                  className="w-full h-full object-cover object-center filter contrast-105 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                
                {/* Floating category icon */}
                <div className="absolute top-3 left-3 w-10 h-10 rounded-lg bg-slate-950/90 border border-slate-700/80 backdrop-blur-md flex items-center justify-center text-orange-400 shadow-md">
                  {renderIcon(category.icon)}
                </div>

                {/* Two-Wheeler specific badge */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-slate-950/90 border border-slate-700/80 backdrop-blur-md text-[10px] font-semibold text-orange-400 uppercase tracking-wider">
                  2-Wheeler
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-orange-400 transition-colors">
                  {category.name}
                </h3>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                  {category.description}
                </p>

                {/* Parts list */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                    Common Items Include:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {category.items.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-3 border-t border-slate-800/80 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => handleWhatsAppCategory(category)}
                    className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs shadow-md shadow-emerald-950/40 transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0"
                    aria-label={`Chat on WhatsApp about ${category.name}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleEnquire(category)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 font-medium text-[11px] transition-colors"
                  >
                    <Search className="w-3 h-3 text-orange-400" />
                    <span>Check Availability Form</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer Note Banner */}
        <div className="mt-10 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-300">
              <span className="font-semibold text-white">Notice: </span>
              Product availability may vary. Contact us for current stock and specific requirements.
              We deal in both wholesale bulk quantities and retail single-part purchases.
            </div>
          </div>

          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Preeti Enterprises, I want to check availability for two-wheeler auto parts.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors flex-shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
