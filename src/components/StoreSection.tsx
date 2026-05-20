import { useState } from "react";
import { PRODUCTS } from "../data";
import { GameProduct } from "../types";
import { ShoppingCart, Check, Star, Filter, Eye } from "lucide-react";

interface StoreSectionProps {
  onAddToCart: (product: GameProduct, size?: string, platform?: string) => void;
  onViewDetail: (product: GameProduct) => void;
}

export default function StoreSection({ onAddToCart, onViewDetail }: StoreSectionProps) {
  // Filters states
  const [activeEditionFilter, setActiveEditionFilter] = useState<string>("all");
  const [activePlatformFilter, setActivePlatformFilter] = useState<string>("all");
  
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    "official-merch": "M" // Default size for merch
  });

  const [selectedPlatforms, setSelectedPlatforms] = useState<Record<string, string>>({
    "collector-edition": "PC",
    "deluxe-edition": "PC",
    "standard-edition": "PC"
  });

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handlePlatformChange = (productId: string, platform: string) => {
    setSelectedPlatforms((prev) => ({ ...prev, [productId]: platform }));
  };

  // Perform client side caching and filtration
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesEdition = activeEditionFilter === "all" ? true : product.editionType === activeEditionFilter;
    const matchesPlatform = activePlatformFilter === "all" ? true : (product.platforms?.includes(activePlatformFilter) || product.editionType === "merch");
    return matchesEdition && matchesPlatform;
  });

  return (
    <section 
      id="store" 
      className="relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] border-t border-outline-variant/30 scroll-mt-20 overflow-hidden text-left"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="font-sh-subheader tracking-widest text-[#eebd8e] text-xs font-bold block mb-2 uppercase">
            EL ARSENAL DE CONQUISTA
          </span>
          <h2 className="font-h1-cinematic text-3xl sm:text-5xl text-white tracking-wide uppercase">
            FORJA TU LEGADO
          </h2>
          <div className="w-20 h-[1.5px] bg-[#eebd8e]/40 mx-auto mt-4" />
        </div>

        {/* Dynamic Category Filters Row */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 bg-black/55 border border-outline-variant/30 p-5">
          
          {/* Edition tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-sh-subheader text-[10px] text-zinc-400 tracking-wider uppercase mr-2">Edición:</span>
            {[
              { label: "Todas", value: "all" },
              { label: "Standard", value: "standard" },
              { label: "Deluxe", value: "deluxe" },
              { label: "Collector", value: "collector" },
              { label: "Merch", value: "merch" }
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveEditionFilter(tab.value)}
                className={`px-4 py-1.5 font-sans text-xs border transition-all cursor-pointer rounded-none uppercase ${
                  activeEditionFilter === tab.value
                    ? "bg-[#2B0505] border-[#A67C52] text-[#eebd8e] font-bold"
                    : "bg-transparent border-outline-variant/30 text-zinc-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Platform icons selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-sh-subheader text-[10px] text-zinc-400 tracking-wider uppercase mr-2">Plataforma:</span>
            {[
              { label: "Todas", value: "all" },
              { label: "PC", value: "PC" },
              { label: "PS5", value: "PlayStation 5" },
              { label: "Xbox", value: "Xbox Series X" },
              { label: "Nintendo Switch", value: "Nintendo Switch" }
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActivePlatformFilter(tab.value)}
                className={`px-3 py-1.5 font-mono text-xs border transition-all cursor-pointer rounded-none uppercase ${
                  activePlatformFilter === tab.value
                    ? "bg-[#2B0505] border-[#A67C52] text-[#eebd8e] font-bold"
                    : "bg-transparent border-outline-variant/30 text-zinc-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Store Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
          {filteredProducts.map((product) => {
            const isMerch = product.editionType === "merch";
            const currentSize = selectedSizes[product.id];
            const currentPlatform = selectedPlatforms[product.id] || "PC";

            return (
              <div 
                key={product.id}
                className="bg-surface-container-low border border-outline-variant hover:border-[#eebd8e]/50 transition-all duration-300 flex flex-col justify-between group rounded-none overflow-hidden relative shadow-lg"
                id={`product-card-${product.id}`}
              >
                
                {/* Special Edition Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10 bg-[#2B0505] text-[#eebd8e] border border-[#A67C52]/40 font-sh-subheader text-[10px] font-bold px-3 py-1 tracking-widest shadow-md">
                    {product.badge}
                  </div>
                )}

                {/* Main clickable click target for View Detail */}
                <div 
                  className="h-64 sm:h-72 w-full overflow-hidden bg-black/50 relative border-b border-outline-variant/30 cursor-pointer"
                  onClick={() => onViewDetail(product)}
                >
                  <img 
                    src={product.image} 
                    alt={product.alt} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out brightness-[0.74] group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                  
                  {/* Hover indicator overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <span className="bg-[#2B0505]/90 text-[#eebd8e] border border-[#A67C52] font-sh-subheader text-xs tracking-widest uppercase py-2.5 px-5 flex items-center gap-1.5 shadow-xl">
                      <Eye className="w-4 h-4" /> VER DETALLES
                    </span>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <div className="cursor-pointer text-left" onClick={() => onViewDetail(product)}>
                    <span className="font-label-caps text-xs text-secondary/60 tracking-wider block mb-1">
                      {product.subtitle}
                    </span>
                    <h3 className="font-sh-subheader text-on-surface text-xl sm:text-2xl font-bold tracking-wide uppercase hover:text-[#eebd8e] transition-colors">
                      {product.title}
                    </h3>
                  </div>

                  {/* Ratings */}
                  <div className="flex items-center gap-1 text-[#eebd8e] -mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating || 4.5) ? "fill-current" : ""}`} />
                    ))}
                    <span className="font-mono text-[11px] text-zinc-500 font-bold ml-1">{(product.rating || 4.5).toFixed(1)}</span>
                  </div>

                  <p className="font-body-main text-base text-zinc-400 text-justify leading-relaxed">
                    {product.description}
                  </p>

                  {/* Dynamic Platform custom picker indicators */}
                  {!isMerch && product.platforms && (
                    <div className="border-t border-b border-outline-variant/20 py-3 block text-left">
                      <span className="font-sh-subheader text-[10px] text-zinc-400 block mb-1.5 tracking-wider">PLATAFORMA REQUERIDA:</span>
                      <div className="flex gap-1.5 flex-wrap">
                        {product.platforms.map((plat) => (
                          <button
                            key={plat}
                            type="button"
                            onClick={() => handlePlatformChange(product.id, plat)}
                            className={`px-2.5 py-1 text-[10px] border font-mono transition-all lowercase ${
                              currentPlatform === plat
                                ? "bg-[#eebd8e] border-[#eebd8e] text-black font-semibold"
                                : "bg-black/40 border-outline-variant text-[#eebd8e]"
                            }`}
                          >
                            {plat.split(" ")[0]}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dynamic Merch Size selector representation */}
                  {isMerch && (
                    <div className="border-t border-b border-outline-variant/20 py-3 text-left" id="merch-size-widget">
                      <span className="font-sh-subheader text-[10px] text-zinc-400 block mb-1.5 tracking-wider">TALLA DISPONIBLE:</span>
                      <div className="flex gap-2">
                        {sizes.map((sz) => (
                          <button
                            key={sz}
                            onClick={() => handleSizeChange(product.id, sz)}
                            className={`w-8 h-8 border text-xs font-sh-subheader font-bold rounded-none flex items-center justify-center transition-all ${
                              currentSize === sz
                                ? "bg-[#eebd8e] border-[#eebd8e] text-black"
                                : "bg-black/35 border-outline-variant text-[#eebd8e] hover:border-[#eebd8e]"
                            }`}
                            id={`size-btn-${sz}`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* List of inclusive elements */}
                  <div className="mt-2 flex-1 text-left">
                    <span className="font-sh-subheader text-xs text-on-surface/80 tracking-widest block mb-1.5"> INCLUYE:</span>
                    <ul className="flex flex-col gap-1.5 pl-1">
                      {product.includes.slice(0, 3).map((inc, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-zinc-400 font-sans">
                          <Check className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                          <span className="truncate">{inc}</span>
                        </li>
                      ))}
                      {product.includes.length > 3 && (
                        <li className="text-[10px] text-zinc-500 italic pl-5">Y more coleccionable en detalle...</li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Pricing & Add Trigger Call to Action */}
                <div className="p-6 bg-surface-container-high/40 border-t border-outline-variant/30 flex items-center justify-between gap-4">
                  <div className="flex flex-col justify-center text-left">
                    <span className="font-label-caps text-[10px] text-zinc-500 tracking-wider">PRECIO</span>
                    <span className="font-sh-subheader text-xl sm:text-2xl text-secondary font-bold">
                      {product.priceLabel}
                    </span>
                  </div>

                  <button
                    onClick={() => onAddToCart(product, isMerch ? currentSize : undefined, !isMerch ? currentPlatform : undefined)}
                    className="flex items-center gap-2 bg-[#ffb3ad] hover:bg-white text-black font-label-caps text-xs tracking-widest font-bold px-4 py-3 cursor-pointer rounded-none animate-pulse-slow hover:animate-none scale-100 active:scale-95 transition-all shadow-md"
                    title={`Añadir ${product.title} al arsenal comprado`}
                    id={`buy-btn-${product.id}`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{product.buttonText}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

