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
        <h2 className="font-sh-subheader text-secondary text-sm sm:text-lg md:text-2xl mb-10 tracking-widest uppercase selection:bg-secondary/20 selection:text-secondary max-w-2xl px-4 text-center leading-relaxed">
          Defiende tus raíces, conquista tu historia.
        </h2>

        {/* Call to Actions (Mitered buttons) */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-center px-6">
          <button 
            onClick={onScrollToStore}
            className="group relative w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-primary-container border-2 border-secondary overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer rounded-none shadow-[0_4px_20px_rgba(43,5,5,0.5)]"
            id="hero-buy"
          >
            {/* Corner Rivet Details */}
            <span className="absolute top-1 left-1 w-1 h-1 bg-secondary rounded-full opacity-60"></span>
            <span className="absolute top-1 right-1 w-1 h-1 bg-secondary rounded-full opacity-60"></span>
            <span className="absolute bottom-1 left-1 w-1 h-1 bg-secondary rounded-full opacity-60"></span>
            <span className="absolute bottom-1 right-1 w-1 h-1 bg-secondary rounded-full opacity-60"></span>
            
            <span className="relative z-10 font-label-caps text-sm tracking-widest text-secondary group-hover:text-on-secondary transition-colors">
              COMPRAR AHORA
            </span>
            <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
          </button>

          <button 
            onClick={onOpenTrailer}
            className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 border-2 border-outline-variant text-on-surface-variant font-label-caps text-sm tracking-widest hover:border-secondary hover:text-secondary group transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer rounded-none"
            id="hero-trailer"
          >
            <Play className="w-4 h-4 fill-on-surface-variant group-hover:fill-secondary group-hover:text-secondary transition-colors" />
            <span>VER TRAILER</span>
          </button>
        </div>
      </div>
    </section>
  );
}
