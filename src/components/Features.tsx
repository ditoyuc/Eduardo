import { Compass, Swords, Scroll, Flame } from "lucide-react";
import { FEATURES } from "../data";

export default function Features() {

  // Map icon strings to Lucide components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Compass":
        return <Compass className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform duration-500" />;
      case "Swords":
        return <Swords className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform duration-500" />;
      case "Scroll":
        return <Scroll className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform duration-500" />;
      case "Flame":
        return <Flame className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform duration-500" />;
      default:
        return <Compass className="w-8 h-8 text-secondary" />;
    }
  };

  return (
    <section 
      id="features" 
      className="relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 lg:px-8 bg-black/90 scroll-mt-20 overflow-hidden"
    >
      {/* Background visual detail */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16 relative z-10">
          <span className="font-sh-subheader tracking-widest text-[#eebd8e] text-xs font-bold block mb-2 uppercase">
            EXPERIENCIA INMERSIVA
          </span>
          <h2 className="font-h1-cinematic text-3xl sm:text-5xl text-on-surface tracking-wide uppercase">
            SISTEMA DE JUEGO
          </h2>
          <div className="w-20 h-[1.5px] bg-secondary/40 mx-auto mt-4" />
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {FEATURES.map((feature) => (
            <div 
              key={feature.id}
              className="bg-surface-container/60 border border-outline-variant/45 p-6 hover:bg-surface-container-high hover:border-secondary/40 transition-all duration-300 ease-out flex flex-col items-center text-center group rounded-none relative overflow-hidden"
              id={`feature-card-${feature.id}`}
            >
              {/* Corner Metallic Reinforcements mockup */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-outline-variant/30 group-hover:border-secondary/50" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-outline-variant/30 group-hover:border-secondary/50" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-outline-variant/30 group-hover:border-secondary/50" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-outline-variant/30 group-hover:border-secondary/50" />

              {/* Icon Sphere */}
              <div className="w-16 h-16 rounded-full border border-secondary/20 bg-background/50 flex items-center justify-center mb-6 text-secondary shadow-lg group-hover:bg-secondary/10 group-hover:border-secondary/40 transition-all duration-300">
                {getIcon(feature.icon)}
              </div>

              {/* Title using Medieval subheader font */}
              <h3 className="font-sh-subheader text-on-surface text-lg sm:text-xl font-bold tracking-wide uppercase mb-3 text-secondary/90 group-hover:text-secondary transition-colors">
                {feature.title}
              </h3>

              {/* Narrative body */}
              <p className="font-body-main text-base sm:text-lg text-on-surface-variant/80 leading-relaxed text-justify px-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
