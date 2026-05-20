import { useState, useEffect } from "react";
import { GameProduct, CartItem } from "../types";
import { Check, ShieldCheck, ShoppingBag, Truck, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";

interface ConfirmationPageProps {
  purchasedItems: CartItem[];
  discountCode: string;
  onRestartSession: () => void;
  shippingName?: string;
  shippingAddress?: string;
}

export default function ConfirmationPage({
  purchasedItems,
  discountCode,
  onRestartSession,
  shippingName = "Guerrero Legítimo",
  shippingAddress = "Trujillo, Hibueras"
}: ConfirmationPageProps) {
  const [orderCode, setOrderCode] = useState("");

  // Generate a random high-quality order ID on birth
  useEffect(() => {
    const chars = "0123456789ABCDEF";
    let code = "SOH-";
    for (let i = 0; i < 8; i++) {
      code += chars[Math.floor(Math.random() * 16)];
    }
    setOrderCode(code);
    
    // Clear cart on complete
    window.localStorage.removeItem("sons-of-hell-cart");
  }, []);

  const subtotal = purchasedItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = discountCode ? subtotal * 0.15 : 0; // Simple fallback calculation
  const shippingAmount = subtotal > 100 ? 0 : 9.99;
  const finalTotal = subtotal - discountAmount + shippingAmount;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="confirmation-page-block">
      
      {/* Dynamic graphic of victory banner */}
      <div className="bg-[#0e0e0e]/95 border-2 border-[#A67C52] p-8 md:p-12 text-center relative shadow-2xl flex flex-col items-center gap-6">
        
        <span className="absolute top-2 left-3 text-[#eebd8e]/30 text-[8px]">⚙</span>
        <span className="absolute top-2 right-3 text-[#eebd8e]/30 text-[8px]">⚙</span>

        {/* Big pulsing confirmation tick */}
        <div className="w-20 h-20 rounded-full bg-[#2B0505] border-2 border-[#eebd8e] flex items-center justify-center text-secondary shadow-lg shadow-red-950/40 animate-pulse-slow">
          <CheckCircle2 className="w-10 h-10 text-secondary" />
        </div>

        <div>
          <span className="font-sh-subheader tracking-widest text-[#eebd8e] text-xs font-bold block mb-1.5 uppercase">
            COMPRA CONFIRMADA EN HIBUERAS
          </span>
          <h2 className="font-h1-cinematic text-2xl sm:text-4xl text-white tracking-wide uppercase">
            ¡RESERVA CONSOLIDADA!
          </h2>
          <div className="w-20 h-[1.5px] bg-[#eebd8e]/40 mx-auto mt-4" />
        </div>

        {/* Order code panel card */}
        <div className="p-4 bg-black/60 border border-outline-variant/30 w-full max-w-md">
          <span className="text-[9px] text-zinc-500 font-sh-subheader block uppercase tracking-widest">PERGAMINO DE SEGUIMIENTO (CÓDIGO DE ORDEN):</span>
          <strong className="text-secondary font-mono text-lg block tracking-widest mt-1 select-all hover:text-white transition-colors" id="order-hex-code">
            {orderCode || "SOH-98A7F2D1"}
          </strong>
        </div>

        {/* Delivery timeline forecast */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center text-left py-4 border-t border-b border-outline-variant/20 w-full">
          <div className="flex-1 flex gap-3">
            <Truck className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <div>
              <span className="font-sh-subheader text-[11px] text-[#eebd8e] block uppercase">Plazo Estimado de Entrega Física:</span>
              <p className="text-zinc-400 font-sans text-xs mt-0.5 leading-relaxed">
                De 3 a 5 días laborables mediante Carabela Postal certificada con protección acolchada.
              </p>
            </div>
          </div>
          <div className="flex-1 flex gap-3">
            <div className="w-5 h-5 rounded-full bg-emerald-900/35 border border-emerald-800 text-emerald-400 text-center text-xs font-bold leading-none flex items-center justify-center shrink-0">@</div>
            <div>
              <span className="font-sh-subheader text-[11px] text-[#eebd8e] block uppercase">Fórmula de Activación Digital:</span>
              <p className="text-zinc-400 font-sans text-xs mt-0.5 leading-relaxed">
                Su clave digital de Sons of Hell se ha despachado asíncronamente a su correo registrado.
              </p>
            </div>
          </div>
        </div>

        {/* List of purchased items */}
        <div className="w-full text-left">
          <span className="font-sh-subheader text-xs text-zinc-400 block mb-3 uppercase tracking-wider">RESUMEN DEL COFRE ENVIADO:</span>
          
          <div className="flex flex-col gap-2.5 max-h-[160px] overflow-y-auto mb-4 pr-1">
            {purchasedItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center bg-[#151515] p-3 border border-outline-variant/20 text-xs text-zinc-300">
                <div className="flex gap-2 items-center">
                  <span className="text-secondary font-bold font-mono">[{item.quantity}x]</span>
                  <span className="font-sans uppercase font-semibold">{item.product.title}</span>
                  {item.selectedSize ? (
                    <span className="bg-[#2B0505] text-[#eebd8e] text-[9px] px-1 py-0.2 select-none uppercase font-mono">{item.selectedSize}</span>
                  ) : (
                    item.selectedPlatform ? <span className="bg-[#2B0505] text-[#eebd8e] text-[9px] px-1 py-0.2 select-none font-mono uppercase">{item.selectedPlatform}</span> : ""
                  )}
                </div>
                <strong className="font-mono text-zinc-400">${(item.product.price * item.quantity).toFixed(2)}</strong>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center border-t border-outline-variant/20 pt-3 text-sm text-zinc-400 font-sans">
            <span>Importe Abonado Total:</span>
            <span className="font-mono text-secondary font-bold text-lg">${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Destination client label details */}
        <div className="p-4 bg-black/40 border border-outline-variant/20 w-full text-left font-sans text-xs text-zinc-400">
          <span className="font-sh-subheader text-[10px] text-secondary block uppercase mb-1">CÉDULA DE DESPACHO PARA:</span>
          <p className="text-white font-bold">{shippingName}</p>
          <p className="opacity-75">{shippingAddress}</p>
        </div>

        {/* Buttons CTAs */}
        <div className="flex gap-4 w-full justify-center">
          <button
            onClick={onRestartSession}
            className="w-full bg-secondary hover:bg-amber-800 text-black py-4 font-label-caps text-xs tracking-widest font-bold transition-all cursor-pointer rounded-none flex items-center justify-center gap-2"
            id="confirmation-finish-cta"
          >
            <ShoppingBag className="w-4 h-4" />
            CONQUISTAR MÁS ADQUISICIONES
          </button>
        </div>

      </div>

    </div>
  );
}
