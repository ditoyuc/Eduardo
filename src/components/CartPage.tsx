import React, { useState, FormEvent } from "react";
import { CartItem } from "../types";
import { Trash2, Plus, Minus, ShieldCheck, Tag, Ticket, ArrowRight, ShoppingBag } from "lucide-react";

interface CartPageProps {
  cartItems: CartItem[];
  appliedDiscount: number;
  couponCode: string;
  onUpdateQuantity: (productId: string, amount: number, size?: string, platform?: string) => void;
  onRemoveItem: (productId: string, size?: string, platform?: string) => void;
  onApplyCoupon: (code: string, discount: number) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export default function CartPage({
  cartItems,
  appliedDiscount,
  couponCode,
  onUpdateQuantity,
  onRemoveItem,
  onApplyCoupon,
  onProceedToCheckout,
  onContinueShopping
}: CartPageProps) {
  const [couponInput, setCouponInput] = useState(couponCode);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState(appliedDiscount > 0);

  // Calculate prices
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * appliedDiscount;
  const shippingAmount = subtotal > 100 || subtotal === 0 ? 0 : 9.99; // Free shipping on orders > $100
  const finalTotal = subtotal - discountAmount + shippingAmount;

  const handleApplyCouponCode = (e: FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess(false);

    const code = couponInput.trim().toUpperCase();
    if (code === "HELL10") {
      onApplyCoupon("HELL10", 0.10); // 10% off
      setCouponSuccess(true);
    } else if (code === "CONQUISTA20") {
      onApplyCoupon("CONQUISTA20", 0.20); // 20% off
      setCouponSuccess(true);
    } else if (code === "RRGAMES") {
      onApplyCoupon("RRGAMES", 0.15); // 15% off
      setCouponSuccess(true);
    } else {
      setCouponError("Salvoconducto o cupón de descuento ilegítimo o vencido.");
      onApplyCoupon("", 0);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="cart-page-block">
      
      {/* Page header */}
      <div className="text-center mb-12">
        <span className="font-sh-subheader tracking-widest text-secondary text-xs font-bold block mb-2 uppercase">
          LOGÍSTICA MILITAR DE LA LEGIÓN
        </span>
        <h2 className="font-h1-cinematic text-3xl sm:text-5xl text-on-surface tracking-wide uppercase">
          COFRE DE COMPRAS
        </h2>
        <div className="w-20 h-[1.5px] bg-[#eebd8e]/40 mx-auto mt-4" />
      </div>

      {cartItems.length === 0 ? (
        /* Empty cart view */
        <div className="text-center py-20 bg-[#0E0E0E]/90 border border-outline-variant/30 p-10 flex flex-col items-center gap-6" id="empty-cart-page">
          <div className="w-16 h-16 rounded-full bg-[#2B0505]/60 border border-[#A67C52]/50 flex items-center justify-center text-secondary">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-h1-cinematic text-xl text-white uppercase tracking-wider">COFRE DE ADQUISICIONES VACÍO</h3>
            <p className="font-body-main text-zinc-400 text-base max-w-md mx-auto mt-2 leading-relaxed">
              No tienes ningún armamento, edición o prenda militar asignada en tu cofre en este momento. Visita nuestro catálogo e integra elementos a tu arsenal comprado.
            </p>
          </div>
          <button
            onClick={onContinueShopping}
            className="bg-[#2B0505] hover:bg-neutral-900 border border-secondary text-secondary font-label-caps text-xs px-8 py-3.5 tracking-widest cursor-pointer transition-colors"
          >
            VOLVER AL ARSENAL DE TIENDA
          </button>
        </div>
      ) : (
        /* Rich cart listing */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Items Listing (Columns: Item info, Quantity selectors, Price totals) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="hidden sm:grid grid-cols-12 bg-black/60 p-4 border border-outline-variant/40 text-[10px] font-sh-subheader text-[#A67C52] tracking-widest uppercase">
              <span className="col-span-6">ADQUISICIÓN</span>
              <span className="col-span-3 text-center">CANTIDAD</span>
              <span className="col-span-3 text-right">PRECIO TOTAL</span>
            </div>

            <div className="flex flex-col gap-4">
              {cartItems.map((item, index) => {
                const itemTotalPrice = item.product.price * item.quantity;
                const isItemMerch = item.product.editionType === "merch";

                return (
                  <div 
                    key={`${item.product.id}-${item.selectedSize || ""}-${item.selectedPlatform || ""}`}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-[#111]/80 border border-outline-variant/40 hover:border-[#A67C52]/40 p-5 transition-colors relative"
                    id={`cart-page-item-${item.product.id}`}
                  >
                    
                    {/* Item Image and Title descriptors */}
                    <div className="col-span-1 sm:col-span-6 flex gap-4 items-start">
                      <img 
                        src={item.product.image} 
                        alt={item.product.title} 
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover border border-outline-variant/40 flex-shrink-0"
                      />
                      
                      <div className="flex flex-col gap-1 text-left">
                        {item.product.badge && (
                          <span className="bg-[#2B0505] text-[#eebd8e] border border-outline-variant/50 text-[8px] font-sh-subheader font-bold px-1.5 py-0.5 tracking-wider w-max uppercase">
                            {item.product.badge}
                          </span>
                        )}
                        <h4 className="font-sh-subheader text-base text-white font-bold uppercase tracking-wide">
                          {item.product.title}
                        </h4>
                        
                        {/* Selected Options label */}
                        <div className="flex flex-col gap-0.5 text-zinc-400 font-mono text-[10px] uppercase">
                          {isItemMerch ? (
                            <span>Talla: <strong className="text-secondary">{item.selectedSize}</strong></span>
                          ) : (
                            item.selectedPlatform && <span>Plataforma: <strong className="text-secondary">{item.selectedPlatform}</strong></span>
                          )}
                          <span>Unidad: ${item.product.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Selector controls block */}
                    <div className="col-span-1 sm:col-span-3 flex justify-start sm:justify-center items-center gap-3">
                      <div className="flex border border-outline-variant/50 bg-[#0d0d0d] items-center">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1, item.selectedSize, item.selectedPlatform)}
                          className="w-8 h-8 flex items-center justify-center text-[#eebd8e] hover:bg-[#2B0505] hover:text-white transition-all cursor-pointer"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-white font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1, item.selectedSize, item.selectedPlatform)}
                          className="w-8 h-8 flex items-center justify-center text-[#eebd8e] hover:bg-[#2B0505] hover:text-white transition-all cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Delete button representation for singular items */}
                      <button
                        onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedPlatform)}
                        className="p-1.5 text-zinc-500 hover:text-red-400 border border-outline-variant/30 hover:border-red-900/40 bg-[#0B0B0B] transition-colors cursor-pointer"
                        title="Desechar del cofre"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Pricing total display for specific row */}
                    <div className="col-span-1 sm:col-span-3 text-left sm:text-right">
                      <span className="text-zinc-500 text-[9px] font-sans sm:hidden block mb-1">PRECIO ACUMULADO:</span>
                      <span className="font-sh-subheader text-base text-secondary font-bold">
                        ${itemTotalPrice.toFixed(2)}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Back to catalog CTA */}
            <div className="mt-4 text-left">
              <button
                onClick={onContinueShopping}
                className="font-label-caps text-xs tracking-widest text-[#eebd8e] hover:text-white transition-colors cursor-pointer border border-[#A67C52]/30 px-3.5 py-2 bg-black/40"
              >
                ← SEGUIR ELIGIENDO EJEMPLARES
              </button>
            </div>

          </div>

          {/* Right Summary bar (Totals, Coupon entry forms) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Promo Coupon Card */}
            <div className="p-6 bg-[#0E0E0E] border border-outline-variant/40 flex flex-col gap-4">
              <h4 className="font-sh-subheader text-xs text-secondary tracking-widest uppercase flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#A67C52]" />
                SALVOCONDUCTO / CUPONES:
              </h4>

              <form onSubmit={handleApplyCouponCode} className="flex gap-2">
                <input
                  type="text"
                  placeholder="ej: HELL10 o CONQUISTA20"
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value);
                    setCouponError("");
                  }}
                  className="bg-[#1C1B1B] border border-outline-variant/60 text-white font-sans text-xs px-3 py-2.5 flex-1 outline-none focus:border-secondary transition-colors uppercase rounded-none"
                  id="coupon-apply-input-element"
                />
                <button
                  type="submit"
                  className="bg-[#2B0505] hover:bg-red-950 text-secondary border border-[#A67C52] text-xs font-label-caps px-4 py-2.5 font-bold cursor-pointer transition-colors"
                >
                  APLICAR
                </button>
              </form>

              {/* Helpful coupon warnings and hints */}
              <p className="text-[10px] text-zinc-500 italic mt-0.5">
                💡 Intente registrar: <strong className="text-secondary text-right font-mono">HELL10</strong> (10%), <strong className="text-secondary font-mono">CONQUISTA20</strong> (20%), o el cupón especial <strong className="text-secondary font-mono">RRGAMES</strong> (15%).
              </p>

              {couponError && (
                <span className="text-[11px] text-red-400 font-sans block bg-red-950/20 border border-red-900/35 p-2">
                  ⚠️ {couponError}
                </span>
              )}

              {couponSuccess && appliedDiscount > 0 && (
                <span className="text-[11px] text-emerald-400 font-sans block bg-emerald-950/20 border border-emerald-900/35 p-2 uppercase">
                  ✓ Salvoconducto asentado: {(appliedDiscount * 100)}% de descuento militar activo.
                </span>
              )}

            </div>

            {/* Total Calculations Block */}
            <div className="p-6 bg-[#0E0E0E]/95 border-2 border-[#A67C52]/40 relative">
              <span className="absolute top-1.5 left-2 text-[#eebd8e]/30 text-[8px]">⚙</span>
              <span className="absolute top-1.5 right-2 text-[#eebd8e]/30 text-[8px]">⚙</span>

              <h4 className="font-sh-subheader text-white text-base font-bold uppercase tracking-wider mb-4 border-b border-outline-variant/30 pb-3">
                RESUMEN DE ADQUISICIONES:
              </h4>

              <div className="flex flex-col gap-3 font-sans text-sm pb-4 border-b border-outline-variant/20">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal del cofre:</span>
                  <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Descuento ({couponCode}):</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-400">
                  <span>Costos de Despacho (Carabela):</span>
                  <span className="font-mono text-white">
                    {shippingAmount === 0 ? (
                      <strong className="text-emerald-400 font-sh-subheader text-xs">¡GRATIS!</strong>
                    ) : (
                      `$${shippingAmount.toFixed(2)}`
                    )}
                  </span>
                </div>
                {shippingAmount > 0 && (
                  <p className="text-[10px] text-zinc-500 italic">
                    (Transporte real exento si agregas más de $100.00 en productos)
                  </p>
                )}
              </div>

              {/* Secure total representation */}
              <div className="flex justify-between items-center py-4 text-white">
                <span className="font-sh-subheader text-base uppercase font-bold text-secondary">PRECIO TOTAL:</span>
                <span className="font-mono text-2xl text-secondary font-bold">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>

              <div className="mb-4 text-[10px] text-zinc-500 font-sans flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Protocolo de encriptación comercial de RR Games.</span>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full bg-[#ffb3ad] hover:bg-white text-neutral-900 py-4 font-label-caps text-xs tracking-widest font-bold transition-all cursor-pointer rounded-none flex items-center justify-center gap-2 shadow-lg shadow-red-950/20"
                id="proceed-to-shipping-cta"
              >
                PROCEDER AL DESPACHO DE ENVÍO
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
