import { useState, ChangeEvent } from "react";
import { PREVIEW_TRAILERS } from "../data";
import { X, Play, Pause, Volume2, Maximize2, Tv, Film } from "lucide-react";

interface TrailerModalProps {
  onClose: () => void;
}

export default function TrailerModal({ onClose }: TrailerModalProps) {
  const [selectedTrailerIndex, setSelectedTrailerIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(70);
  const [playProgress, setPlayProgress] = useState(48); // Current timeline location index percentage mockup

  const activeTrailer = PREVIEW_TRAILERS[selectedTrailerIndex] || PREVIEW_TRAILERS[0];

  const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayProgress(Number(e.target.value));
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <div 
      className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
      id="trailer-backdrop"
    >
      <div 
        className="bg-background border-2 border-outline-variant max-w-4xl w-full relative shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        id="trailer-modal-shell"
      >
        {/* Ornate corner bolts */}
        <span className="absolute top-2 left-2 text-secondary/30 font-mono text-[9px]">⚙</span>
        <span className="absolute top-2 right-2 text-secondary/30 font-mono text-[9px]">⚙</span>

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-outline-variant/30 px-6 py-4 bg-surface-container-low/50">
          <div className="flex items-center gap-2">
            <Film className="text-secondary w-5 h-5 animate-pulse" />
            <h3 className="font-h1-cinematic text-sm sm:text-base text-on-surface tracking-wider uppercase">
              REPRODUCTOR CINEMÁTICO DE AVANCES
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 px-2.5 text-on-surface hover:text-secondary font-sh-subheader text-base border border-outline-variant/35 rounded-none cursor-pointer"
            id="close-trailer-btn"
          >
            CERRAR ✕
          </button>
        </div>

        {/* Main Screening Theater Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Direct stream simulated center block */}
          <div className="lg:col-span-8 bg-black aspect-video relative group flex flex-col justify-end">
            
            {/* Visual backdrop overlay representing live trailer capture */}
            <div className="absolute inset-0 z-0">
              <img 
                src={activeTrailer.videoMockup} 
                alt={activeTrailer.title} 
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-opacity duration-500 pb-0.5 ${
                  isPlaying ? "brightness-95 contrast-110" : "brightness-[0.4] contrast-75"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35" />
            </div>

            {/* Play pause overlay icon */}
            {!isPlaying && (
              <div 
                onClick={() => setIsPlaying(true)}
                className="absolute inset-x-0 bottom-1/2 top-1/4 flex items-center justify-center cursor-pointer z-20"
              >
                <div className="w-16 h-16 rounded-full border-2 border-secondary bg-black/60 flex items-center justify-center text-secondary hover:scale-115 transition-transform">
                  <Play className="w-8 h-8 fill-secondary translate-x-0.5" />
                </div>
              </div>
            )}

            {/* Simulated Live timing display tag */}
            <div className="absolute top-4 left-4 bg-red-600/85 text-white font-mono text-[10px] px-2.5 py-0.5 z-20 uppercase font-bold tracking-widest flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-white block" />
              <span>ESTRENO</span>
            </div>

            {/* Control Bar element panel inside theater */}
            <div className="p-4 sm:p-5 relative z-10 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-3">
              
              {/* Scrub timeline scrubber line */}
              <div className="w-full flex items-center gap-3">
                <span className="font-mono text-[10px] text-on-surface-variant">01:03</span>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={playProgress}
                  onChange={handleProgressChange}
                  className="flex-1 accent-secondary h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                  id="trailer-timeline-slider"
                />
                <span className="font-mono text-[10px] text-secondary">{activeTrailer.duration}</span>
              </div>

              {/* Auxiliary buttons */}
              <div className="flex items-center justify-between">
                
                {/* Play parameters */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 px-2 border border-[#eebd8e]/30 bg-neutral-900/40 text-secondary hover:border-secondary transition-colors cursor-pointer"
                    id="trailer-play-pause"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-secondary" /> : <Play className="w-4 h-4 fill-secondary" />}
                  </button>

                  {/* Volume block dials */}
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-on-surface-variant" />
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-16 sm:w-20 accent-secondary h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                      id="trailer-volume-dial"
                    />
                  </div>
                </div>

                {/* Display tag */}
                <span className="font-sans text-[10px] text-on-surface-variant/75 hidden sm:block italic">
                  Sons of Hell pre-rendered build preview
                </span>

                <Maximize2 className="w-4 h-4 text-on-surface-variant cursor-pointer hover:text-secondary transition-colors" />

              </div>

            </div>

          </div>

          {/* Right Selection sidebar lists */}
          <div className="lg:col-span-4 bg-surface-container bg-opacity-40 border-t lg:border-t-0 lg:border-l border-outline-variant/30 flex flex-col justify-between">
            
            {/* Carousel selections listing */}
            <div className="p-4 sm:p-5 flex flex-col gap-4">
              <span className="font-label-caps text-[10px] text-secondary/60 tracking-widest block uppercase">
                SELECCIONAR CAPÍTULO:
              </span>

              <div className="flex flex-col gap-3">
                {PREVIEW_TRAILERS.map((trailer, trIdx) => (
                  <button
                    key={trIdx}
                    onClick={() => {
                      setSelectedTrailerIndex(trIdx);
                      setIsPlaying(true);
                      setPlayProgress(trIdx === 0 ? 48 : 12);
                    }}
                    className={`p-3 text-left border flex flex-col gap-1.5 transition-all cursor-pointer ${
                      selectedTrailerIndex === trIdx
                        ? "bg-surface-container border-secondary/70 text-on-surface"
                        : "bg-black/20 border-outline-variant/30 text-on-surface-variant hover:bg-black/35"
                    }`}
                    id={`trailer-select-btn-${trIdx}`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-sh-subheader text-xs font-bold tracking-wide uppercase">
                        {trailer.title}
                      </span>
                      <span className="text-[10px] font-mono text-secondary">{trailer.duration}</span>
                    </div>
                    <p className="font-body-main text-xs text-on-surface-variant leading-relaxed">
                      {trailer.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick summary specs block below list */}
            <div className="p-4 sm:p-5 border-t border-outline-variant/30 bg-black/45">
              <div className="flex items-center gap-2 text-[#eebd8e] mb-1.5 font-sh-subheader text-[10px] uppercase">
                <Tv className="w-3.5 h-3.5" />
                <span>INFORMACIÓN DEL FORMATO</span>
              </div>
              <p className="font-sans text-[10px] text-on-surface-variant/80 leading-normal">
                Grabado íntegramente con fidelidad 4K HDR a 60 cuadros por segundo. Los aspectos visuales son capturas genuinas de terrenos selváticos reales.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
