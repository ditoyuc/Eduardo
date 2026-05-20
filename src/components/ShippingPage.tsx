import React, { useState, FormEvent } from "react";
import { CheckoutData, CartItem } from "../types";
import { ShieldCheck, ArrowRight, Truck, Eye, Lock } from "lucide-react";

interface ShippingPageProps {
  cartItems: CartItem[];
  appliedDiscount: number;
  onProceedToPayment: (data: Partial<CheckoutData>) => void;
  onBackToCart: () => void;
}

export default function ShippingPage({
  cartItems,
  appliedDiscount,
  onProceedToPayment,
  onBackToCart
}: ShippingPageProps) {
  // Controlled form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Honduras");
  const [zip, setZip] = useState("");
  const [isBillingSame, setIsBillingSame] = useState(true);
  const [err, setErr] = useState("");

  // Re-calculate pricing
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * appliedDiscount;
  const shippingAmount = subtotal > 100 ? 0 : 9.99;
  const finalTotal = subtotal - discountAmount + shippingAmount;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErr("");

    if (!name.trim() || !email.trim() || !address.trim() || !city.trim() || !zip.trim()) {
      setErr("Por favor cumplimente los datos de despacho requeridos.");
      return;
    }

    onProceedToPayment({
      name,
      email,
      address,
      city,
      country,
      zip,
      isBillingSame
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="shipping-page-block">
      
      {/* Steps Indicators */}
      <div className="flex justify-center items-center gap-2 md:gap-4 mb-12">
        <div className="flex items-center text-zinc-500 font-sh-subheader text-xs tracking-wider">
          <span className="w-6 h-6 rounded-full border border-zinc-500 flex items-center justify-center mr-1.5 font-mono">1</span>
          <span>COFRE</span>
        </div>
        <div className="w-6 md:w-12 h-[1px] bg-zinc-700"></div>
        <div className="flex items-center text-[#eebd8e] font-sh-subheader text-xs tracking-wider font-bold">
          <span className="w-6 h-6 rounded-full border border-[#eebd8e] flex items-center justify-center mr-1.5 font-mono bg-[#2B0505]/30">2</span>
          <span>DESPACHO</span>
        </div>
        <div className="w-6 md:w-12 h-[1px] bg-zinc-700"></div>
        <div className="flex items-center text-zinc-500 font-sh-subheader text-xs tracking-wider">
          <span className="w-6 h-6 rounded-full border border-zinc-500 flex items-center justify-center mr-1.5 font-mono">3</span>
          <span>TRANSACCIÓN</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left column: Shipping details form */}
        <div className="lg:col-span-7 bg-[#0E0E0E] border border-outline-variant/40 p-6 md:p-8 flex flex-col gap-6">
          <h3 className="font-sh-subheader text-lg text-white uppercase tracking-wider mb-2 flex items-center gap-2">
            <Truck className="w-5 h-5 text-secondary" />
            DIRECCIÓN DE DESPACHO
          </h3>

          {err && (
            <div className="bg-red-950/20 border border-red-900/40 text-red-400 p-3 text-xs uppercase font-sans">
              ⚠️ {err}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            
            <div className="md:col-span-2">
              <label className="font-sh-subheader text-[10px] tracking-widest text-[#eebd8e] block uppercase mb-1">Nombre Completo del Destinatario:</label>
              <input
                type="text"
                placeholder="ej: José Sebastián de Trujillo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-[#161515] border border-outline-variant/65 p-2.5 text-white font-sans text-xs focus:border-secondary transition-colors outline-none rounded-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-sh-subheader text-[10px] tracking-widest text-[#eebd8e] block uppercase mb-1">Correo para Envío de Comprobantes:</label>
              <input
                type="email"
                placeholder="ej: capitan@rrgames.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#161515] border border-outline-variant/65 p-2.5 text-white font-sans text-xs focus:border-secondary transition-colors outline-none rounded-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-sh-subheader text-[10px] tracking-widest text-[#eebd8e] block uppercase mb-1">Dirección de Entrega Física (o Domicilio):</label>
              <input
                type="text"
                placeholder="ej: Calle Real de las Carabelas, Barrio El Centro"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full bg-[#161515] border border-outline-variant/65 p-2.5 text-white font-sans text-xs focus:border-secondary transition-colors outline-none rounded-none"
              />
            </div>

            <div>
              <label className="font-sh-subheader text-[10px] tracking-widest text-[#eebd8e] block uppercase mb-1">Ciudad / Municipio:</label>
              <input
                type="text"
                placeholder="ej: Trujillo, Colón"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="w-full bg-[#161515] border border-outline-variant/65 p-2.5 text-white font-sans text-xs focus:border-secondary transition-colors outline-none rounded-none"
              />
            </div>

            <div>
              <label className="font-sh-subheader text-[10px] tracking-widest text-[#eebd8e] block uppercase mb-1">Código Postal:</label>
              <input
                type="text"
                placeholder="ej: 32101"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                required
                className="w-full bg-[#161515] border border-outline-variant/65 p-2.5 text-white font-sans text-xs focus:border-secondary transition-colors outline-none rounded-none"
              />
            </div>

            <div>
              <label className="font-sh-subheader text-[10px] tracking-widest text-[#eebd8e] block uppercase mb-1">País:</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-[#161515] border border-outline-variant/65 p-2.5 text-white font-sans text-xs focus:border-secondary transition-colors outline-none rounded-none"
              >
                <option value="Honduras">Honduras</option>
                <option value="España">España</option>
                <option value="México">México</option>
                <option value="Estados Unidos">Estados Unidos</option>
                <option value="Colombia">Colombia</option>
              </select>
            </div>

            {/* Facturación section inside form */}
            <div className="md:col-span-2 border-t border-outline-variant/20 pt-4 mt-2">
              <h4 className="font-sh-subheader text-xs text-[#eebd8e] tracking-widest block uppercase mb-2">
                DIRECCIÓN DE FACTURACIÓN
              </h4>
              <div className="flex items-center gap-2 select-none">
                <input
                  type="checkbox"
                  id="billing-same-check"
                  checked={isBillingSame}
                  onChange={(e) => setIsBillingSame(e.target.checked)}
                  className="accent-secondary h-4 w-4 cursor-pointer"
                />
                <label htmlFor="billing-same-check" className="text-xs text-zinc-400 font-sans uppercase cursor-pointer">
                  Misma que la dirección de despacho militar de arriba.
                </label>
              </div>
            </div>

            {/* CTAs */}
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 mt-6">
              <button
                type="button"
                onClick={onBackToCart}
                className="flex-1 border-2 border-outline-variant/70 text-zinc-400 hover:text-white hover:border-white py-3 font-label-caps text-xs tracking-widest cursor-pointer transition-colors text-center"
              >
                ← MODIFICAR COFRE
              </button>
              <button
                type="submit"
                className="flex-1 bg-secondary hover:bg-amber-800 text-black py-3 font-label-caps text-xs tracking-widest font-bold cursor-pointer transition-all flex items-center justify-center gap-2"
                id="shipping-submit-btn"
              >
                CONTINUAR AL METODO DE PAGO
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>

        </div>

        {/* Right column: Order summary panel */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Summary card with items */}
          <div className="p-6 bg-[#0E0E0E]/95 border border-outline-variant/40">
            <h4 className="font-sh-subheader text-secondary text-xs tracking-widest uppercase block mb-4 border-b border-outline-variant/20 pb-2">
              RESUMEN DEL PEDIDO COMPRADO
            </h4>

            {/* list elements mini cards */}
            <div className="flex flex-col gap-3 max-h-[220px] overflow-y-auto mb-4 pr-1">
              {cartItems.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize || ""}-${item.selectedPlatform || ""}`} className="flex gap-3 justify-between items-center bg-black/45 p-2.5 border border-outline-variant/20">
                  <div className="flex gap-2.5 items-center">
                    <img src={item.product.image} alt={item.product.title} className="w-10 h-10 object-cover border border-outline-variant/30" />
                    <div className="text-left">
                      <span className="font-sh-subheader text-xs font-bold text-white block uppercase tracking-wide truncate max-w-[160px]">{item.product.title}</span>
                      <span className="text-[9px] text-zinc-400 font-mono block">
                        CANT: {item.quantity} {item.selectedSize ? `| TALLA: ${item.selectedSize}` : (item.selectedPlatform ? `| ${item.selectedPlatform}` : "")}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-secondary font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Calculations summaries */}
            <div className="border-t border-outline-variant/20 pt-3 flex flex-col gap-2.5 font-sans text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal:</span>
                <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Descuento descontado:</span>
                  <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Carabela marítima:</span>
                <span className="font-mono text-white">
                  {shippingAmount === 0 ? <strong className="text-emerald-400 font-sh-subheader text-[10px]">¡EXENTO!</strong> : `$${shippingAmount.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-3 border-t border-outline-variant/20 text-white font-sh-subheader text-base uppercase font-bold text-secondary">
                <span>TOTAL ESTIMADO:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

          </div>

          {/* Security and speed trust badge */}
          <div className="p-6 bg-[#2B0505]/20 border-2 border-[#A67C52]/40 text-left flex flex-col gap-3">
            <h4 className="font-sh-subheader text-xs text-secondary uppercase tracking-widest flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-500" />
              Sello SSL de Integración
            </h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed uppercase">
              Sus datos viajan encriptados de extremo a extremidad mercenaria. RR Games garantiza un despacho con protección total contra corsarios o interrupciones de base de datos.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
