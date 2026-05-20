import { GALLERY } from "../data";
import { GalleryItem } from "../types";
import { Check, Compass, Info, X, MapPin, Eye } from "lucide-react";

interface GallerySectionProps {
  selectedItem: GalleryItem | null;
  onSelectItem: (item: GalleryItem | null) => void;
}

export default function GallerySection({ selectedItem, onSelectItem }: GallerySectionProps) {

  return (
    <section 
      id="gallery" 
      className="relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 lg:px-8 bg-surface-container-low scroll-mt-20 overflow-hidden border-t border-outline-variant/20"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="font-sh-subheader tracking-widest text-[#eebd8e] text-xs font-bold block mb-2 uppercase">
            CAPTURA EL MOMENTO
          </span>
          <h2 className="font-h1-cinematic text-3xl sm:text-5xl text-on-surface tracking-wide uppercase">
            CRÓNICAS VISUALES
          </h2>
          <div className="w-20 h-[1.5px] bg-secondary/40 mx-auto mt-4" />
        </div>

        {/* Gallery Box Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY.map((item) => (
            <div 
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="group bg-background border border-outline-variant/60 relative overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:border-secondary cursor-pointer shadow-lg aspect-square"
              id={`gallery-item-${item.id}`}
            >
              {/* Photo Image */}
              <img 
                src={item.image} 
                alt={item.alt} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 ease-out scale-100 group-hover:scale-105"
              />

              {/* Gradient Vignette overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Static overlay text matching mockup */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="font-label-caps text-[9px] text-[#eebd8e]/80 tracking-widest block mb-1">
                  {item.tagline}
                </span>
                <h3 className="font-sh-subheader text-on-surface text-base sm:text-lg font-bold uppercase tracking-wide group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>
                <span className="font-sans text-[10px] text-on-surface-variant/75 flex items-center gap-1 mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Eye className="w-3 h-3 text-secondary" /> VER INFORMACIÓN HISTÓRICA
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Unmatched Majestic Stone Ruins UE5 Visual Backdrop mockup from reference */}
        <div className="mt-16 border-2 border-outline-variant bg-[#111111] p-6 sm:p-10 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-2xl">
          
          <div className="absolute inset-0 opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] pointer-events-none" />

          {/* Picture side showing stone ruins forest sunset */}
          <div className="w-full md:w-2/5 h-48 sm:h-64 overflow-hidden border border-outline-variant/40 relative z-10">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxlRdKS2OFWslxV1s7LOkMznPtYiPr6KjOexhb-v0UCzkdcVanwG6Ez7i-sMbvth_RuxVMFmxKN22J53nMub9tRhpeWSB6_j_SjZ7ib6jP_1CTzQnu3PJpIkiGT8iVBKPswe9Beq1RCmq2HHSZeBFqrx2JvTuFL3bSJrM3FZiTbMfAcd_99PheAR9bohH-qgCVxW3cAx9Cdvm0RxjJAcFIWBq-PiqZp8ynRxk3DTd18EAVdJaNENnaKPHqX1OmANesOyEA_2zDRqs"
              alt="Unreal Engine cinematic render of ruined stone temples under night forest crimson sunsets"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>

          {/* Descriptive narrative side */}
          <div className="w-full md:w-3/5 text-left relative z-10">
            <span className="font-label-caps text-xs text-secondary/70 tracking-widest block uppercase mb-1.5">REGISTRO DE EXPEDICIÓN</span>
            <h3 className="font-sh-subheader text-xl sm:text-2xl text-on-surface uppercase tracking-wide mb-3">
              LOS EXPEDIENTES DE UNA ERA PERDIDA
            </h3>
            <p className="font-body-main text-base sm:text-lg text-on-surface-variant/85 leading-relaxed text-justify mb-4">
              Cada rincón del mapeado de Sons of Hell se cimenta sobre crónicas verdaderas de conquistadores, cartas recopiladas en los Archivos de Indias y relatos transmitidos por los custodios nativos. Nuestro motor gráfico recrea desde fogatas parpadeantes en valles cubiertos de bruma hasta templos olvidados reclamados por las enredaderas de Trujillo.
            </p>
            <div className="flex flex-wrap gap-4 text-[10px] font-mono text-secondary">
              <span className="bg-surface-container px-3 py-1 border border-outline-variant/40">ENGINE: UNREAL GRAPHICS 5.4</span>
              <span className="bg-surface-container px-3 py-1 border border-outline-variant/40">UBC: TRUJILLO/HIBUERAS</span>
            </div>
          </div>

        </div>

        {/* Dynamic Chronicle Lore Modal Backdrop */}
        {selectedItem && (
          <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={() => onSelectItem(null)}
            id="gallery-modal"
          >
            {/* Modal Box */}
            <div 
              className="bg-[#141414] border-2 border-outline-variant rounded-none max-w-3xl w-full max-h-[90vh] overflow-y-auto relative p-6 sm:p-8 shadow-2xl flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Corner brackets */}
              <span className="absolute top-2 left-2 text-[#eebd8e] font-mono text-[9px] opacity-60">⚙</span>
              <span className="absolute top-2 right-2 text-[#eebd8e] font-mono text-[9px] opacity-60">⚙</span>
              <span className="absolute bottom-2 left-2 text-[#eebd8e] font-mono text-[9px] opacity-60">⚙</span>
              <span className="absolute bottom-2 right-2 text-[#eebd8e] font-mono text-[9px] opacity-60">⚙</span>

              {/* Close trigger */}
              <button 
                onClick={() => onSelectItem(null)}
                className="absolute top-4 right-4 p-2 text-on-surface-variant hover:text-secondary cursor-pointer"
                id="close-gallery-modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Graphic container */}
              <div className="h-64 sm:h-80 w-full overflow-hidden border border-outline-variant/40 relative">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.alt} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-mono text-secondary">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="tracking-wide uppercase bg-black/70 px-2.5 py-0.5">{selectedItem.tagline}</span>
                </div>
              </div>

              {/* Header Title block */}
              <div>
                <h3 className="font-h1-cinematic text-xl sm:text-2xl text-on-surface tracking-wider uppercase mb-1">
                  {selectedItem.title}
                </h3>
                <span className="font-sans text-xs text-secondary tracking-widest block uppercase">CRÓNICA DOCUMENTAL DE LA EXPEDICIÓN</span>
              </div>

              {/* Narrative side */}
              <p className="font-body-main text-lg sm:text-xl text-on-surface-variant leading-relaxed text-justify">
                {selectedItem.description}
              </p>

              {/* Authentic Parchment Scroll lore section */}
              <div className="parchment-texture p-5 rounded-none border border-secondary/35 relative">
                <span className="font-sh-subheader text-xs text-[#2b0505]/65 block tracking-widest mb-2 uppercase">LORE HISTÓRICO REVELADO:</span>
                <p className="font-body-main text-base sm:text-lg text-justify leading-relaxed font-light text-[#2b0505]/95">
                  {selectedItem.lore}
                </p>
              </div>

              {/* Primary return trigger */}
              <div className="text-right">
                <button
                  onClick={() => onSelectItem(null)}
                  className="px-6 py-2.5 bg-[#ffb3ad] hover:bg-[#ffdad7] text-[#51221f] hover:text-black font-label-caps text-xs tracking-widest rounded-none cursor-pointer"
                  id="gallery-modal-return"
                >
                  REGRESAR A LA BITÁCORA
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
