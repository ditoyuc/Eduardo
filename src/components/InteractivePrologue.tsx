import { useState, useRef } from "react";
import { STORIES } from "../data";
import { Faction } from "../types";
import { Swords, Compass, Trophy, RotateCcw, Shield, MapPin, Scroll, Sparkles } from "lucide-react";

interface InteractivePrologueProps {
  initialFaction: Faction | null;
  onClose: () => void;
}

export default function InteractivePrologue({ initialFaction, onClose }: InteractivePrologueProps) {
  const [selectedFaction, setSelectedFaction] = useState<Faction | null>(initialFaction);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [previousOutcomes, setPreviousOutcomes] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [finalEnding, setFinalEnding] = useState<{title: string; text: string} | null>(null);
  
  // Game metrics (health or respect points)
  const [metrics, setMetrics] = useState({
    salud: 100,
    honor: 50,
    oro: 20
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const resetGame = () => {
    setSelectedFaction(null);
    setCurrentStepIndex(0);
    setPreviousOutcomes([]);
    setIsGameOver(false);
    setFinalEnding(null);
    setMetrics({ salud: 100, honor: 50, oro: 20 });
  };

  const selectFaction = (faction: Faction) => {
    setSelectedFaction(faction);
    setCurrentStepIndex(0);
    setPreviousOutcomes([]);
    setIsGameOver(false);
    setFinalEnding(null);
    // Custom set values based on faction
    if (faction === "conquistador") {
      setMetrics({ salud: 100, honor: 60, oro: 40 });
    } else {
      setMetrics({ salud: 100, honor: 90, oro: 10 });
    }
  };

  // Process selected action
  const handleChoiceSelect = (choice: { text: string; outcome: string; next: string }) => {
    // Append outcome text to history
    setPreviousOutcomes([...previousOutcomes, choice.outcome]);

    // Handle health metrics modifications randomly to make it more tactical
    let scoreMod = { salud: 0, honor: 0, oro: 0 };
    if (choice.text.includes("pólvora") || choice.text.includes("mosquete")) {
      scoreMod = { salud: -15, honor: -10, oro: -5 };
    } else if (choice.text.includes("calma") || choice.text.includes("negociar")) {
      scoreMod = { salud: 0, honor: 20, oro: +15 };
    } else if (choice.text.includes("suicida") || choice.text.includes("Cargar")) {
      scoreMod = { salud: -40, honor: 35, oro: 0 };
    } else {
      scoreMod = { salud: -5, honor: 10, oro: 5 };
    }

    setMetrics(prev => ({
      salud: Math.max(10, prev.salud + scoreMod.salud),
      honor: Math.max(10, prev.honor + scoreMod.honor),
      oro: Math.max(5, prev.oro + scoreMod.oro)
    }));

    // Handle progression or ending
    if (choice.next.startsWith("final-")) {
      setIsGameOver(true);
      determineEnding(choice.next);
    } else {
      // Advance stage to index 1, 2, etc. (we have 3 sequential scenario blocks)
      setCurrentStepIndex(prev => prev + 1);
    }

    // Scroll top
    scrollContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const determineEnding = (endingKey: string) => {
    let title = "";
    let text = "";

    switch (endingKey) {
      case "final-c1":
        title = "EL VIRREY SITIADO";
        text = "Has conquistado el templo profanando sus deidades nativas. Tus arcas desbordan con lunas de oro puro y barajas de jade. La capital Trujillo ahora lleva tu nombre rústico tallado en piedra, pero el descontento es absoluto. Cada silbido del viento en el follaje te recuerda que de las sombras surgirá, tarde o temprano, la flecha con veneno de águila destinada a cobrar tu codicia.";
        break;
      case "final-c2":
        title = "EL CAPITÁN DIPLOMÁTICO";
        text = "Al negociar pacíficamente respetando las deidades antiguas de la Serpiente, has forjado una paz fructífera sin precedentes históricos. El nuevo virreinato prospera con bajas bajas castellanas. Eres ungido como el hidalgo sabio por el Consejo de Indias en Sevilla, logrando vivir tranquilo en tu hacienda adornada con plumas sagradas de quetzal.";
        break;
      case "final-d1":
        title = "EL ESPÍRITU INMORTAL LENCA";
        text = "Por asaltar suicidamente la carpa del general español, has clavado el macuahuitl de obsidiana en su pecho ambicioso, diezmando la moral imperial. Los barcos reman asustados de regreso a la bruma atlántica. Los grabados esculpidos a mano inmortalizarán tu nombre por encima de los siglos como la luz del jaguar sagrado de Hibueras.";
        break;
      case "final-d2":
        title = "EL RENACIMIENTO LENCA";
        text = "Tu ardid para estallar la pólvora castellana en las empalizadas destruyó el asedio por completo. Las legiones europeas huyen intimidadas por tu demostración de audacia táctica militar. Los sabios declaran una era de prosperidad libre de yugos, alzando obeliscos de piedra en Copán para entronizar tu victoria sagrada.";
        break;
      default:
        title = "LEYENDA PERDIDA";
        text = "Tu nombre perece bajo el húmedo fango de las canopias de Hibueras. Mas el espíritu del cacao y el jaguar siempre recordará tu sacrificio desinteresado.";
    }

    setFinalEnding({ title, text });
  };

  const currentStory = selectedFaction ? STORIES[selectedFaction][currentStepIndex] : null;

  return (
    <section 
      id="chronicles-game"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-surface-container-lowest border-y border-outline-variant/30 scroll-mt-24"
      ref={scrollContainerRef}
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Card Frame Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-3">
            <Scroll className="text-secondary w-8 h-8 animate-pulse" />
          </div>
          <h2 className="font-h1-cinematic text-2xl sm:text-4xl text-on-surface tracking-wide uppercase">
            CHRONICLES OF 1521
          </h2>
          <span className="font-label-caps text-xs tracking-[0.25em] text-[#eebd8e] block uppercase mt-2">
            MÓDULO DE AVENTURA INTERACTIVA
          </span>
          <p className="font-body-main text-base sm:text-lg text-on-surface-variant/70 mt-3 max-w-xl mx-auto">
            Toma decisiones críticas que reescribirán la historia de la pacificación o resistencia en el territorio sagrado de Hibueras.
          </p>
        </div>

        {/* Main Interface Terminal */}
        <div className="bg-background border-2 border-outline-variant rounded-none shadow-2xl relative min-h-[450px] flex flex-col justify-between overflow-hidden">
          
          {/* Rivets and corner metal brackets */}
          <span className="absolute top-1 left-1.5 font-mono text-[9px] text-[#A67C52] opacity-50">⚙</span>
          <span className="absolute top-1 right-1.5 font-mono text-[9px] text-[#A67C52] opacity-50">⚙</span>
          <span className="absolute bottom-1 left-1.5 font-mono text-[9px] text-[#A67C52] opacity-50">⚙</span>
          <span className="absolute bottom-1 right-1.5 font-mono text-[#eebd8e] text-[9px] opacity-50">⚙</span>

          {/* Faction selector state */}
          {!selectedFaction ? (
            <div className="p-8 sm:p-12 text-center my-auto flex flex-col items-center">
              <span className="font-sh-subheader text-secondary text-sm tracking-widest block mb-4">FASE I: SELECCIONA TU BANDO</span>
              <h3 className="font-h1-cinematic text-xl sm:text-2xl text-on-surface mb-8">¿QUÉ LEGADO DECIDIRÁS DEFENDER?</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
                
                {/* Conquistador Choice */}
                <button
                  onClick={() => selectFaction("conquistador")}
                  className="bg-surface-container/40 border border-outline-variant p-6 hover:border-secondary/70 hover:bg-surface-container-high/60 transition-all duration-300 group cursor-pointer text-left rounded-none flex flex-col justify-between"
                  id="conquistador-select-btn"
                >
                  <div>
                    <div className="w-12 h-12 rounded-full border border-[#A67C52]/50 bg-black flex items-center justify-center text-[#ffb3ad] mb-4 group-hover:bg-[#ffb3ad] group-hover:text-black transition-all">
                      <Swords className="w-5 h-5" />
                    </div>
                    <span className="font-sh-subheader text-on-surface text-lg block mb-1">EL CONQUISTADOR</span>
                    <span className="font-label-caps text-[10px] text-secondary tracking-widest block mb-3">CONQUISTA INMEDIATA</span>
                    <p className="font-body-main text-sm text-on-surface-variant/80">
                      Rellena tus arcas de oro con la bendición papal. Tu espada toledana no conoce límites de selva bajo la orden real.
                    </p>
                  </div>
                  <span className="font-label-caps text-xs text-secondary mt-6 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                    INGRESAR A LA EXPERIENCIA →
                  </span>
                </button>

                {/* Defensor Choice */}
                <button
                  onClick={() => selectFaction("defensor")}
                  className="bg-surface-container/40 border border-outline-variant p-6 hover:border-secondary/70 hover:bg-surface-container-high/60 transition-all duration-300 group cursor-pointer text-left rounded-none flex flex-col justify-between"
                  id="defensor-select-btn"
                >
                  <div>
                    <div className="w-12 h-12 rounded-full border border-[#A67C52]/50 bg-black flex items-center justify-center text-[#ffb4ab] mb-4 group-hover:bg-[#ffb4ab] group-hover:text-black transition-all">
                      <Shield className="w-5 h-5 animate-pulse" />
                    </div>
                    <span className="font-sh-subheader text-on-surface text-lg block mb-1">EL DEFENSOR</span>
                    <span className="font-label-caps text-[10px] text-secondary tracking-widest block mb-3">ESPÍRITU SAGRADO</span>
                    <p className="font-body-main text-sm text-on-surface-variant/80">
                      Domina el sigilo ancestral de las deidades de Hibueras. Haz que los conquistadores se ahoguen bajo sus propias cotas de malla.
                    </p>
                  </div>
                  <span className="font-label-caps text-xs text-secondary mt-6 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                    INGRESAR A LA EXPERIENCIA →
                  </span>
                </button>

              </div>
            </div>
          ) : (
            <>
              {/* Top status parameters of Active Game */}
              <div className="border-b border-outline-variant/30 px-6 py-4 bg-surface-container-low/40 flex items-center justify-between flex-wrap gap-4">
                
                {/* Active faction indicators */}
                <div className="flex items-center gap-3">
                  <span className={`w-3.5 h-3.5 rounded-full ${selectedFaction === "conquistador" ? "bg-red-400" : "bg-emerald-400"} animate-ping-slow`} />
                  <span className="font-sh-subheader text-xs text-on-surface uppercase tracking-widest font-bold">
                    MODO: BANDO {selectedFaction === "conquistador" ? "ESPAÑOL" : "LENCA"}
                  </span>
                </div>

                {/* Simulated dynamic statistics */}
                <div className="flex items-center gap-6 text-xs font-mono text-secondary">
                  <div className="flex items-center gap-2">
                    <span className="text-red-300 font-sh-subheader">♥ SALUD:</span>
                    <span className="font-bold text-on-surface">{metrics.salud}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-secondary font-sh-subheader">✧ HONOR:</span>
                    <span className="font-bold text-on-surface">{metrics.honor} XP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-300 font-sh-subheader">$ RIQUEZA:</span>
                    <span className="font-bold text-on-surface">{metrics.oro}</span>
                  </div>
                </div>

                <button 
                  onClick={resetGame}
                  className="font-label-caps text-[10px] text-on-surface-variant hover:text-secondary flex items-center gap-1 cursor-pointer"
                  id="reset-story-flow"
                >
                  <RotateCcw className="w-3 h-3" /> CAMBIAR BANDO
                </button>
              </div>

              {/* Main Scrolling Body Log */}
              <div className="p-6 sm:p-10 flex-1 flex flex-col justify-center">
                
                {/* Out of step narrative history (shows how your previous decisions influenced your state) */}
                {previousOutcomes.length > 0 && (
                  <div className="mb-6 border-l-2 border-secondary/20 pl-4 py-2 flex flex-col gap-3 opacity-60">
                    {previousOutcomes.slice(-1).map((outcome, index) => (
                      <p key={index} className="font-body-main text-base sm:text-lg italic text-[#eebd8e] leading-relaxed">
                        Anteriormente: "{outcome}"
                      </p>
                    ))}
                  </div>
                )}

                {/* Current Scenario Card */}
                {!isGameOver && currentStory ? (
                  <div className="flex flex-col gap-6" id={`story-step-${currentStepIndex}`}>
                    <div className="flex items-center gap-2 text-secondary text-xs font-sh-subheader tracking-wider">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>CRÓNICA PART {currentStepIndex + 1} DE 3</span>
                    </div>
                    <p className="font-body-main text-xl sm:text-2xl text-on-surface leading-relaxed text-justify">
                      {currentStory.scenario}
                    </p>

                    {/* Interactive Choose Box */}
                    <div className="flex flex-col gap-4 mt-6">
                      {currentStory.choices.map((choice, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleChoiceSelect(choice)}
                          className="bg-surface-container-high/40 border-2 border-outline-variant p-4 sm:p-5 hover:border-secondary hover:bg-secondary/10 text-on-surface hover:text-secondary text-left font-body-main text-lg sm:text-xl transition-all duration-300 cursor-pointer rounded-none group flex items-start gap-3.5 relative"
                          id={`story-choice-${idx}`}
                        >
                          {/* Counter indicator */}
                          <span className="font-sh-subheader font-bold text-secondary text-xs sm:text-sm border border-secondary/30 rounded-none w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-black transition-all">
                            {idx === 0 ? "A" : "B"}
                          </span>
                          <span className="leading-snug">{choice.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Game Ending View */
                  finalEnding && (
                    <div className="text-center p-4 sm:p-8 border border-outline-variant bg-surface-container/20 rounded-none relative" id="story-ending-card">
                      
                      {/* Interactive medal emblem */}
                      <div className="w-16 h-16 rounded-full bg-secondary/10 border border-secondary flex items-center justify-center mx-auto mb-6">
                        <Trophy className="text-secondary w-8 h-8 animate-bounce" />
                      </div>

                      <h4 className="font-sh-subheader text-xs text-secondary tracking-widest mb-2 uppercase">Destino Escrito en Sangre</h4>
                      <h3 className="font-h1-cinematic text-2xl sm:text-3xl text-[#ffdad7] mb-6 tracking-wide">
                        {finalEnding.title}
                      </h3>
                      
                      <p className="font-body-main text-lg sm:text-xl md:text-2xl text-on-surface/90 leading-relaxed text-justify max-w-2xl mx-auto mb-10 border-t border-b border-outline-variant/30 py-6">
                        {finalEnding.text}
                      </p>

                      {/* Score card indicators of legendary status */}
                      <div className="flex items-center justify-center gap-8 mb-10 text-xs sm:text-sm font-sh-subheader text-on-surface-variant">
                        <div>
                          <span className="text-red-400 block mb-1">♥ SALUD RESTANTE</span>
                          <span className="text-lg font-bold text-on-surface">{metrics.salud}%</span>
                        </div>
                        <div className="w-[1px] h-8 bg-outline-variant" />
                        <div>
                          <span className="text-secondary block mb-1">✧ HONOR ACUMULADO</span>
                          <span className="text-lg font-bold text-on-surface">{metrics.honor} XP</span>
                        </div>
                        <div className="w-[1px] h-8 bg-outline-variant" />
                        <div>
                          <span className="text-amber-400 block mb-1">💰 CONTROL TERRITORIAL</span>
                          <span className="text-lg font-bold text-on-surface">NIVEL PROVINCIA</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                          onClick={resetGame}
                          className="px-8 py-3 bg-secondary text-black font-label-caps text-xs tracking-widest hover:bg-[#ffdad7] transition-all duration-300 rounded-none cursor-pointer"
                          id="play-again-btn"
                        >
                          REPETIR HISTORIA
                        </button>
                        <button
                          onClick={onClose}
                          className="px-8 py-3 bg-transparent border-2 border-outline-variant text-on-surface font-label-caps text-xs tracking-widest hover:border-secondary hover:text-secondary transition-all rounded-none cursor-pointer"
                          id="close-prologue-btn"
                        >
                          CERRAR CRÓNICAS
                        </button>
                      </div>

                    </div>
                  )
                )}

              </div>
            </>
          )}

        </div>

      </div>
    </section>
  );
}
