import { useState, useEffect } from "react";
import { GameProduct } from "../types";
import { PRODUCTS } from "../data";
import { Search, ArrowRight, Eye, Sparkles, Filter, X } from "lucide-react";

interface SearchResultsPageProps {
  onSelectProduct: (product: GameProduct) => void;
  initialQuery?: string;
}

export default function SearchResultsPage({ onSelectProduct, initialQuery = "" }: SearchResultsPageProps) {
  const [query, setQuery] = useState(initialQuery);
  const [activeEditionFilter, setActiveEditionFilter] = useState<string>("all");
  const [activePlatformFilter, setActivePlatformFilter] = useState<string>("all");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Automatic suggestions triggered on input
  useEffect(() => {
    const rawValue = query.toLowerCase().trim();
    if (!rawValue) {
      setSuggestions([]);
      return;
    }

    // List of dynamic historical query suggestions
    const universe = [
      "Coleccionista",
      "Deluxe",
      "Estándar",
      "Sudadera",
      "Física",
      "Daga",
      "Toledo",
      "Merch",
      "Sons",
      "Xbox",
      "PlayStation",
      "PC",
      "Nintendo"
    ];

    const filtered = universe.filter((term) =>
      term.toLowerCase().includes(rawValue) && term.toLowerCase() !== rawValue
    ).slice(0, 4);

    setSuggestions(filtered);
  }, [query]);

  const handleSuggestionClick = (suggested: string) => {
    setQuery(suggested);
    setSuggestions([]);
  };

  // Perform dynamic filtering of products
  const lowercaseQuery = query.toLowerCase().trim();
  const filteredProducts = PRODUCTS.filter((p) => {
    // 1. Text Search matching title, subtitle, alt, includes, description
    const matchesText = lowercaseQuery
      ? p.title.toLowerCase().includes(lowercaseQuery) ||
        p.subtitle.toLowerCase().includes(lowercaseQuery) ||
        p.description.toLowerCase().includes(lowercaseQuery) ||
        p.includes.some((inc) => inc.toLowerCase().includes(lowercaseQuery))
      : true;

    // 2. Edition type filtering
    const matchesEdition = activeEditionFilter === "all" ? true : p.editionType === activeEditionFilter;

    // 3. Platform option filtering
    const matchesPlatform = activePlatformFilter === "all" ? true : (p.platforms?.includes(activePlatformFilter) || p.editionType === "merch");

    return matchesText && matchesEdition && matchesPlatform;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="search-page-block">
      
      {/* Search page heading */}
      <div className="text-center mb-12">
        <span className="font-sh-subheader tracking-widest text-secondary text-xs font-bold block mb-2 uppercase">
          LOGÍSTICA CONTEMPORÁNEA RR GAMES
        </span>
        <h2 className="font-h1-cinematic text-3xl sm:text-5xl text-on-surface tracking-wide uppercase">
          BUSCADOR DE ADQUISICIONES
        </h2>
        <div className="w-20 h-[1.5px] bg-[#eebd8e]/40 mx-auto mt-4" />
      </div>

      <div className="bg-[#0e0e0e] border border-outline-variant/50 p-6 md:p-8 mb-10 shadow-2xl relative">
        <span className="absolute top-1.5 left-2 text-[#eebd8e]/40 text-[8px]">⚙</span>
        <span className="absolute top-1.5 right-2 text-[#eebd8e]/40 text-[8px]">⚙</span>

        {/* Search input field with suggestion dropdown */}
        <div className="flex flex-col gap-4 relative">
          <label className="font-sh-subheader text-xs text-secondary tracking-widest uppercase block">
            INDAGAR REGISTROS DE PRODUCTO Y EDICIONES:
          </label>
          
          <div className="relative">
            <Search className="absolute left-4 top-4 w-5 h-5 text-secondary/70" />
            <input
              type="text"
              placeholder="Introduce términos como: Coleccionista, Deluxe, Sudadera, Toledo, Lenca..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#161515] border-2 border-[#A67C52]/35 text-white font-sans placeholder-zinc-500 text-base sm:text-lg pl-12 pr-10 py-3.5 focus:border-secondary transition-colors outline-none rounded-none"
              id="search-page-input-field"
            />
            {query && (
              <button 
                onClick={() => setQuery("")}
                className="absolute right-4 top-4.5 text-zinc-500 hover:text-white cursor-pointer"
                title="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* SUGGESTIONS POPUP DROPDOWN */}
          {suggestions.length > 0 && (
            <div className="absolute top-[82px] left-0 w-full bg-[#0D0D0D] border border-secondary/30 z-30 shadow-2xl flex flex-col divide-y divide-outline-variant/30">
              <span className="px-4 py-1 text-[9px] text-[#A67C52] font-sh-subheader tracking-widest uppercase bg-[#181313]">SUGERENCIAS SUTILES:</span>
              {suggestions.map((item) => (
                <button
                  key={item}
                  onClick={() => handleSuggestionClick(item)}
                  className="w-full text-left font-sans text-xs text-zinc-300 hover:bg-[#2B0505]/40 hover:text-white px-4 py-2.5 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>{item}</span>
                  <ArrowRight className="w-3 h-3 text-secondary/60" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic filter tags row */}
        <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-outline-variant/20">
          
          {/* Edition filtration */}
          <div className="flex items-center gap-2.5">
            <Filter className="w-3.5 h-3.5 text-[#A67C52]" />
            <span className="font-sh-subheader text-[10px] text-zinc-400 uppercase tracking-wider">Edición:</span>
            <div className="flex bg-black/50 p-0.5 border border-outline-variant/30">
              {[
                { label: "Todas", value: "all" },
                { label: "Estándar", value: "standard" },
                { label: "Deluxe", value: "deluxe" },
                { label: "Coleccionista", value: "collector" },
                { label: "Merch", value: "merch" }
              ].map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setActiveEditionFilter(btn.value)}
                  className={`px-3 py-1 font-sans text-xs transition-colors rounded-none cursor-pointer ${
                    activeEditionFilter === btn.value
                      ? "bg-[#2B0505] text-[#eebd8e] border-b border-secondary"
                      : "text-zinc-500 hover:text-zinc-300 bg-transparent"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Platform filter configurations */}
          <div className="flex items-center gap-2.5">
            <span className="font-sh-subheader text-[10px] text-zinc-400 uppercase tracking-wider">Soporte:</span>
            <div className="flex bg-black/50 p-0.5 border border-outline-variant/30">
              {[
                { label: "Todas", value: "all" },
                { label: "PC", value: "PC" },
                { label: "PlayStation 5", value: "PlayStation 5" },
                { label: "Xbox", value: "Xbox Series X" },
                { label: "Nintendo Switch", value: "Nintendo Switch" }
              ].map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setActivePlatformFilter(btn.value)}
                  className={`px-3 py-1 font-sans text-xs transition-colors rounded-none cursor-pointer ${
                    activePlatformFilter === btn.value
                      ? "bg-[#2B0505] text-[#eebd8e] border-b border-secondary"
                      : "text-zinc-500 hover:text-zinc-300 bg-transparent"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* SEARCH RESULTS FEED */}
      <h3 className="font-sh-subheader text-secondary text-sm block mb-6 uppercase tracking-widest text-left">
        {filteredProducts.length === 1 
          ? `Se ha localizado 1 adquisición registrada` 
          : `Se han localizado ${filteredProducts.length} adquisiciones registradas`}
      </h3>

      {filteredProducts.length === 0 ? (
        /* EMPTY STATE RENDER */
        <div className="text-center py-20 bg-[#0e0e0e] border border-dashed border-outline-variant/30 p-8 flex flex-col items-center gap-4" id="search-empty-state">
          <span className="text-4xl">⚔</span>
          <div>
            <h4 className="font-h1-cinematic text-lg text-white tracking-widest uppercase">REGISTRO MILITAR VACÍO</h4>
            <p className="font-body-main text-zinc-400 text-base max-w-md mx-auto mt-2 leading-relaxed">
              No hemos hallado nada militar bajo el término de búsqueda <span className="text-[#eebd8e] italic font-mono font-bold">"{query}"</span>. Intenta buscar términos asociados, como "Coleccionista", "Deluxe", o cambia tus filtros medievales superiores.
            </p>
          </div>
          <button 
            onClick={() => {
              setQuery("");
              setActiveEditionFilter("all");
              setActivePlatformFilter("all");
            }}
            className="mt-2 bg-[#2B0505] hover:bg-neutral-900 border border-secondary text-[#eebd8e] font-label-caps text-xs py-2.5 px-6 tracking-widest cursor-pointer transition-colors"
          >
            DISIPAR FILTROS Y REINICIAR RUMBO
          </button>
        </div>
      ) : (
        /* GRID LISTING */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="search-results-grid">
          {filteredProducts.map((p) => (
            <div 
              key={p.id}
              onClick={() => onSelectProduct(p)}
              className="bg-surface-container-low border border-outline-variant hover:border-[#eebd8e]/60 transition-all duration-300 group flex flex-col h-full cursor-pointer relative shadow-lg"
              id={`search-card-${p.id}`}
            >
              <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 p-1.5 border border-[#eebd8e]/40">
                <Eye className="w-4 h-4 text-[#eebd8e]" />
              </div>

              {p.badge && (
                <span className="absolute top-3 left-3 z-10 bg-[#2B0505] text-[#eebd8e] border border-[#eebd8e]/30 font-sh-subheader text-[10px] px-2 py-0.5 font-bold uppercase tracking-widest">
                  {p.badge}
                </span>
              )}

              <div className="h-48 w-full overflow-hidden bg-black/40 border-b border-outline-variant/20 relative">
                <img 
                  src={p.image} 
                  alt={p.alt} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-[0.75] group-hover:brightness-90 group-hover:scale-105 transition-all duration-700"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-label-caps text-[10px] text-secondary/70 tracking-wider block mb-1">
                    {p.subtitle}
                  </span>
                  <h4 className="font-sh-subheader text-white text-lg font-bold uppercase tracking-wide">
                    {p.title}
                  </h4>
                  <p className="font-body-main text-zinc-400 text-sm leading-relaxed mt-2 line-clamp-3 text-justify">
                    {p.description}
                  </p>
                </div>

                <div className="border-t border-outline-variant/20 pt-4 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-zinc-500 font-sans block">ADQUISICIÓN</span>
                    <span className="font-sh-subheader text-base text-secondary font-bold">
                      {p.priceLabel}
                    </span>
                  </div>
                  <span className="font-label-caps text-[10px] tracking-wider text-secondary flex items-center gap-1">
                    VER INSIGNIA DE GUERRA →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
