import { Flame, Play, ArrowDown, ChevronRight } from "lucide-react";
import { HERO_VIDEO_MOCKUP_URL, GAME_LOGO_URL } from "../data";

interface HeroProps {
  onOpenTrailer: () => void;
  onScrollToStore: () => void;
}

export default function Hero({ onOpenTrailer, onScrollToStore }: HeroProps) {
  return (
    <section 
      id="hero"
      className="relative h-screen w-full flex flex-col items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Graphic with Vignetting */}
      <div className="absolute inset-0 z-0">
        <img 
          src={HERO_VIDEO_MOCKUP_URL} 
          alt="16th Century Honduras misty battle landscape background" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover grayscale-[0.3] contrast-125 brightness-[0.4]"
        />
        <div className="absolute inset-0 vignette z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-15" />
      </div>

      {/* Floating Sparkles & Ash Simulation Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-20 mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      {/* Hero Central Card */}
      <div className="relative z-20 text-center px-4 sm:px-6 max-w-4xl flex flex-col items-center">
        {/* Main Game Keyart Logo */}
        <div className="relative mb-6 sm:mb-8 group">
          <img 
            src={GAME_LOGO_URL} 
            alt="Sons of Hell Logo - Sword embedded in Aztec Jade Mask" 
            referrerPolicy="no-referrer"
            className="mx-auto w-56 sm:w-80 md:w-96 flicker-glow select-none pointer-events-none drop-shadow-[0_0_35px_rgba(238,189,142,0.2)] group-hover:scale-[1.02] transition-transform duration-1000"
          />
          {/* Subtle gold shine overlay */}
          <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-secondary/10 to-transparent rotate-45 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 pointer-events-none" />
        </div>

        {/* Sub-label Subheader */}
        <h2 className="font-sh-subheader text-brand-light text-sm sm:text-lg md:text-xl xl:text-2xl mb-10 tracking-widest uppercase selection:bg-brand-secondary/20 selection:text-brand-tertiary max-w-2xl px-4 text-center leading-relaxed">
          Defiende tus raíces, conquista tu historia.
        </h2>

        {/* Call to Actions (Mitered buttons aligned to Design System specifications) */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-center px-6">
          {/* Primary Button: Bronze (#A67C52) with Dark black text (#0D0D0D) and 8px rounding */}
          <button 
            onClick={onScrollToStore}
            className="group relative w-full sm:w-auto px-10 py-4 bg-brand-tertiary text-brand-primary font-h1-cinematic text-sm tracking-widest font-bold hover:bg-[#c29668] transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer rounded-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
            id="hero-buy"
          >
            COMPRAR AHORA
          </button>

          {/* Secondary Button: Transparent surface with bronze border, and #2B0505 dark blood-red hover overlay */}
          <button 
            onClick={onOpenTrailer}
            className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-brand-tertiary text-brand-light hover:text-brand-light hover:bg-[#2B0505] font-h1-cinematic text-sm tracking-widest font-bold transition-all duration-350 hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2 cursor-pointer rounded-[8px]"
            id="hero-trailer"
          >
            <Play className="w-4 h-4 text-brand-tertiary fill-brand-tertiary group-hover:fill-brand-light transition-colors" />
            <span>VER TRAILER</span>
          </button>
        </div>
      </div>
    </section>
  );
}
