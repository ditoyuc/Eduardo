import { Compass, Swords, Scroll, Flame } from "lucide-react";
import { FEATURES } from "../data";

export default function Features() {

  // Map icon strings to Lucide components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Compass":
        return <Compass className="w-8 h-8 text-brand-tertiary group-hover:scale-110 transition-transform duration-500" />;
      case "Swords":
        return <Swords className="w-8 h-8 text-brand-tertiary group-hover:scale-110 transition-transform duration-500" />;
      case "Scroll":
        return <Scroll className="w-8 h-8 text-brand-tertiary group-hover:scale-110 transition-transform duration-500" />;
      case "Flame":
        return <Flame className="w-8 h-8 text-brand-tertiary group-hover:scale-110 transition-transform duration-500" />;
      default:
        return <Compass className="w-8 h-8 text-brand-tertiary" />;
    }
  };

  return (
    <section 
      id="features" 
      className="relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 lg:px-8 bg-brand-primary scroll-mt-20 overflow-hidden"
    >
      {/* Background visual detail */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-secondary/15 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-tertiary/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16 relative z-10">
          <span className="font-sh-subheader tracking-widest text-[#A67C52] text-xs font-bold block mb-2 uppercase">
            EXPERIENCIA INMERSIVA
          </span>
          <h2 className="font-h1-cinematic text-3xl sm:text-5xl text-brand-light tracking-wide uppercase">
            SISTEMA DE JUEGO
          </h2>
          <div className="w-20 h-[1.5px] bg-brand-tertiary/40 mx-auto mt-4" />
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {FEATURES.map((feature) => (
            <div 
              key={feature.id}
              className="bg-brand-surface border border-brand-border p-6 hover:bg-brand-secondary/20 hover:border-brand-tertiary/60 transition-all duration-300 ease-out flex flex-col items-center text-center group rounded-[10px] relative overflow-hidden shadow-lg"
              id={`feature-card-${feature.id}`}
            >
              {/* Corner Metallic Reinforcements mockup */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-border group-hover:border-brand-tertiary/50" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-border group-hover:border-brand-tertiary/50" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-border group-hover:border-brand-tertiary/50" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-border group-hover:border-brand-tertiary/50" />

              {/* Icon Sphere */}
              <div className="w-16 h-16 rounded-full border border-brand-tertiary/20 bg-[#0D0D0D]/50 flex items-center justify-center mb-6 text-brand-tertiary shadow-lg group-hover:bg-brand-tertiary/10 group-hover:border-brand-tertiary/40 transition-all duration-300">
                {getIcon(feature.icon)}
              </div>

              {/* Title using Medieval subheader font */}
              <h3 className="font-sh-subheader text-brand-light text-lg sm:text-xl font-bold tracking-wide uppercase mb-3 text-brand-tertiary/90 group-hover:text-brand-tertiary transition-colors">
                {feature.title}
              </h3>

              {/* Narrative body */}
              <p className="font-body-main text-base sm:text-lg text-brand-light/80 leading-relaxed text-justify px-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
