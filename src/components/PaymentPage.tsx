import React, { useState, FormEvent } from "react";
import { CartItem, CheckoutData } from "../types";
import { CreditCard, Eye, ShieldAlert, CheckCircle, Smartphone } from "lucide-react";

interface PaymentPageProps {
  cartItems: CartItem[];
  appliedDiscount: number;
  onConfirmPurchase: (method: "card" | "paypal") => void;
  onBackToShipping: () => void;
  shippingName?: string;
  shippingAddress?: string;
}

export default function PaymentPage({
  cartItems,
  appliedDiscount,
  onConfirmPurchase,
  onBackToShipping,
  shippingName = "José Sebastián",
  shippingAddress = "Calle Real de Trujillo"
}: PaymentPageProps) {
  // Method choice: card or paypal
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  
  // Credit card form values state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState(shippingName);
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [err, setErr] = useState("");

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * appliedDiscount;
  const shippingAmount = subtotal > 100 ? 0 : 9.99;
  const finalTotal = subtotal - discountAmount + shippingAmount;

  const handlePaySubmit = (e: FormEvent) => {
    e.preventDefault();
    setErr("");

    if (paymentMethod === "card") {
      if (!cardNumber.trim() || !cardName.trim() || !cardExpiry.trim() || !cardCvv.trim()) {
        setErr("Por favor cumplimente los datos de su tarjeta militar.");
        return;
      }
    }

    if (!agreeTerms) {
      setErr("Debe consentir la legitimidad del cobro por RR Games.");
      return;
    }

    onConfirmPurchase(paymentMethod);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="payment-page-block">
      
      {/* Steps Indicators */}
      <div className="flex justify-center items-center gap-2 md:gap-4 mb-12">
        <div className="flex items-center text-zinc-500 font-sh-subheader text-xs tracking-wider">
          <span className="w-6 h-6 rounded-full border border-zinc-500 flex items-center justify-center mr-1.5 font-mono">1</span>
          <span>COFRE</span>
        </div>
        <div className="w-6 md:w-12 h-[1px] bg-zinc-700"></div>
        <div className="flex items-center text-zinc-500 font-sh-subheader text-xs tracking-wider">
          <span className="w-6 h-6 rounded-full border border-zinc-500 flex items-center justify-center mr-1.5 font-mono">2</span>
          <span>DESPACHO</span>
        </div>
        <div className="w-6 md:w-12 h-[1px] bg-zinc-700"></div>
        <div className="flex items-center text-[#eebd8e] font-sh-subheader text-xs tracking-wider font-bold">
          <span className="w-6 h-6 rounded-full border border-[#eebd8e] flex items-center justify-center mr-1.5 font-mono bg-[#2B0505]/30">3</span>
          <span>TRANSACCIÓN</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left column: payment choices and input details */}
        <div className="lg:col-span-7 bg-[#0E0E0E] border border-outline-variant/40 p-6 md:p-8 flex flex-col gap-6 text-left">
          
          <div className="flex justify-between items-center border-b border-outline-variant/30 pb-4">
            <h3 className="font-sh-subheader text-lg text-white uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-secondary" />
              DETALLES DE TRANSACCIÓN SECURE
            </h3>
            <span className="text-[10px] text-zinc-500 border border-emerald-900/40 bg-emerald-950/20 text-emerald-400 px-2 py-1 font-mono uppercase tracking-widest block font-bold">
              🔒 SSL 256 BITS
            </span>
          </div>

          {err && (
            <div className="bg-red-950/20 border border-red-900/40 text-red-400 p-3 text-xs uppercase font-sans">
              ⚠️ {err}
            </div>
          )}

          {/* Payment category option sliders or toggles */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                setPaymentMethod("card");
                setErr("");
              }}
              className={`py-4 px-4 border text-xs font-sh-subheader tracking-widest uppercase transition-all flex flex-col items-center gap-2 cursor-pointer ${
                paymentMethod === "card"
                  ? "bg-[#2B0505]/40 border-secondary text-secondary font-bold"
                  : "bg-black/35 border-outline-variant text-zinc-500 hover:text-white"
              }`}
              id="pay-choice-card"
            >
              <div className="w-6 h-6 rounded-full border border-secondary/50 flex items-center justify-center font-mono">
                {paymentMethod === "card" ? "✓" : ""}
              </div>
              PAGO CON TARJETA
            </button>

            <button
              onClick={() => {
                setPaymentMethod("paypal");
                setErr("");
              }}
              className={`py-4 px-4 border text-xs font-sh-subheader tracking-widest uppercase transition-all flex flex-col items-center gap-2 cursor-pointer ${
                paymentMethod === "paypal"
                  ? "bg-[#2B0505]/40 border-secondary text-secondary font-bold"
                  : "bg-black/35 border-outline-variant text-zinc-500 hover:text-white"
              }`}
              id="pay-choice-paypal"
            >
              <div className="w-6 h-6 rounded-full border border-secondary/50 flex items-center justify-center font-mono">
                {paymentMethod === "paypal" ? "✓" : ""}
              </div>
              PAGO CON PAYPAL
            </button>
          </div>

          <form onSubmit={handlePaySubmit} className="flex flex-col gap-5 mt-4">

            {/* CARD MODE FORM DISPLAY */}
            {paymentMethod === "card" && (
              <div className="flex flex-col gap-4">
                
                <div>
                  <label className="font-sh-subheader text-[10px] tracking-widest text-[#eebd8e] block uppercase mb-1">Nombre Completo en la Tarjeta:</label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="ej: José Sebastián de Trujillo"
                    className="w-full bg-[#161515] border border-outline-variant/65 p-2.5 text-white font-sans text-xs focus:border-secondary transition-colors outline-none rounded-none"
                  />
                </div>

                <div>
                  <label className="font-sh-subheader text-[10px] tracking-widest text-[#eebd8e] block uppercase mb-1">Número de la Tarjeta de Crédito/Débito:</label>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => {
                      // Simple digits formatting
                      const val = e.target.value.replace(/\D/g, "");
                      const formatted = val.match(/.{1,4}/g)?.join(" ") || val;
                      setCardNumber(formatted);
                    }}
                    placeholder="4000 1234 5678 9010"
                    className="w-full bg-[#161515] border border-outline-variant/65 p-2.5 text-white font-mono text-xs focus:border-secondary transition-colors outline-none tracking-widest rounded-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-sh-subheader text-[10px] tracking-widest text-[#eebd8e] block uppercase mb-1">Fecha de Expiración:</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/AA"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        if (val.length >= 2) {
                          setCardExpiry(val.slice(0, 2) + "/" + val.slice(2, 4));
                        } else {
                          setCardExpiry(val);
                        }
                      }}
                      className="w-full bg-[#161515] border border-outline-variant/65 p-2.5 text-white font-mono text-xs focus:border-secondary transition-colors outline-none tracking-widest rounded-none"
                    />
                  </div>

                  <div>
                    <label className="font-sh-subheader text-[10px] tracking-widest text-[#eebd8e] block uppercase mb-1">Código Secreto (CVC / CVV):</label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                      placeholder="•••"
                      className="w-full bg-[#161515] border border-outline-variant/65 p-2.5 text-white font-mono text-xs focus:border-secondary transition-colors outline-none tracking-widest rounded-none"
                    />
                  </div>
                </div>

              </div>
            )}

            {/* PAYPAL MODE FORM DISPLAY */}
            {paymentMethod === "paypal" && (
              <div className="p-5 bg-black/40 border border-outline-variant/30 flex flex-col gap-3">
                <span className="text-[#eebd8e] font-sh-subheader text-xs tracking-widest uppercase">Canal Instantáneo de Paypal</span>
                <p className="font-body-main text-sm text-zinc-300 leading-relaxed text-justify">
                  Sons of Hell admite la integración de Paypal Express. Al pulsar en confirmar a continuación, se le redireccionará temporalmente a un portal de pago asíncrono y seguro para sellar el pago.
                </p>
                <div className="bg-[#eecd5e]/15 border border-[#eecd5e]/30 px-3 py-2 text-xs text-[#eecd5e] font-sans flex items-center gap-1.5 w-max">
                  <Smartphone className="w-4 h-4" /> Pago por un toque activado
                </div>
              </div>
            )}

            {/* Consent agreements check */}
            <div className="flex items-start gap-2.5 mt-2 select-none">
              <input
                type="checkbox"
                id="agree-terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 accent-secondary h-4 w-4 cursor-pointer"
              />
              <label htmlFor="agree-terms" className="text-[10px] text-zinc-400 font-sans leading-relaxed uppercase cursor-pointer">
                Consiento el cargo inmediato de <strong className="text-secondary font-mono">${finalTotal.toFixed(2)}</strong> para iniciar el envío físico o digital de la campaña. Al pulsar comprendo que es un entorno de demostración de RR Games.
              </label>
            </div>

            {/* Navigation Buttons CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                type="button"
                onClick={onBackToShipping}
                className="flex-1 border-2 border-outline-variant/70 text-zinc-400 hover:text-white hover:border-white py-3 font-label-caps text-xs tracking-widest cursor-pointer transition-colors text-center"
              >
                ← VOLVER A DESPACHO
              </button>
              <button
                type="submit"
                className="flex-1 bg-secondary hover:bg-amber-800 text-black py-3 px-6 font-label-caps text-xs tracking-widest font-bold cursor-pointer transition-all flex items-center justify-center gap-2"
                id="payment-submit-btn"
              >
                CONFIRMAR COMPRA DE CAMPAÑA
              </button>
            </div>

          </form>

        </div>

        {/* Right column: Final payment summaries */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Detailed totals summary card */}
          <div className="bg-[#0e0e0e]/95 border-2 border-[#A67C52]/50 p-6 relative">
            <span className="absolute top-1.5 left-2 text-[#eebd8e]/30 text-[8px]">⚙</span>
            <span className="absolute top-1.5 right-2 text-[#eebd8e]/30 text-[8px]">⚙</span>

            <h4 className="font-sh-subheader text-white text-xs tracking-widest uppercase block mb-4 border-b border-outline-variant/20 pb-2">
              DESGLOSE FINAL DE TRANSACCIÓN
            </h4>

            <div className="flex flex-col gap-3 font-sans text-xs pb-4 border-b border-outline-variant/20">
              <div className="flex justify-between text-zinc-400">
                <span>Total de Artículos:</span>
                <span className="font-mono text-white">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)} unidades
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal de Adquisiciones:</span>
                <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Descuento aplicado:</span>
                  <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Costo del Despacho:</span>
                <span className="font-mono text-white">
                  {shippingAmount === 0 ? <strong className="text-emerald-400 font-sh-subheader text-[10px]">¡SIN CARGO!</strong> : `$${shippingAmount.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center py-4 text-white">
              <span className="font-sh-subheader text-sm uppercase font-bold text-secondary">TOTAL A PAGAR:</span>
              <span className="font-mono text-xl text-secondary font-bold">
                ${finalTotal.toFixed(2)}
              </span>
            </div>

            {/* Shipment address preview */}
            <div className="p-3.5 bg-black/45 border border-outline-variant/30 text-zinc-400 text-xs text-left font-sans mt-2">
              <span className="font-sh-subheader text-[10px] text-secondary block uppercase mb-1">Destinatario y Lugar:</span>
              <p className="font-semibold text-white truncate mb-0.5">{shippingName}</p>
              <p className="truncate opacity-75">{shippingAddress}</p>
            </div>
          </div>

          {/* Secure Trust warnings */}
          <div className="p-4 bg-emerald-950/20 border border-emerald-900/35 text-left flex gap-3 text-emerald-400 items-start">
            <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
            <div className="text-[11px] font-sans">
              <p className="font-semibold uppercase font-sh-subheader text-xs mb-1">COMPRA TOTALMENTE PROTEGIDA</p>
              <p className="leading-relaxed opacity-85">
                Sus credenciales bancarias y de envío son cifradas bajo la directriz del consorcio de RR Games. Ninguna información sensible se almacena sin encriptar.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
