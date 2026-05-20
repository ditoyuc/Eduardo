import React, { useState, FormEvent } from "react";
import { User, LogIn, Sparkles, LogOut, CheckCircle } from "lucide-react";

interface LoginRegisterPageProps {
  onLoginSuccess: (username: string) => void;
  onProceedAsGuest: () => void;
  onGoToRegisterSuccess?: () => void;
}

export default function LoginRegisterPage({ onLoginSuccess, onProceedAsGuest }: LoginRegisterPageProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register" | "guest">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMsg("");

    if (!email || !password) {
      setErrorMessage("Por favor introduce credenciales legítimas de combate.");
      return;
    }

    // Extract handle as guest name or custom tag
    const defaultNick = email.split("@")[0] || "Explorador";
    onLoginSuccess(defaultNick);
  };

  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMsg("");

    if (!email || !password || !nickname) {
      setErrorMessage("Por favor cumplimenta todos los campos ceremoniales.");
      return;
    }

    if (!isChecked) {
      setErrorMessage("Debe aceptar los términos de la Legión Imperial de RR Games.");
      return;
    }

    setSuccessMsg("¡Registro satisfactorio! Su pergamino ha sido sellado correctamente. Procediendo a iniciar canal de combate...");
    setTimeout(() => {
      onLoginSuccess(nickname);
    }, 2000);
  };

  const handleGoogleMockLogin = () => {
    setErrorMessage("");
    setSuccessMsg("");
    // Fast mock google link
    onLoginSuccess("Guerrero_Vía_Google");
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-[#0E0E0E] border-2 border-[#A67C52]/40 relative p-6 md:p-8 shadow-2xl" id="login-register-block">
      
      {/* Visual background details */}
      <span className="absolute top-1.5 left-2 text-[#eebd8e]/30 text-[8px]">⚔</span>
      <span className="absolute top-1.5 right-2 text-[#eebd8e]/30 text-[8px]">⚔</span>

      {/* Page Title */}
      <div className="text-center mb-8">
        <span className="font-sh-subheader tracking-widest text-[#eebd8e] text-xs font-bold block mb-1 uppercase">
          RR GAMES • ACCESO MULTIPLATAFORMA
        </span>
        <h2 className="font-h1-cinematic text-xl sm:text-2xl text-white tracking-wider uppercase">
          CANAL DE ALISTAMIENTO
        </h2>
        <p className="text-[11px] text-zinc-500 font-sans tracking-wide mt-1 italic">
          “Defiende tus raíces, conquista tu historia.”
        </p>
      </div>

      {/* Tabs configuration */}
      <div className="grid grid-cols-3 border-b border-outline-variant/30 mb-6" id="login-register-tabs">
        {[
          { label: "LOGIN", value: "login" },
          { label: "REGISTRO", value: "register" },
          { label: "INVITADO", value: "guest" }
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              setActiveTab(tab.value as any);
              setErrorMessage("");
              setSuccessMsg("");
            }}
            className={`py-2 text-center text-xs font-sh-subheader tracking-widest transition-all cursor-pointer rounded-none uppercase ${
              activeTab === tab.value
                ? "text-secondary border-b-2 border-secondary font-bold bg-[#2B0505]/20"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Error / Success warning indicators */}
      {errorMessage && (
        <div className="bg-red-950/25 border border-red-900/40 p-3 mb-4 text-xs text-red-400 font-sans uppercase">
          ⚠️ {errorMessage}
        </div>
      )}

      {successMsg && (
        <div className="bg-emerald-950/25 border border-emerald-900/40 p-3 mb-4 text-xs text-emerald-400 font-sans uppercase flex gap-2 items-center">
          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Google Login button */}
      {activeTab !== "guest" && (
        <div className="mb-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleGoogleMockLogin}
            className="w-full bg-white hover:bg-zinc-100 text-black py-2.5 px-4 text-xs font-label-caps tracking-widest font-bold transition-all cursor-pointer rounded-none flex items-center justify-center gap-2 shadow-md"
            id="google-conquest-btn"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.21.81-.64z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            ACCEDER CON GOOGLE
          </button>
          <div className="flex items-center gap-2">
            <span className="flex-1 h-[1px] bg-outline-variant/30"></span>
            <span className="text-[10px] text-zinc-500 font-sh-subheader tracking-wider">O INTRODUCIR PERGAMINO</span>
            <span className="flex-1 h-[1px] bg-outline-variant/30"></span>
          </div>
        </div>
      )}

      {/* TAB: LOGIN FORM */}
      {activeTab === "login" && (
        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 text-left">
          <div>
            <label className="font-sh-subheader text-[10px] tracking-widest text-[#eebd8e] block uppercase mb-1">Correo Electrónico:</label>
            <input
              type="email"
              placeholder="ej: Lempira@rrgames.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#18181A] border border-[#A67C52]/40 p-2.5 text-white font-sans text-xs focus:border-secondary outline-none rounded-none"
            />
          </div>

          <div>
            <label className="font-sh-subheader text-[10px] tracking-widest text-[#eebd8e] block uppercase mb-1">Clave de Acceso:</label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#18181A] border border-[#A67C52]/40 p-2.5 text-white font-sans text-xs focus:border-secondary outline-none rounded-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2B0505] hover:bg-red-950 text-[#eebd8e] border border-secondary text-xs font-label-caps py-3 tracking-widest font-bold transition-all cursor-pointer rounded-none mt-2 uppercase flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            INICIAR SESIÓN EN LA RED
          </button>
        </form>
      )}

      {/* TAB: REGISTER FORM */}
      {activeTab === "register" && (
        <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4 text-left">
          
          <div>
            <label className="font-sh-subheader text-[10px] tracking-widest text-[#eebd8e] block uppercase mb-1">Apodo de Guerrero (Nickname):</label>
            <input
              type="text"
              placeholder="ej: EspadaImperial"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              className="w-full bg-[#18181A] border border-[#A67C52]/40 p-2.5 text-white font-sans text-xs focus:border-secondary outline-none rounded-none"
            />
          </div>

          <div>
            <label className="font-sh-subheader text-[10px] tracking-widest text-[#eebd8e] block uppercase mb-1">Correo Electrónico:</label>
            <input
              type="email"
              placeholder="ej: conquistador@rrgames.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#18181A] border border-[#A67C52]/40 p-2.5 text-white font-sans text-xs focus:border-secondary outline-none rounded-none"
            />
          </div>

          <div>
            <label className="font-sh-subheader text-[10px] tracking-widest text-[#eebd8e] block uppercase mb-1">Clave Secreta:</label>
            <input
              type="password"
              placeholder="Guardar clave robusta..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#18181A] border border-[#A67C52]/40 p-2.5 text-white font-sans text-xs focus:border-secondary outline-none rounded-none"
            />
          </div>

          <div className="flex items-start gap-2 mt-1">
            <input
              type="checkbox"
              id="accepted-legion"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mt-0.5 accent-secondary"
            />
            <label htmlFor="accepted-legion" className="text-[10px] text-zinc-400 font-sans leading-relaxed uppercase cursor-pointer select-none">
              Acepto guardar el secreto de Sons of Hell y unirme a la legión de RR Games.
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2B0505] hover:bg-red-950 text-[#eebd8e] border border-secondary text-xs font-label-caps py-3 tracking-widest font-bold transition-all cursor-pointer rounded-none mt-2 uppercase"
          >
            FORJAR NUEVA CUENTA
          </button>
        </form>
      )}

      {/* TAB: GUEST FLOW */}
      {activeTab === "guest" && (
        <div className="flex flex-col gap-4 text-left">
          <p className="font-body-main text-sm text-zinc-300 leading-relaxed text-justify mb-2">
            Puedes avanzar con tu adquisición sin necesidad de registrar tu pergamino en los templos. Sin embargo, no acumularás puntos militares de rango para tus partidas en Sons of Hell.
          </p>

          <button
            onClick={onProceedAsGuest}
            className="w-full bg-[#A67C52] hover:bg-amber-800 text-black py-3.5 font-label-caps text-xs tracking-widest font-bold transition-all cursor-pointer rounded-none flex items-center justify-center gap-2"
            id="proceed-as-guest-btn"
          >
            CONTINUAR COMO INVITADO
          </button>
        </div>
      )}

    </div>
  );
}
