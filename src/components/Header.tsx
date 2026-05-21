import { useState, ChangeEvent } from "react";
import { Shield, ShoppingCart, UserPlus, Search, X, Compass, Swords, FileText, Anchor } from "lucide-react";
import { BRAND_NAME, PRODUCTS, GALLERY } from "../data";
import { AppPage } from "../types";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  currentPage: AppPage;
  onChangePage: (page: AppPage) => void;
  onOpenRecruiter: () => void;
  onSelectSearchResult: (type: "product" | "gallery", id: string) => void;
}

export default function Header({
  cartCount,
  onOpenCart,
  currentPage,
  onChangePage,
  onOpenRecruiter,
  onSelectSearchResult
}: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePageChange = (page: AppPage) => {
    onChangePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter items matching query
  const rawQuery = searchQuery.trim().toLowerCase();
  const matchedProducts = rawQuery
    ? PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(rawQuery) ||
          p.subtitle.toLowerCase().includes(rawQuery) ||
          p.description.toLowerCase().includes(rawQuery)
      )
    : [];

  const matchedGallery = rawQuery
    ? GALLERY.filter(
        (g) =>
          g.title.toLowerCase().includes(rawQuery) ||
          g.tagline.toLowerCase().includes(rawQuery) ||
          g.description.toLowerCase().includes(rawQuery) ||
          g.lore.toLowerCase().includes(rawQuery)
      )
    : [];

  const handleResultClick = (type: "product" | "gallery", id: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    onSelectSearchResult(type, id);
  };

  return (
    <header className="fixed top-0 w-full z-50 border-b border-brand-border backdrop-blur-md bg-brand-primary/90 shadow-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
        
        {/* Logo and Brand */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handlePageChange("home")}
          id="brand-logo"
        >
          <Shield className="text-brand-tertiary w-6 h-6 sm:w-8 sm:h-8 group-hover:rotate-12 transition-transform duration-500 fill-brand-tertiary/10" />
          <h1 className="font-h1-cinematic text-lg sm:text-2xl text-brand-tertiary tracking-widest uppercase transition-all duration-300 selection:bg-transparent">
            {BRAND_NAME}
          </h1>
        </div>

        {/* Navigation Categories - Multipage Tabs */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-8">
          <button
            onClick={() => handlePageChange("home")}
            className={`font-label-caps text-xs sm:text-sm tracking-widest pb-1 transition-all duration-300 pointer-events-auto cursor-pointer ${
              currentPage === "home"
                ? "text-brand-tertiary border-b-2 border-brand-tertiary font-bold"
                : "text-brand-light/70 hover:text-brand-tertiary"
            }`}
            id="nav-home"
          >
            INICIO
          </button>
          <button
            onClick={() => handlePageChange("chronicles")}
            className={`font-label-caps text-xs sm:text-sm tracking-widest pb-1 transition-all duration-300 pointer-events-auto cursor-pointer ${
              currentPage === "chronicles"
                ? "text-brand-tertiary border-b-2 border-brand-tertiary font-bold"
                : "text-brand-light/70 hover:text-brand-tertiary"
            }`}
            id="nav-chronicles"
          >
            AVENTURA HISTÓRICA
          </button>
          <button
            onClick={() => handlePageChange("store")}
            className={`font-label-caps text-xs sm:text-sm tracking-widest pb-1 transition-all duration-300 pointer-events-auto cursor-pointer ${
              currentPage === "store"
                ? "text-brand-tertiary border-b-2 border-brand-tertiary font-bold"
                : "text-brand-light/70 hover:text-brand-tertiary"
            }`}
            id="nav-store"
          >
            TIENDA ARSENAL
          </button>
          <button
            onClick={() => handlePageChange("gallery")}
            className={`font-label-caps text-xs sm:text-sm tracking-widest pb-1 transition-all duration-300 pointer-events-auto cursor-pointer ${
              currentPage === "gallery"
                ? "text-brand-tertiary border-b-2 border-brand-tertiary font-bold"
                : "text-brand-light/70 hover:text-brand-tertiary"
            }`}
            id="nav-gallery"
          >
            GALERÍA HISTÓRICA
          </button>
          <button
            onClick={() => handlePageChange("features")}
            className={`font-label-caps text-xs sm:text-sm tracking-widest pb-1 transition-all duration-300 pointer-events-auto cursor-pointer ${
              currentPage === "features"
                ? "text-brand-tertiary border-b-2 border-brand-tertiary font-bold"
                : "text-brand-light/70 hover:text-brand-tertiary"
            }`}
            id="nav-features"
          >
            JUGABILIDAD y SISTEMA
          </button>
          <button
            onClick={() => handlePageChange("register")}
            className={`font-label-caps text-xs sm:text-sm tracking-widest pb-1 transition-all duration-300 pointer-events-auto cursor-pointer ${
              currentPage === "register"
                ? "text-brand-tertiary border-b-2 border-brand-tertiary font-bold"
                : "text-brand-light/70 hover:text-brand-tertiary"
            }`}
            id="nav-register"
          >
            REGISTRARSE
          </button>
        </nav>

        {/* Utility CTAs */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Functional Search Toggle Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-brand-light hover:text-brand-tertiary transition-colors cursor-pointer group"
            title="Buscar en Sons of Hell"
            id="header-search-btn"
          >
            <Search className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform text-brand-tertiary" />
          </button>

          {/* Cart Icon representing persistent state */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-brand-light hover:text-brand-tertiary transition-colors cursor-pointer group"
            title="Ver Arsenal Comprado"
            id="cart-button"
          >
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-105 transition-transform text-brand-light" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-tertiary text-brand-primary font-sh-subheader text-[10px] w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Recruit Action Button - Primary Brand Button Style */}
          <button
            onClick={() => {
              handlePageChange("register");
            }}
            className="flex items-center gap-1.5 px-3 sm:px-5 py-2.5 bg-brand-tertiary text-brand-primary font-h1-cinematic text-[10px] sm:text-xs tracking-wider sm:tracking-widest font-bold hover:bg-[#c29668] transition-all duration-300 scale-95 active:scale-90 cursor-pointer rounded-[8px]"
            id="header-recruit"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">REGISTRARSE</span>
            <span className="sm:hidden">UNIRSE</span>
          </button>
        </div>
      </div>

      {/* DYNAMIC SEARCH CONSOLE OVERLAY */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-brand-primary flex flex-col justify-start p-4 sm:p-8 pt-24 sm:pt-32">
          
          <button
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery("");
            }}
            className="absolute top-6 right-6 p-2 text-brand-light hover:text-brand-tertiary border border-brand-border rounded-[8px] cursor-pointer"
            id="close-search-overlay"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-2xl w-full mx-auto flex flex-col gap-6">
            
            <div className="text-center mb-2">
              <span className="font-sh-subheader text-brand-tertiary text-xs tracking-widest block uppercase mb-1">
                REGISTROS Y LOGÍSTICA DE GUERRA
              </span>
              <h2 className="font-h1-cinematic text-2xl sm:text-4xl text-brand-light tracking-wide uppercase">
                BUSCADOR IMPERIAL
              </h2>
            </div>

            {/* Input fields */}
            <div className="relative">
              <Search className="absolute left-4 top-4.5 w-5 h-5 text-brand-tertiary/70" />
              <input
                type="text"
                placeholder="Escribe para buscar... (ej: Edición, Daga, Yelmo, Merch, Oro Lenca)"
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
                className="w-full bg-brand-surface border-2 border-brand-tertiary/30 text-white font-sans placeholder-brand-light/40 text-base sm:text-lg pl-12 pr-4 py-4 focus:border-brand-tertiary outline-none rounded-[8px] transition-all"
                id="lore-search-input"
              />
            </div>

            {/* Search results listings */}
            <div className="flex-1 overflow-y-auto max-h-[50vh] flex flex-col gap-6 p-1">
              {searchQuery.trim() === "" ? (
                <div className="text-center py-10 opacity-60 font-body-main text-brand-light text-sm">
                  Introduce términos para desenterrar información militar, productos y leyendas de 1521.
                </div>
              ) : matchedProducts.length === 0 && matchedGallery.length === 0 ? (
                <div className="text-center py-10 text-brand-light/55 font-sans">
                  ⚠️ No se han hallado registros militares para <span className="text-brand-tertiary italic">"{searchQuery}"</span>. Intenta con "Física", "Digital", "Daga", o "Yelmo".
                </div>
              ) : (
                <>
                  {/* Matching Store items */}
                  {matchedProducts.length > 0 && (
                    <div>
                      <h4 className="font-sh-subheader text-xs text-brand-tertiary tracking-widest border-b border-brand-border pb-2 mb-3 uppercase">
                        ⚔ COFRE DE ADQUISICIONES ({matchedProducts.length})
                      </h4>
                      <div className="flex flex-col gap-2.5">
                        {matchedProducts.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => handleResultClick("product", p.id)}
                            className="bg-brand-surface border border-brand-border hover:border-brand-tertiary p-3 flex gap-3 cursor-pointer hover:bg-brand-secondary/40 transition-all rounded-[10px]"
                            id={`search-result-product-${p.id}`}
                          >
                            <img src={p.image} alt={p.title} className="w-12 h-12 object-cover border border-brand-border rounded-[8px]" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-sh-subheader text-xs font-bold text-white uppercase">{p.title}</span>
                                <span className="text-brand-tertiary font-mono text-xs">{p.priceLabel}</span>
                              </div>
                              <span className="text-[10px] text-brand-light/70 font-sans line-clamp-1 mt-0.5">{p.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Lore/Gallery items */}
                  {matchedGallery.length > 0 && (
                    <div>
                      <h4 className="font-sh-subheader text-xs text-brand-tertiary tracking-widest border-b border-brand-border pb-2 mb-3 uppercase">
                        📜 CRÓNICAS DE INDIAS / HISTORIAS ({matchedGallery.length})
                      </h4>
                      <div className="flex flex-col gap-2.5">
                        {matchedGallery.map((g) => (
                          <div
                            key={g.id}
                            onClick={() => handleResultClick("gallery", g.id)}
                            className="bg-brand-surface border border-brand-border hover:border-brand-tertiary p-3 flex gap-3 cursor-pointer hover:bg-brand-secondary/40 transition-all rounded-[10px]"
                            id={`search-result-gallery-${g.id}`}
                          >
                            <img src={g.image} alt={g.title} className="w-12 h-12 object-cover border border-brand-border rounded-[8px]" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-sh-subheader text-xs font-bold text-white uppercase">{g.title}</span>
                                <span className="text-brand-tertiary font-mono text-[9px] uppercase tracking-wider">{g.tagline}</span>
                              </div>
                              <span className="text-[10px] text-brand-light/70 font-sans line-clamp-1 mt-0.5">{g.lore}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
