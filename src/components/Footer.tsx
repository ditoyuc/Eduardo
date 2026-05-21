import { Shield, Flame, Swords, Globe, Heart } from "lucide-react";
import { BRAND_NAME } from "../data";
import { AppPage } from "../types";

interface FooterProps {
  onChangePage: (page: AppPage) => void;
}

export default function Footer({ onChangePage }: FooterProps) {
  const handlePageChange = (page: AppPage) => {
    onChangePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-primary border-t border-brand-border/60 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Visual background details */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-secondary/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Shield and big heading */}
        <div className="flex flex-col items-center mb-10 select-none">
          <div className="w-12 h-12 rounded-full bg-brand-primary border border-brand-tertiary/40 flex items-center justify-center text-brand-tertiary mb-4 shadow-[0_0_15px_rgba(166,124,82,0.15)] animate-[pulse_3s_infinite]">
            <Shield className="w-6 h-6 fill-brand-tertiary/15 text-brand-tertiary" />
          </div>
          <h2 className="font-h1-cinematic text-2xl sm:text-4xl text-white tracking-widest font-black uppercase">
            {BRAND_NAME}
          </h2>
          <span className="font-label-caps text-[10px] tracking-[0.3em] text-brand-tertiary uppercase block mt-1.5">
            Hibueras • Anno 1521
          </span>
        </div>

        {/* Footer Links mapping categories */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mb-10 text-xs tracking-wider font-sh-subheader text-brand-light/75">
          <button 
            onClick={() => handlePageChange("home")}
            className="hover:text-brand-tertiary cursor-pointer transition-colors"
            id="footer-home"
          >
            INICIO
          </button>
          <button 
            onClick={() => handlePageChange("chronicles")}
            className="hover:text-brand-tertiary cursor-pointer transition-colors"
            id="footer-chronicles"
          >
            AVENTURA HISTÓRICA
          </button>
          <button 
            onClick={() => handlePageChange("store")}
            className="hover:text-brand-tertiary cursor-pointer transition-colors"
            id="footer-store"
          >
            TIENDA ARSENAL
          </button>
          <button 
            onClick={() => handlePageChange("gallery")}
            className="hover:text-brand-tertiary cursor-pointer transition-colors"
            id="footer-gallery"
          >
            GALERÍA HISTÓRICA
          </button>
          <button 
            onClick={() => handlePageChange("features")}
            className="hover:text-brand-tertiary cursor-pointer transition-colors"
            id="footer-gameplay"
          >
            JUGABILIDAD y SISTEMA
          </button>
          <button 
            onClick={() => handlePageChange("register")}
            className="hover:text-brand-tertiary cursor-pointer transition-colors"
            id="footer-register"
          >
            REGISTRARSE
          </button>
        </div>

        {/* Brand Vector Links approximation */}
        <div className="flex gap-4 mb-10">
          <button
            onClick={() => handlePageChange("home")}
            className="w-10 h-10 border border-brand-border hover:border-brand-tertiary flex items-center justify-center text-brand-light hover:text-brand-tertiary transition-all cursor-pointer bg-brand-surface rounded-[8px]"
            title="Sitio Oficial"
            id="footer-social-web"
          >
            <Globe className="w-4 h-4" />
          </button>
          <button
            onClick={() => handlePageChange("store")}
            className="w-10 h-10 border border-brand-border hover:border-brand-tertiary flex items-center justify-center text-brand-light hover:text-brand-tertiary transition-all cursor-pointer bg-brand-surface rounded-[8px]"
            title="Estandartes de Guerra"
            id="footer-social-swords"
          >
            <Swords className="w-4 h-4" />
          </button>
          <button
            onClick={() => handlePageChange("chronicles")}
            className="w-10 h-10 border border-brand-border hover:border-brand-tertiary flex items-center justify-center text-brand-light hover:text-brand-tertiary transition-all cursor-pointer bg-brand-surface rounded-[8px]"
            title="Breguas y Facciones"
            id="footer-social-flame"
          >
            <Flame className="w-4 h-4" />
          </button>
        </div>

        {/* Copy note and disclaimer labels */}
        <div className="text-center font-sh-subheader text-[10px] sm:text-xs text-brand-light/50 tracking-wider">
          <p className="uppercase mb-1.5" id="copyright-label">
            © 2026 {BRAND_NAME}. ALL GLORY TO THE EMPIRE. ALL RIGHTS RESERVED.
          </p>
          <p className="font-sans flex items-center justify-center gap-1.5 opacity-50">
            Forjado con <Heart className="w-3 h-3 text-brand-tertiary fill-brand-tertiary/60" /> para representaciones históricas de Trujillo, Honduras.
          </p>
        </div>

      </div>
    </footer>
  );
}
