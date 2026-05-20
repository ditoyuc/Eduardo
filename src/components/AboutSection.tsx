import { ShieldAlert, Users, Sword, ArrowRight } from "lucide-react";
import { CONFLICT_IMAGE_URL } from "../data";

interface AboutSectionProps {
  onSelectFaction: (faction: "conquistador" | "defensor") => void;
}

export default function AboutSection({ onSelectFaction }: AboutSectionProps) {
  return (
    <section 
      id="about" 
      className="relative py-28 sm:py-36 md:py-44 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
    >
      {/* Decorative metal frame elements on edges */}
      <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-outline-variant/20 hidden md:block" />
      <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-outline-variant/20 hidden md:block" />

      <div className="max-w-7xl mx-auto">
        
        {/* Dark Majestic Chronicle Frame */}
        <div 
          className="bg-[#0e0d0c]/95 border-2 border-outline-variant/65 px-6 py-12 sm:px-12 sm:py-16 md:px-20 md:py-20 rounded-none shadow-2xl relative border-y-4 border-secondary/60 overflow-hidden"
          id="chronicle-container"
        >
          {/* Ancient Corner rivet style brackets */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#eebd8e] opacity-80" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#eebd8e] opacity-80" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#eebd8e] opacity-80" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#eebd8e] opacity-80" />

          {/* Section Heading Header matching screen */}
          <div className="text-center mb-12 sm:mb-16">
            <h4 className="font-sh-subheader tracking-widest text-[#eebd8e]/80 text-xs font-bold uppercase mb-2">
              EL DESTINO DE UN IMPERIO
            </h4>
            <h3 className="font-h1-cinematic text-3xl sm:text-5xl text-[#ffb3ad] tracking-wide uppercase">
              UNA TIERRA EN LLAMAS
            </h3>
            <div className="w-24 h-[1.5px] bg-[#eebd8e]/40 mx-auto mt-4" />
          </div>

          {/* Dual faction choice Quote Container */}
          <div className="max-w-3xl mx-auto text-center mb-16 px-4">
            <span className="font-sans font-light text-xl sm:text-2xl md:text-3xl text-secondary italic leading-relaxed block">
              "Honduras, 1521. El choque de dos mundos cambiará el destino del hombre. ¿Portarás la armadura de hierro o el espíritu del jaguar?"
            </span>
          </div>

          {/* Split Grid Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Narrative with Dual Interactive Badges */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              
              <p className="font-body-main text-lg sm:text-xl md:text-2xl text-on-surface-variant/90 leading-relaxed text-justify">
                Las Hibueras se desangran bajo el peso de las expediciones europeas de Hernán Cortés. En las selvas impenetrables y sobre los majestuosos templos milenarios, dos facciones irreconciliables forjan un choque histórico irreversible. No hay retroceso: la gloria eterna o la capitulación definitiva se deciden con cada gota de sudor y acero filtrados en la jungla caliente.
              </p>

              {/* Sub Factions Click to RPG Launcher Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                
                {/* Conquistador Banner launcher */}
                <div 
                  onClick={() => onSelectFaction("conquistador")}
                  className="bg-black/35 border-2 border-outline-variant/60 hover:border-[#ffb3ad] hover:bg-surface-container-high/40 transition-all group rounded-none p-5 cursor-pointer relative overflow-hidden"
                  title="Presiona para elegir el bando Conquistador"
                  id="choice-conquistador-card"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full border border-secondary/35 bg-surface-container/55 flex items-center justify-center p-2">
                      <span className="font-sh-subheader font-bold text-[#ffb3ad] text-sm">⚔</span>
                    </div>
                    <div>
                      <h5 className="font-sh-subheader text-white text-lg font-bold group-hover:text-secondary transition-colors">EL CONQUISTADOR</h5>
                      <span className="font-label-caps text-[10px] text-secondary tracking-wider block">PORTA EL ACERO DE MADRID</span>
                    </div>
                  </div>
                  <p className="font-body-main text-sm text-on-surface-variant/85 leading-normal mb-3 text-justify">
                    Bajo el amparo de la fe y el estandarte real de Carlos V, reclama la provincia de Trujillo desatando la artillería pesada.
                  </p>
                  <span className="font-label-caps text-xs text-secondary group-hover:text-[#ffb3ad] group-hover:font-extrabold flex items-center gap-1.5 transition-colors">
                    PROBAR PRÓLOGO <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform text-secondary group-hover:text-[#ffb3ad]" />
                  </span>
                </div>

                {/* Defensor Banner launcher */}
                <div 
                  onClick={() => onSelectFaction("defensor")}
                  className="bg-black/35 border-2 border-outline-variant/60 hover:border-secondary hover:bg-surface-container-high/40 transition-all group rounded-none p-5 cursor-pointer relative overflow-hidden"
                  title="Presiona para elegir el bando Lenca"
                  id="choice-defensor-card"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full border border-secondary/35 bg-surface-container/55 flex items-center justify-center p-2">
                      <span className="font-sh-subheader font-bold text-secondary text-sm">🔥</span>
                    </div>
                    <div>
                      <h5 className="font-sh-subheader text-white text-lg font-bold group-hover:text-secondary transition-colors">EL DEFENSOR</h5>
                      <span className="font-label-caps text-[10px] text-secondary tracking-wider block">ESPÍRITU DEL JAGUAR LENCA</span>
                    </div>
                  </div>
                  <p className="font-body-main text-sm text-on-surface-variant/85 leading-normal mb-3 text-justify">
                     Invoca la fuerza ancestral de la selva virgen para sofocar la intrusión barbada mediante trampas y flechas venenosas.
                  </p>
                  <span className="font-label-caps text-xs text-secondary group-hover:text-primary group-hover:font-extrabold flex items-center gap-1.5 transition-colors">
                    PROBAR PRÓLOGO <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform text-secondary group-hover:text-primary" />
                  </span>
                </div>

              </div>

            </div>

            {/* Right Illustrative Graphic Grid Side */}
            <div className="lg:col-span-5 h-full flex items-center justify-center relative">
              <div className="relative border-4 border-outline-variant/60 p-3.5 bg-black/40 max-w-sm sm:max-w-md w-full">
                {/* Rivets */}
                <span className="absolute top-1 left-1 font-mono text-[9px] text-[#eebd8e] opacity-65">⚙</span>
                <span className="absolute top-1 right-1 font-mono text-[9px] text-[#eebd8e] opacity-65">⚙</span>
                <span className="absolute bottom-1 left-1 font-mono text-[9px] text-[#eebd8e] opacity-65">⚙</span>
                <span className="absolute bottom-1 right-1 font-mono text-[9px] text-[#eebd8e] opacity-65">⚙</span>

                <img 
                  src={CONFLICT_IMAGE_URL} 
                  alt="Ancient medieval tactical confrontation artwork of Sons of Hell" 
                  referrerPolicy="no-referrer"
                  className="w-full object-cover shadow-2xl relative z-10 brightness-[0.88] hover:brightness-100 transition-all duration-500"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
