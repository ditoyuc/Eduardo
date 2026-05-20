import { useState, useEffect, FormEvent } from "react";
import { RECRUIT_SPECIALTIES } from "../data";
import { Faction, RecruitProfile } from "../types";
import { User, Shield, Swords, Plus, Minus, Printer, Check, Trash2, HelpCircle } from "lucide-react";

interface FactionsRecruiterProps {
  onClose: () => void;
}

export default function FactionsRecruiter({ onClose }: FactionsRecruiterProps) {
  const [profileName, setProfileName] = useState("");
  const [selectedFaction, setSelectedFaction] = useState<Faction>("conquistador");
  const [selectedSpecialtyIndex, setSelectedSpecialtyIndex] = useState(0);
  
  // Custom stat points tracker
  const [customStats, setCustomStats] = useState({
    fuerza: 50,
    fe: 50,
    agilidad: 50,
    honor: 50
  });
  
  const [pointsPool, setPointsPool] = useState(40); // Allocation budget points
  const [generatedCard, setGeneratedCard] = useState<RecruitProfile | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  // Sync stats when specialty changes
  useEffect(() => {
    const list = RECRUIT_SPECIALTIES[selectedFaction];
    const spec = list[selectedSpecialtyIndex] || list[0];
    if (spec) {
      setCustomStats({
        fuerza: spec.stats.fuerza,
        fe: spec.stats.fe,
        agilidad: spec.stats.agilidad,
        honor: spec.stats.honor
      });
      setPointsPool(40); // Reset pool after prefill
    }
  }, [selectedFaction, selectedSpecialtyIndex]);

  const handleFactionChange = (fac: Faction) => {
    setSelectedFaction(fac);
    setSelectedSpecialtyIndex(0);
  };

  const adjustStat = (stat: "fuerza" | "fe" | "agilidad" | "honor", amount: number) => {
    if (amount > 0 && pointsPool <= 0) return; // Empty pool
    const val = customStats[stat];
    if (amount < 0 && val <= 30) return; // Limit min stat
    if (amount > 100 && val >= 100) return; // Limit max stat

    setCustomStats((prev) => ({ ...prev, [stat]: prev[stat] + amount }));
    setPointsPool((prev) => prev - amount);
  };

  const handleGenerate = (e: FormEvent) => {
    e.preventDefault();
    const finalName = profileName.trim() || "Guerrero Anónimo";
    const currentSpec = RECRUIT_SPECIALTIES[selectedFaction][selectedSpecialtyIndex];

    const finalizedProfile: RecruitProfile = {
      name: finalName,
      faction: selectedFaction,
      specialty: currentSpec.name,
      stats: { ...customStats },
      weapon: currentSpec.weapon,
      armor: currentSpec.armor,
      bio: currentSpec.bio
    };

    setGeneratedCard(finalizedProfile);
  };

  const handlePrintMockup = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      alert(`¡Felicitaciones! Has impreso la Carta de Estandarte para "${generatedCard?.name}". ¡Listo para unirse a las filas de 1521!`);
    }, 1500);
  };

  const currentSpecialtiesList = RECRUIT_SPECIALTIES[selectedFaction];
  const activeSpec = currentSpecialtiesList[selectedSpecialtyIndex] || currentSpecialtiesList[0];

  return (
    <div className="bg-[#111111] p-6 sm:p-10 border border-outline-variant relative max-w-4xl mx-auto rounded-none shadow-2xl overflow-hidden self-center">
      {/* Absolute borders */}
      <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-outline-variant/30" />
      <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-outline-variant/30" />

      {/* Main Title Banner */}
      <div className="text-center mb-8 relative z-10">
        <h2 className="font-h1-cinematic text-xl sm:text-3xl text-on-surface tracking-wider uppercase">
          CENTRO DE RECLUTAMIENTO
        </h2>
        <span className="font-label-caps text-xs text-[#eebd8e] tracking-widest block mt-1 uppercase">
          Sello de Alistamiento Militar v.1521
        </span>
        <div className="w-16 h-[2px] bg-secondary/35 mx-auto mt-3" />
      </div>

      {!generatedCard ? (
        /* Setup Form view */
        <form onSubmit={handleGenerate} className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          
          {/* Left panel customization mechanics */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Action Name Label Input */}
            <div id="recruiter-name-section">
              <label className="font-sh-subheader text-[#eebd8e] text-xs tracking-widest block mb-2 uppercase">
                Nombre del Soldado o Guerrero:
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-secondary/50" />
                <input
                  type="text"
                  maxLength={25}
                  required
                  placeholder="Por ejemplo: Don Gonzalo de Trujillo o Lempira el Grande"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full bg-background/50 border border-outline-variant text-[#e5e2e1] font-body-main pl-10 pr-4 py-2.5 outline-none focus:border-secondary hover:border-outline transition-all rounded-none"
                  id="recruit-name-input"
                />
              </div>
            </div>

            {/* Select Faction Selector tabs with details */}
            <div id="recruiter-faction-section">
              <label className="font-sh-subheader text-[#eebd8e] text-xs tracking-widest block mb-3 uppercase">
                Elegir Estandarte y Bando:
              </label>
              <div className="grid grid-cols-2 gap-4">
                
                {/* Conquistador select */}
                <button
                  type="button"
                  onClick={() => handleFactionChange("conquistador")}
                  className={`py-3 px-4 border text-center transition-all cursor-pointer font-sh-subheader text-xs sm:text-sm ${
                    selectedFaction === "conquistador"
                      ? "bg-primary-container-low border-[#ffb3ad] text-primary"
                      : "bg-background/25 border-outline-variant/60 text-[#e5e2e1]/70 hover:border-outline"
                  }`}
                  id="recruit-faction-conquistador"
                >
                  ⚜ IMPERIO ESPAÑOL
                </button>

                {/* Defensor select */}
                <button
                  type="button"
                  onClick={() => handleFactionChange("defensor")}
                  className={`py-3 px-4 border text-center transition-all cursor-pointer font-sh-subheader text-xs sm:text-sm ${
                    selectedFaction === "defensor"
                      ? "bg-primary-container-low border-[#ffb4ab] text-primary"
                      : "bg-background/25 border-outline-variant/60 text-[#e5e2e1]/70 hover:border-outline"
                  }`}
                  id="recruit-faction-defensor"
                >
                  🐆 LEGIÓN JAGUAR
                </button>

              </div>
            </div>

            {/* Specialty Selection and carousel */}
            <div id="recruiter-specialty-section">
              <label className="font-sh-subheader text-[#eebd8e] text-xs tracking-widest block mb-2 uppercase">
                Elegir Especialidad táctica:
              </label>
              <div className="flex flex-col gap-2.5">
                {currentSpecialtiesList.map((spec, idx) => (
                  <button
                    key={spec.name}
                    type="button"
                    onClick={() => setSelectedSpecialtyIndex(idx)}
                    className={`p-3 text-left border flex items-center justify-between transition-all cursor-pointer ${
                      selectedSpecialtyIndex === idx
                        ? "bg-surface-container-high border-[#eebd8e] text-white"
                        : "bg-background/10 border-outline-variant/40 text-on-surface-variant hover:bg-background/25"
                    }`}
                    id={`recruit-spec-btn-${idx}`}
                  >
                    <div>
                      <span className="font-sh-subheader text-xs sm:text-sm block">{spec.name}</span>
                      <span className="font-sans text-[10px] text-on-surface-variant/75 block mt-0.5">
                        Arma: {spec.weapon}
                      </span>
                    </div>
                    {selectedSpecialtyIndex === idx && <Check className="w-4 h-4 text-secondary" />}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right side statistical allocator and item summary */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-surface-container/30 border border-outline-variant/60 p-5 rounded-none">
            
            {/* Prefill specialty summary details */}
            <div className="mb-6">
              <span className="font-label-caps text-[10px] text-[#eebd8e] tracking-widest block mb-1 uppercase">DETALLES DE HISTORIAL</span>
              <h4 className="font-sh-subheader text-base text-white border-b border-outline-variant/20 pb-2 mb-2">
                {activeSpec.name}
              </h4>
              <p className="font-body-main text-xs sm:text-sm text-on-surface-variant/85 italic leading-relaxed text-justify mb-4">
                "{activeSpec.bio}"
              </p>

              <div className="grid grid-cols-2 gap-y-2 gap-x-4 border-b border-outline-variant/20 pb-4 text-xs font-sans">
                <div>
                  <span className="text-secondary font-sh-subheader text-[10px] block uppercase">ARMA DE COMBATE</span>
                  <span className="text-white text-xs">{activeSpec.weapon}</span>
                </div>
                <div>
                  <span className="text-secondary font-sh-subheader text-[10px] block uppercase font-bold">PROTECCIÓN</span>
                  <span className="text-white text-xs">{activeSpec.armor}</span>
                </div>
              </div>
            </div>

            {/* Custom attributes points adjuster */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-label-caps text-[10px] text-[#eebd8e] tracking-widest uppercase">ASIGNAR ATRIBUTOS</span>
                <span className="bg-secondary/15 text-[#eebd8e] font-mono text-xs px-2 py-0.5">
                  RESERVA DE PUNTOS: {pointsPool}
                </span>
              </div>

              {/* Adjuster list */}
              <div className="flex flex-col gap-3 font-sh-subheader text-xs text-on-surface-variant">
                
                {/* Stat Strength */}
                <div className="flex items-center justify-between">
                  <span className="uppercase">✊ FUERZA TÁCTICA</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={customStats.fuerza <= 30}
                      onClick={() => adjustStat("fuerza", -5)}
                      className="w-6 h-6 border border-outline-variant bg-black hover:border-secondary flex items-center justify-center p-0.5 disabled:opacity-30 cursor-pointer"
                    >
                      <Minus className="w-3 h-3 text-secondary" />
                    </button>
                    <span className="font-bold text-sm w-9 text-center text-white">{customStats.fuerza}</span>
                    <button
                      type="button"
                      disabled={pointsPool <= 0 || customStats.fuerza >= 100}
                      onClick={() => adjustStat("fuerza", 5)}
                      className="w-6 h-6 border border-outline-variant bg-black hover:border-secondary flex items-center justify-center p-0.5 disabled:opacity-30 cursor-pointer"
                    >
                      <Plus className="w-3 h-3 text-secondary" />
                    </button>
                  </div>
                </div>

                {/* Stat Faith */}
                <div className="flex items-center justify-between">
                  <span className="uppercase">✙ DEVER / FE SAGRADA</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={customStats.fe <= 30}
                      onClick={() => adjustStat("fe", -5)}
                      className="w-6 h-6 border border-outline-variant bg-black hover:border-secondary flex items-center justify-center p-0.5 disabled:opacity-30 cursor-pointer"
                    >
                      <Minus className="w-3 h-3 text-secondary" />
                    </button>
                    <span className="font-bold text-sm w-9 text-center text-white">{customStats.fe}</span>
                    <button
                      type="button"
                      disabled={pointsPool <= 0 || customStats.fe >= 100}
                      onClick={() => adjustStat("fe", 5)}
                      className="w-6 h-6 border border-outline-variant bg-black hover:border-secondary flex items-center justify-center p-0.5 disabled:opacity-30 cursor-pointer"
                    >
                      <Plus className="w-3 h-3 text-secondary" />
                    </button>
                  </div>
                </div>

                {/* Stat Agility */}
                <div className="flex items-center justify-between">
                  <span className="uppercase">🗲 AGILIDAD / SIGILO</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={customStats.agilidad <= 30}
                      onClick={() => adjustStat("agilidad", -5)}
                      className="w-6 h-6 border border-outline-variant bg-black hover:border-secondary flex items-center justify-center p-0.5 disabled:opacity-30 cursor-pointer"
                    >
                      <Minus className="w-3 h-3 text-secondary" />
                    </button>
                    <span className="font-bold text-sm w-9 text-center text-white">{customStats.agilidad}</span>
                    <button
                      type="button"
                      disabled={pointsPool <= 0 || customStats.agilidad >= 100}
                      onClick={() => adjustStat("agilidad", 5)}
                      className="w-6 h-6 border border-outline-variant bg-black hover:border-secondary flex items-center justify-center p-0.5 disabled:opacity-30 cursor-pointer"
                    >
                      <Plus className="w-3 h-3 text-secondary" />
                    </button>
                  </div>
                </div>

                {/* Stat Honor */}
                <div className="flex items-center justify-between">
                  <span className="uppercase">🛡 HONOR GUERRERO</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={customStats.honor <= 30}
                      onClick={() => adjustStat("honor", -5)}
                      className="w-6 h-6 border border-outline-variant bg-black hover:border-secondary flex items-center justify-center p-0.5 disabled:opacity-30 cursor-pointer"
                    >
                      <Minus className="w-3 h-3 text-secondary" />
                    </button>
                    <span className="font-bold text-sm w-9 text-center text-white">{customStats.honor}</span>
                    <button
                      type="button"
                      disabled={pointsPool <= 0 || customStats.honor >= 100}
                      onClick={() => adjustStat("honor", 5)}
                      className="w-6 h-6 border border-outline-variant bg-black hover:border-secondary flex items-center justify-center p-0.5 disabled:opacity-30 cursor-pointer"
                    >
                      <Plus className="w-3 h-3 text-secondary" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Launch Cards Generator */}
            <button
              type="submit"
              className="w-full bg-[#ffb3ad] hover:bg-[#ffdad7] border border-[#ffb3ad] text-[#51221f] hover:text-black py-3 font-label-caps text-xs tracking-widest font-bold scale-100 active:scale-95 transition-all cursor-pointer rounded-none"
              id="generate-recruit-id"
            >
              GENERAR PLACA DE ALISTAMIENTO
            </button>
          </div>

        </form>
      ) : (
        /* Render Finished Collectible Badge Card */
        <div className="flex flex-col items-center py-6 relative z-10" id="recruit-card-rendered">
          
          {/* Card Parchment */}
          <div className="parchment-texture border-4 border-[#A67C52] max-w-sm w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden mb-8">
            {/* Rivets */}
            <span className="absolute top-2 left-2 text-[#A67C52] text-xs font-mono">⚙</span>
            <span className="absolute top-2 right-2 text-[#A67C52] text-xs font-mono">⚙</span>
            <span className="absolute bottom-2 left-2 text-[#A67C52] text-xs font-mono">⚙</span>
            <span className="absolute bottom-2 right-2 text-[#A67C52] text-xs font-mono">⚙</span>

            {/* Faction Banner Seal */}
            <div className="text-center pb-4 border-b border-on-secondary/35">
              <span className="font-label-caps text-[9px] tracking-widest text-[#2b0505]/70 block uppercase">
                ESTANDARTE AUTÓNOMO DE COMBATE
              </span>
              <h3 className="font-h1-cinematic text-lg text-on-primary-fixed mt-1">
                {generatedCard.faction === "conquistador" ? "⚔ IMPERIO ESPAÑOL" : "🐆 DEFENSORES LENCAS"}
              </h3>
            </div>

            {/* Soldado Bio ID */}
            <div className="py-6 text-center">
              <span className="font-label-caps text-[9px] text-[#2b0505]/65 block tracking-wider uppercase">IDENTIDAD</span>
              <h4 className="font-h1-cinematic text-xl sm:text-2xl text-on-primary-fixed block font-black mt-1 leading-snug">
                {generatedCard.name}
              </h4>
              <span className="font-sh-subheader text-xs text-[#2b0505]/85 border border-on-secondary/40 px-3 py-1 mt-2.5 inline-block">
                Especialidad: {generatedCard.specialty}
              </span>
            </div>

            {/* Specs Stats list */}
            <div className="border-t border-b border-on-secondary/35 py-4 my-2 flex flex-col gap-2 font-sh-subheader text-xs text-[#2b0505]">
              <div className="flex justify-between items-center">
                <span>✊ FUERZA TÁCTICA:</span>
                <span className="font-bold underline text-sm">{generatedCard.stats.fuerza}/100</span>
              </div>
              <div className="flex justify-between items-center">
                <span>✙ FERVOR Y SACRIFICIO:</span>
                <span className="font-bold underline text-sm">{generatedCard.stats.fe}/100</span>
              </div>
              <div className="flex justify-between items-center">
                <span>🗲 AGILIDAD GUERRERA:</span>
                <span className="font-bold underline text-sm">{generatedCard.stats.agilidad}/100</span>
              </div>
              <div className="flex justify-between items-center">
                <span>🛡 HONOR DE ESTANDARTE:</span>
                <span className="font-bold underline text-sm">{generatedCard.stats.honor}/100</span>
              </div>
            </div>

            {/* Equip summary */}
            <div className="pt-4 text-xs font-sans text-on-primary-fixed/90 leading-tight">
              <div>
                <span className="font-sh-subheader text-[10px] text-[#2b0505]/70 mr-1.5 uppercase">EQUIPAMIENTO:</span>
                <strong>{generatedCard.weapon}</strong> con <strong>{generatedCard.armor}</strong>.
              </div>
              <p className="font-body-main text-sm text-[#2b0505]/85 italic block mt-3 text-justify leading-relaxed">
                "{generatedCard.bio}"
              </p>
            </div>

          </div>

          {/* Action triggers */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-sm">
            <button
              onClick={handlePrintMockup}
              disabled={isPrinting}
              className="flex items-center justify-center gap-2 w-full bg-secondary hover:bg-[#ffdad7] text-black py-3 font-label-caps text-xs tracking-widest font-bold transition-all duration-300 cursor-pointer disabled:opacity-40 rounded-none shadow-md"
              id="card-print-btn"
            >
              <Printer className="w-4 h-4" />
              <span>{isPrinting ? "SOCIABILIZANDO ESTANDARTE..." : "IMPRIMIR ARCHIVO"}</span>
            </button>
            <button
              onClick={() => setGeneratedCard(null)}
              className="w-full bg-transparent border-2 border-outline-variant hover:border-secondary hover:text-secondary text-on-surface py-3 font-label-caps text-xs tracking-widest transition-all rounded-none cursor-pointer"
              id="card-remake-btn"
            >
              NUEVO RECLUTA
            </button>
          </div>

        </div>
      )}

      {/* Manual support close */}
      <div className="text-center mt-6">
        <button
          onClick={onClose}
          className="font-sh-subheader text-xs text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
          id="recruiter-manual-close"
        >
          ← RETORNAR AL PORTAL PRINCIPAL
        </button>
      </div>

    </div>
  );
}
