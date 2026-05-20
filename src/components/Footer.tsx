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
    <footer className="bg-surface-container-lowest border-t border-outline-variant/30 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Visual background details */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Shield and big heading */}
        <div className="flex flex-col items-center mb-10 select-none">
          <div className="w-12 h-12 rounded-full bg-background border border-outline-variant/50 flex items-center justify-center text-secondary mb-4 flicker-glow">
            <Shield className="w-6 h-6 fill-secondary/15" />
          </div>
          <h2 className="font-h1-cinematic text-2xl sm:text-4xl text-primary tracking-widest font-black uppercase">
            {BRAND_NAME}
          </h2>
          <span className="font-label-caps text-[10px] tracking-[0.3em] text-[#eebd8e] uppercase block mt-1">
            Hibueras • Anno 1521
          </span>
        </div>

        {/* Footer Links mapping categories */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mb-10 text-xs tracking-wider font-label-caps text-on-surface-variant">
          <button 
            onClick={() => handlePageChange("home")}
            className="hover:text-secondary cursor-pointer transition-colors"
            id="footer-home"
          >
            INICIO
          </button>
          <button 
            onClick={() => handlePageChange("chronicles")}
            className="hover:text-secondary cursor-pointer transition-colors"
            id="footer-chronicles"
          >
            AVENTURA HISTÓRICA
          </button>
          <button 
            onClick={() => handlePageChange("store")}
            className="hover:text-secondary cursor-pointer transition-colors"
            id="footer-store"
          >
            TIENDA ARSENAL
          </button>
          <button 
            onClick={() => handlePageChange("gallery")}
            className="hover:text-secondary cursor-pointer transition-colors"
            id="footer-gallery"
          >
            GALERÍA HISTÓRICA
          </button>
          <button 
            onClick={() => handlePageChange("features")}
            className="hover:text-secondary cursor-pointer transition-colors"
            id="footer-gameplay"
          >
            JUGABILIDAD y SISTEMA
          </button>
          <button 
            onClick={() => handlePageChange("register")}
            className="hover:text-secondary cursor-pointer transition-colors"
            id="footer-register"
          >
            REGISTRARSE
          </button>
        </div>

        {/* Brand Vector Links approximation */}
        <div className="flex gap-4 mb-10">
          <button
            onClick={() => handlePageChange("home")}
            className="w-10 h-10 border border-outline-variant/40 hover:border-secondary flex items-center justify-center text-[#e5e2e1] hover:text-secondary transition-all cursor-pointer bg-transparent"
            title="Sitio Oficial"
            id="footer-social-web"
          >
            <Globe className="w-4 h-4" />
          </button>
          <button
            onClick={() => handlePageChange("store")}
            className="w-10 h-10 border border-outline-variant/40 hover:border-secondary flex items-center justify-center text-[#e5e2e1] hover:text-secondary transition-all cursor-pointer bg-transparent"
            title="Estandartes de Guerra"
            id="footer-social-swords"
          >
            <Swords className="w-4 h-4" />
          </button>
          <button
            onClick={() => handlePageChange("chronicles")}
            className="w-10 h-10 border border-outline-variant/40 hover:border-secondary flex items-center justify-center text-[#e5e2e1] hover:text-secondary transition-all cursor-pointer bg-transparent"
            title="Breguas y Facciones"
            id="footer-social-flame"
          >
            <Flame className="w-4 h-4" />
          </button>
        </div>

        {/* Copy note and disclaimer labels */}
        <div className="text-center font-sh-subheader text-[10px] sm:text-xs text-on-surface-variant/60 tracking-wider">
          <p className="uppercase mb-1.5" id="copyright-label">
            © 2026 {BRAND_NAME}. ALL GLORY TO THE EMPIRE. ALL RIGHTS RESERVED.
          </p>
          <p className="font-sans flex items-center justify-center gap-1.5 opacity-50">
            Forjado con <Heart className="w-3 h-3 text-[#ffb3ad] fill-[#ffb3ad]" /> para representaciones históricas de Trujillo, Honduras.
          </p>
        </div>

      </div>
    </footer>
  );
}
