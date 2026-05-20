import React, { useState, FormEvent } from "react";
import { GameProduct } from "../types";
import { ShieldCheck, Star, ShoppingCart, MessageSquare, Play, Sparkles, AlertCircle } from "lucide-react";

interface ProductDetailProps {
  product: GameProduct;
  onAddToCart: (product: GameProduct, size?: string, platform?: string) => void;
  onDirectBuy: (product: GameProduct, size?: string, platform?: string) => void;
  onBack: () => void;
}

export default function ProductDetail({ product, onAddToCart, onDirectBuy, onBack }: ProductDetailProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>(
    product.platforms && product.platforms.length > 0 ? product.platforms[0] : ""
  );
  const [selectedSize, setSelectedSize] = useState<string>("M");
  
  // Custom Reviews simulated
  const [reviews, setReviews] = useState([
    { name: "Sebas_Gamer99", rating: 5, date: "Hoy", text: "Increíble fidelidad histórica. La recreación de la selva hondureña y Trujillo es brutal. Súper recomendado." },
    { name: "Alonso_García_1521", rating: 4, date: "Ayer", text: "Elegí bando conquistador y el sistema de combate se siente pesado y táctico, al estilo RDR2. Los sacerdotes nativos son rivales memorables." },
    { name: "LencaSpirit", rating: 5, date: "Hace 3 días", text: "Por fin un juego digno que rinde tributo a nuestras raíces Lencas. El sigilo con la hoja de obsidiana es perfecto." }
  ]);

  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);

  const handleAddReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    const item = {
      name: newReviewName.trim() || "Explorador Anónimo",
      rating: newReviewRating,
      date: "Ahora mismo",
      text: newReviewText.trim()
    };
    setReviews([item, ...reviews]);
    setNewReviewText("");
    setNewReviewName("");
  };

  const isMerch = product.editionType === "merch";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id={`product-detail-view-${product.id}`}>
      
      {/* Return button */}
      <button 
        onClick={onBack}
        className="mb-8 font-label-caps text-xs tracking-widest text-secondary hover:text-white transition-colors cursor-pointer inline-flex items-center gap-2 border border-[#A67C52]/30 px-3 py-1.5 bg-[#2B0505]/30 hover:bg-[#2B0505]/60"
        id="detail-back-btn"
      >
        ← REGRESAR AL ARSENAL DE PRODUCTOS
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left column: Multimedia (Trailer / Image gallery layout) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Main grand visual with mock trailer action overlay */}
          <div className="relative aspect-video w-full bg-black border-2 border-[#A67C52]/50 overflow-hidden shadow-2xl group flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.alt} 
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
            
            {/* Play trigger display */}
            <div className="z-10 text-center p-6 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#2B0505]/85 border-2 border-[#A67C52] flex items-center justify-center text-secondary hover:text-white hover:scale-110 hover:bg-[#2B0505] transition-all cursor-pointer shadow-red-950/50 shadow-xl" id="detail-video-trigger">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <div>
                <span className="font-sh-subheader text-xs text-secondary tracking-widest block uppercase">VER TRAILER REVELACIÓN DE LORE</span>
                <span className="text-zinc-400 font-sans text-xs">Sons of Hell - Recreado por RR Games</span>
              </div>
            </div>

            {/* Platform indicators badge tags */}
            <div className="absolute bottom-4 left-4 flex gap-1.5">
              {product.platforms?.map((p) => (
                <span key={p} className="bg-black/75 text-secondary text-[10px] font-mono px-2 py-0.5 border border-[#A67C52]/40">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Sub-images gallery preview simulated */}
          <div className="grid grid-cols-3 gap-3">
            <div className="border border-outline-variant/60 cursor-pointer hover:border-secondary transition-all overflow-hidden aspect-video bg-black/40">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBhG7_Oh_5l3ilvIoyW5tTf6Ut-KSainPRrPLQ_wLZtOtLpbD52xryDbOBfFvtbddjH2-NxMSGiPbItSIf_lNtneidmZqmzPLymt3AePcth0jlLm8W520yCA2u0PiZ_pDYa4XxlWIXjUtUCaSiYmw-YKgTM9MdvRDwTChi91BJQFqyJU0yXwvJNE8-rZg71nsF391jlTWtUyazkr8Zbxrtxe6vP2WdS7m72ZFOa1SHIppa2jaa_EIhLIq9Cqyx_pWa-1QOMG4LoxM" alt="Preview 1" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" />
            </div>
            <div className="border border-outline-variant/60 cursor-pointer hover:border-secondary transition-all overflow-hidden aspect-video bg-black/40">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAblCW9Grd3_wHt6nLLsjEKsojl30x3XLdxoz6vys0MFvnNNMPB7LyNVsgWScTwIIZff8-LUr8MJrGsALx7SGFJWdmY1_UxB1oFmN4I7yc_eDagufxskjzco14k_BBcQAbIMwO35ezU7ccjzzQzqxSSm0qHsW0514yvyWZYhPik1GMO579oVaIkEZGAXsG0iIb_4Arrq0GDRF-kFg6QoKx-8wa8E7rPZXVupY9L5MRoJ69dTnnbAWtNu4Dk_vCB4hRdjxyiAzTSdxE" alt="Preview 2" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" />
            </div>
            <div className="border border-outline-variant/60 cursor-pointer hover:border-secondary transition-all overflow-hidden aspect-video bg-black/40">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt_SvdHXzejSe_3SckUY8iFoTMI2bVvb_waYMtkrau7ADSifko_sMiJsy_VJPiOEG5JwSCG6diD1FNSh9_7m2Wl8Ct3bmKX9YlRwHKHS5Lm1XxNtfB66A4HPQ6wFBJtwSyyh9xhJRWi5Rk2Ja2nHtTeycpfTUz8k_ytVpvWB0Pr7YEt9lKUdY-KcmYvh0SH9x4OHUUG31HmTvuYQMSs-t8tem0iT0ckpOcRFNF-yzrxiTiZjo3Yh4g-0Bt8Gl_0uC7f3-lsI4R6G8" alt="Preview 3" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Slogan details and historical lore summary */}
          <div className="p-6 bg-[#0E0E0E] border border-outline-variant/40">
            <h4 className="font-sh-subheader text-xs text-secondary uppercase tracking-widest mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#A67C52]" />
              SINOPSIS DEL CLIMA DE CONQUISTA
            </h4>
            <p className="font-body-main text-base sm:text-lg text-zinc-300 leading-relaxed text-justify">
              En las calurosas dunas y tupidas selvas vírgenes de <strong>Honduras (Hibueras)</strong>, Sons of Hell forja un combate táctico crudo e inmersivo. El choque de civilizaciones se desata en tiempo real. ¿Asumirás el mando de las legiones de acero de Carlos V o encarnarás el letal sigilo del jaguar con guerreros nativos bajo la bendición de divinidades prehispánicas? Cada elección desatará la ruina o gloria definitiva.
            </p>
          </div>

        </div>

        {/* Right column: Purchase options and description info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Header block with badges and pricing */}
          <div className="p-6 bg-[#0d0d0d] border border-outline-variant/50 relative">
            
            {product.badge && (
              <span className="absolute -top-3.5 right-4 bg-[#2B0505] text-[#eebd8e] border border-[#A67C52] font-sh-subheader text-[10px] tracking-widest px-3.5 py-1 uppercase shadow-md font-bold">
                {product.badge}
              </span>
            )}

            <span className="font-label-caps text-xs text-secondary tracking-widest uppercase block mb-1">
              {product.subtitle}
            </span>
            <h1 className="font-h1-cinematic text-2xl sm:text-3.5xl text-white tracking-wide uppercase leading-tight font-bold">
              {product.title}
            </h1>

            {/* Rating display */}
            <div className="flex items-center gap-1.5 mt-2 mb-4">
              <div className="flex gap-0.5 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 4.5) ? "fill-current" : ""}`} />
                ))}
              </div>
              <span className="font-mono text-xs text-[#eebd8e] font-bold">{(product.rating || 4.5).toFixed(1)} / 5.0</span>
              <span className="text-zinc-500 text-xs font-sans">({reviews.length} testimonios reales)</span>
            </div>

            <p className="font-body-main text-base sm:text-lg text-zinc-300 text-justify mb-5 leading-relaxed">
              {product.description}
            </p>

            <div className="border-t border-outline-variant/30 pt-4 flex items-center justify-between">
              <div>
                <span className="text-zinc-500 text-[10px] block font-label-caps tracking-widest uppercase">PRECIO TOTAL DE ADQUISICIÓN</span>
                <span className="font-sh-subheader text-3xl font-bold text-[#eebd8e]">
                  {product.priceLabel}
                </span>
              </div>
              <span className="text-xs text-emerald-400 font-sans flex items-center gap-1 bg-emerald-950/40 border border-emerald-900/40 px-2 py-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Entrega inmediata o física asegurada
              </span>
            </div>
          </div>

          {/* Interactive options panel (Platform or size picker) */}
          <div className="p-6 bg-[#121111] border border-outline-variant/40 flex flex-col gap-5">
            
            {/* PLATFORMS PICKER FOR GAMES */}
            {!isMerch && product.platforms && (
              <div>
                <span className="font-sh-subheader text-xs text-secondary block mb-2 uppercase tracking-widest">
                  PLATAFORMA ELEGIDA:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {product.platforms.map((plat) => (
                    <button
                      key={plat}
                      onClick={() => setSelectedPlatform(plat)}
                      className={`py-2 px-3 border text-xs font-mono transition-all flex items-center justify-center rounded-none uppercase cursor-pointer ${
                        selectedPlatform === plat
                          ? "bg-[#A67C52] border-[#A67C52] text-black font-bold"
                          : "bg-black/40 border-outline-variant text-zinc-400 hover:text-[#eebd8e] hover:border-secondary"
                      }`}
                      id={`plat-picker-${plat}`}
                    >
                      {plat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SIZE PICKER FOR MERCH */}
            {isMerch && (
              <div>
                <span className="font-sh-subheader text-xs text-secondary block mb-2 uppercase tracking-widest">
                  TALLA REQUERIDA:
                </span>
                <div className="flex gap-2">
                  {["S", "M", "L", "XL", "XXL"].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`w-10 h-10 border text-xs font-sh-subheader transition-all flex items-center justify-center rounded-none cursor-pointer ${
                        selectedSize === sz
                          ? "bg-[#eebd8e] border-[#eebd8e] text-black font-bold"
                          : "bg-black/40 border-outline-variant text-[#eebd8e] hover:border-[#eebd8e]"
                      }`}
                      id={`detail-size-picker-${sz}`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusive details list */}
            <div>
              <span className="font-sh-subheader text-xs text-zinc-300 block mb-2 tracking-wider uppercase">
                ELEMENTOS INCLUIDOS EN ESTA ADQUISICIÓN:
              </span>
              <ul className="flex flex-col gap-1.5 bg-[#0A0A0A] p-4 border border-outline-variant/20">
                {product.includes.map((elem, idx) => (
                  <li key={idx} className="text-xs text-zinc-400 flex items-start gap-2 leading-relaxed">
                    <span className="text-[#A67C52] mt-0.5">•</span>
                    <span>{elem}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature bullets highlights */}
            {product.featuresList && (
              <div>
                <span className="font-sh-subheader text-xs text-zinc-300 block mb-2 tracking-wider uppercase">
                  CARACTERÍSTICAS TÉCNICAS AAA:
                </span>
                <ul className="flex flex-col gap-1 text-[11px] text-zinc-400 italic">
                  {product.featuresList.map((feature, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-800"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Action CTAs: Add to cart & Direct buy */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onAddToCart(product, isMerch ? selectedSize : undefined, !isMerch ? selectedPlatform : undefined)}
              className="flex-1 bg-transparent hover:bg-neutral-900 border-2 border-secondary text-secondary hover:text-white py-4 font-label-caps text-xs tracking-widest font-bold transition-all cursor-pointer rounded-none flex items-center justify-center gap-2"
              id="detail-add-to-cart-cta"
            >
              <ShoppingCart className="w-4 h-4" />
              AGREGAR AL COFRE
            </button>
            <button
              onClick={() => onDirectBuy(product, isMerch ? selectedSize : undefined, !isMerch ? selectedPlatform : undefined)}
              className="flex-1 bg-[#ffb3ad] hover:bg-white text-black py-4 font-label-caps text-xs tracking-widest font-bold transition-all cursor-pointer rounded-none flex items-center justify-center gap-2 shadow-lg shadow-red-950/20"
              id="detail-direct-buy-cta"
            >
              COMPRAR AHORA
            </button>
          </div>

        </div>

      </div>

      {/* Reviews/Comments Section */}
      <div className="mt-16 border-t border-outline-variant/30 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Write a review card */}
          <div className="lg:col-span-5 bg-[#0e0e0e]/95 border border-outline-variant/40 p-6 flex flex-col gap-4">
            <h3 className="font-sh-subheader text-lg text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-secondary" />
              Dejar Opinión Militar
            </h3>
            
            <form onSubmit={handleAddReview} className="flex flex-col gap-4">
              <div>
                <label className="font-sh-subheader text-[10px] tracking-widest text-[#eebd8e] block uppercase mb-1">Nombre / Apodo de Explorador:</label>
                <input 
                  type="text" 
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  placeholder="ej: Capitan_Toledo"
                  required
                  className="w-full bg-[#1A1A1A] border border-outline-variant/50 p-2.5 text-white font-sans text-xs focus:border-secondary transition-colors outline-none rounded-none"
                />
              </div>

              <div>
                <label className="font-sh-subheader text-[10px] tracking-widest text-[#eebd8e] block uppercase mb-1">Calificación de Estratégica:</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((stars) => (
                    <button
                      key={stars}
                      type="button"
                      onClick={() => setNewReviewRating(stars)}
                      className={`text-lg p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer ${newReviewRating >= stars ? "text-yellow-500" : "text-zinc-600"}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-sh-subheader text-[10px] tracking-widest text-[#eebd8e] block uppercase mb-1">Tu Veredicto Histórico:</label>
                <textarea 
                  rows={3}
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="Describe tu impresión de Sons of Hell de RR Games..."
                  required
                  className="w-full bg-[#1A1A1A] border border-outline-variant/50 p-2.5 text-white font-sans text-xs focus:border-secondary transition-colors outline-none resize-none rounded-none"
                />
              </div>

              <button
                type="submit"
                className="bg-[#2B0505] hover:bg-red-950 text-secondary border border-[#A67C52]/50 text-xs font-label-caps py-2.5 tracking-wider font-bold transition-colors cursor-pointer rounded-none"
                id="submit-review-btn"
              >
                PUBLICAR COMENTARIO
              </button>
            </form>
          </div>

          {/* Reviews list displaying */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h3 className="font-sh-subheader text-base text-secondary uppercase tracking-widest">
              OPINIONES ASENTADAS POR LOS JUGADORES ({reviews.length})
            </h3>

            <div className="flex flex-col gap-4 max-h-[420px] overflow-y-auto pr-2">
              {reviews.map((rev, idx) => (
                <div key={idx} className="bg-[#131212]/90 border border-outline-variant/20 p-4 relative">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-sh-subheader text-xs font-bold text-white block uppercase">{rev.name}</span>
                      <span className="text-[10px] text-zinc-500 font-sans">{rev.date}</span>
                    </div>
                    <div className="flex gap-0.5 text-yellow-500">
                      {[...Array(5)].map((_, sIdx) => (
                        <span key={sIdx} className="text-sm">{sIdx < rev.rating ? "★" : "☆"}</span>
                      ))}
                    </div>
                  </div>
                  <p className="font-body-main text-sm text-zinc-300 leading-relaxed text-left italic">
                    "{rev.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
