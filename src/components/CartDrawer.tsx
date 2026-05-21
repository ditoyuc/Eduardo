import { useState, FormEvent } from "react";
import { CartItem } from "../types";
import { X, Trash2, Plus, Minus, Scroll, Truck, CreditCard, Sparkles, CheckCircle2 } from "lucide-react";

interface CartDrawerProps {
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, amount: number, size?: string, platform?: string) => void;
  onRemoveItem: (productId: string, size?: string, platform?: string) => void;
  onClearCart: () => void;
  onProceedToCartPage: () => void;
}

export default function CartDrawer({
  cartItems,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCartPage
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "form" | "success">("cart");
  const [shippingName, setShippingName] = useState("");
  const [shippingEmail, setShippingEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [orderId, setOrderId] = useState("");

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = subtotal > 100 || subtotal === 0 ? 0 : 9.99; // Free shipping over $100
  const totalCost = subtotal + shippingCost;

  const handleStartCheckout = () => {
    if (cartItems.length === 0) return;
    onProceedToCartPage();
  };


  const handleSubmitCheckout = (e: FormEvent) => {
    e.preventDefault();
    if (!shippingName.trim() || !shippingEmail.trim() || !shippingAddress.trim()) return;

    // Generate simulated order code matching 1521
    const randCode = Math.floor(100000 + Math.random() * 900000);
    setOrderId(`ORDER-1521-X${randCode}`);
    setCheckoutStep("success");
  };

  const handleFinishSuccess = () => {
    onClearCart();
    setCheckoutStep("cart");
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-md flex justify-end"
      onClick={onClose}
      id="cart-backdrop"
    >
      {/* Slide outer drawer */}
      <div 
        className="w-full max-w-md h-full bg-[#0D0D0D] border-l border-brand-border flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
        id="cart-drawer-panel"
      >
        {/* Corner bolt details */}
        <span className="absolute top-2 left-2 text-brand-tertiary/40 text-[9px] font-mono">⚙</span>
        <span className="absolute bottom-2 left-2 text-brand-tertiary/40 text-[9px] font-mono">⚙</span>

        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-brand-border/40 px-6 py-5 bg-brand-surface">
          <div className="flex items-center gap-2">
            <Scroll className="text-brand-tertiary w-5 h-5" />
            <h3 className="font-h1-cinematic text-sm sm:text-base text-white tracking-wider uppercase">
              COFRE DE ADQUISICIONES
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 px-3 text-brand-light hover:text-brand-tertiary font-sh-subheader text-xs border border-brand-border hover:border-brand-tertiary transition-all rounded-[6px] cursor-pointer"
            id="close-cart-btn"
          >
            ✕ VOLVER
          </button>
        </div>

        {/* Multi-step Display Container */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between">
          
          {checkoutStep === "cart" ? (
            /* Part 1: Cart Items lists */
            <>
              {cartItems.length === 0 ? (
                <div className="text-center my-auto px-4 py-12 flex flex-col items-center">
                  <span className="text-brand-tertiary/20 text-6xl block mb-4">🛡</span>
                  <p className="font-sh-subheader text-white text-base block font-bold mb-2">
                    EL COFRE ESTÁ VACÍO
                  </p>
                  <p className="font-body-main text-brand-light/70 leading-relaxed text-sm max-w-xs mx-auto">
                    Añade ediciones especiales del juego o merch oficial en la tienda militar para reclamar tus posesiones.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {cartItems.map((item, idx) => (
                    <div 
                      key={`${item.product.id}-${item.selectedSize || "none"}`}
                      className="flex gap-4 border-b border-brand-border/30 pb-4 relative"
                      id={`cart-item-${idx}`}
                    >
                      {/* Logo or product thumbnail */}
                      <img 
                        src={item.product.image} 
                        alt={item.product.title} 
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover border border-brand-border rounded-[8px]"
                      />

                      <div className="flex-1 flex flex-col justify-between gap-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-sh-subheader text-white text-sm font-bold uppercase tracking-wide text-left">
                              {item.product.title}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedPlatform)}
                              className="text-brand-light/60 hover:text-rose-400 p-0.5 cursor-pointer ml-2 transition-colors"
                              title="Remover de adquisiciones"
                              id={`remove-item-${idx}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="font-sh-subheader text-[9px] text-brand-tertiary block uppercase mt-0.5 text-left">
                            {item.product.subtitle} {item.selectedSize && `• Talla: ${item.selectedSize}`} {item.selectedPlatform && `• Plataforma: ${item.selectedPlatform}`}
                          </span>
                        </div>

                        {/* Adjust count counters */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 border border-brand-border/60 p-0.5 bg-black/40 rounded-[4px]">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1, item.selectedSize, item.selectedPlatform)}
                              disabled={item.quantity <= 1}
                              className="w-5 h-5 flex items-center justify-center p-0.5 disabled:opacity-35 text-brand-tertiary hover:text-white cursor-pointer select-none"
                              id={`qty-decrease-${idx}`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs w-6 text-center text-white font-bold">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1, item.selectedSize, item.selectedPlatform)}
                              className="w-5 h-5 flex items-center justify-center p-0.5 text-brand-tertiary hover:text-white cursor-pointer select-none"
                              id={`qty-increase-${idx}`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          
                          <span className="font-mono text-xs text-brand-tertiary font-bold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* Cost specifications and footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-brand-border/40 pt-6 mt-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-2 font-sans text-xs text-brand-light/75">
                    <div className="flex justify-between">
                      <span>Subtotal de Adquisiciones:</span>
                      <span className="text-white font-mono">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-brand-tertiary" />
                        Despacho por Carabela Real:
                      </span>
                      <span className="text-white font-mono">
                        {shippingCost === 0 ? "GRATIS" : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    {shippingCost > 0 && (
                      <span className="font-body-main text-[10px] text-brand-tertiary bg-brand-secondary/15 p-1.5 border border-brand-secondary/30 rounded-[4px]">
                        * ¡Agrega ${(100 - subtotal).toFixed(2)} más para envío real sin costo!
                      </span>
                    )}
                  </div>

                  <div className="border-t border-brand-border/40 pt-4 flex justify-between font-sh-subheader text-sm sm:text-base">
                    <span className="text-brand-tertiary tracking-widest font-bold">VALOR FINAL DEL COFRE:</span>
                    <span className="text-white font-bold font-mono text-base sm:text-lg">${totalCost.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={handleStartCheckout}
                    className="w-full bg-brand-secondary hover:bg-[#400A0A] border border-brand-secondary hover:border-brand-tertiary text-brand-light py-3.5 font-sh-subheader text-xs tracking-widest font-bold scale-100 active:scale-95 transition-all text-center cursor-pointer rounded-[8px]"
                    id="checkout-proceed-btn"
                  >
                    PROCEDER AL DESPACHO
                  </button>
                </div>
              )}
            </>
          ) : checkoutStep === "form" ? (
            /* Part 2: Checkout Information Registry */
            <form onSubmit={handleSubmitCheckout} className="flex flex-col h-full justify-between gap-6" id="checkout-form-block">
              <div className="flex flex-col gap-5">
                <span className="font-sh-subheader text-[10px] text-brand-tertiary tracking-widest block uppercase">PASO II: REGISTRO IMPERIAL</span>
                <h4 className="font-h1-cinematic text-sm sm:text-base text-white border-b border-brand-border/40 pb-2">
                  DATOS DE ENTREGA DE ARMAMENTO
                </h4>

                <div className="flex flex-col gap-4">
                  
                                    <div>
                    <label className="font-sh-subheader text-brand-tertiary/95 text-xs tracking-widest block mb-1.5 uppercase">
                      Nombre del Explorador:
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="Don Hernán de Córdoba"
                      value={shippingName}
                      onChange={(e) => setShippingName(e.target.value)}
                      className="w-full bg-brand-surface border border-brand-border text-white font-body-main px-3 py-2 outline-none focus:border-brand-tertiary transition-all rounded-[6px] text-sm"
                      id="checkout-name"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="font-sh-subheader text-brand-tertiary/95 text-xs tracking-widest block mb-1.5 uppercase">
                      Registro de Correo:
                    </label>
                    <input 
                      type="email"
                      required
                      placeholder="explorador.trujillo@corona.es"
                      value={shippingEmail}
                      onChange={(e) => setShippingEmail(e.target.value)}
                      className="w-full bg-brand-surface border border-brand-border text-white font-body-main px-3 py-2 outline-none focus:border-brand-tertiary transition-all rounded-[6px] text-sm"
                      id="checkout-email"
                    />
                  </div>

                  {/* Address scroll registry */}
                  <div>
                    <label className="font-sh-subheader text-brand-tertiary/95 text-xs tracking-widest block mb-1.5 uppercase">
                      Coordenadas / Dirección de Despacho:
                    </label>
                    <textarea 
                      required
                      rows={3}
                      placeholder="Fuerte de Trujillo, Muelle Principal de la Bahía de Hibueras, Estandarte #15."
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full bg-brand-surface border border-brand-border text-white font-body-main px-3 py-2 outline-none focus:border-brand-tertiary transition-all rounded-[6px] text-sm resize-none"
                      id="checkout-address"
                    />
                  </div>

                 <div className="bg-brand-surface border border-brand-border/60 p-3.5 text-xs text-brand-light/75 flex gap-2 font-sans items-start mt-2 rounded-[8px]">
                  <CreditCard className="w-4 h-4 text-brand-tertiary shrink-0 mt-0.5" />
                  <p className="leading-snug text-left">
                    * Al tratarse de una compra del arsenal comprado con fines de demostración, no se solicitará un cargo real a tu tarjeta de crédito militar.
                  </p>
                </div>
              </div>
              </div>

              {/* Foot action triggers */}
              <div className="flex flex-col gap-3 pt-4 border-t border-brand-border/40">
                <button
                  type="submit"
                  className="w-full bg-brand-secondary hover:bg-[#400A0A] border border-brand-secondary hover:border-brand-tertiary text-white py-3.5 font-sh-subheader text-xs tracking-widest font-bold transition-all cursor-pointer rounded-[8px]"
                  id="checkout-submit-btn"
                >
                  FINALIZAR COMPRA
                </button>
                <button
                  type="button"
                  onClick={() => setCheckoutStep("cart")}
                  className="w-full bg-transparent border border-brand-border hover:border-brand-tertiary text-brand-light py-2.5 font-sh-subheader text-xs tracking-widest transition-all cursor-pointer rounded-[8px]"
                  id="checkout-cancel-btn"
                >
                  REGRESAR AL COFRE
                </button>
              </div>
            </form>
          ) : (
            /* Part 3: Success Confirmation scroll */
            <div className="text-center my-auto flex flex-col items-center gap-6" id="checkout-success-block">
              
              <div className="w-16 h-16 rounded-full bg-emerald-600/15 border border-emerald-500/80 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>

              <div className="bg-brand-surface border-2 border-brand-tertiary p-6 text-center relative max-w-sm w-full rounded-[10px] shadow-[0_0_20px_rgba(166,124,82,0.15)]">
                {/* rivets */}
                <span className="absolute top-1.5 left-2 text-brand-tertiary/40 text-[8px]">⚙</span>
                <span className="absolute top-1.5 right-2 text-brand-tertiary/40 text-[8px]">⚙</span>
                <span className="absolute bottom-1.5 left-2 text-brand-tertiary/40 text-[8px]">⚙</span>
                <span className="absolute bottom-1.5 right-2 text-brand-tertiary/40 text-[8px]">⚙</span>

                <span className="font-sh-subheader text-[9px] tracking-widest text-brand-tertiary block uppercase">
                  SALVOCONDUCTO IMPERIAL DE COFRE
                </span>
                
                <h4 className="font-h1-cinematic text-lg text-white block mt-2 leading-tight">
                  ¡MUCHAS GRACIAS POR TU COMPRA!
                </h4>
                <span className="font-sh-subheader text-[11px] text-zinc-300 block uppercase tracking-wider mt-1">
                  Adquisición Registrada Exitosamente
                </span>

                <span className="bg-black/60 text-brand-tertiary border border-brand-border font-mono text-xs px-3 py-1.5 inline-block font-bold mt-3 rounded-[4px]">
                  CÓDIGO: {orderId}
                </span>

                <p className="font-body-main text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify mt-5 pt-4 border-t border-brand-border/40">
                  Estimado explorador/a <strong className="text-white">{shippingName}</strong>, el escribano real ha asentado tu reclamo bajo las actas oficiales de Hibueras. Tus mercancías de guerra del cofre han sido procesadas con próximo zarpe de carabelas desde Trujillo. Recibirás tu salvoconducto digital en la dirección de correo electrónico: <em className="text-brand-tertiary not-italic font-mono">{shippingEmail}</em>.
                </p>
              </div>

              <button
                onClick={handleFinishSuccess}
                className="w-full bg-brand-secondary hover:bg-[#400A0A] border border-brand-secondary hover:border-brand-tertiary text-white py-3.5 font-sh-subheader text-xs tracking-widest font-bold transition-all cursor-pointer rounded-[8px] shadow-md mt-4"
                id="finish-success-btn"
              >
                RETORNAR AL ASTILLERO
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
