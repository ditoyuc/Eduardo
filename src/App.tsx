import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GameProduct, CartItem, Faction, AppPage, GalleryItem, CheckoutData } from "./types";
import { PRODUCTS, GALLERY } from "./data";

// Component imports
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import Features from "./components/Features";
import InteractivePrologue from "./components/InteractivePrologue";
import StoreSection from "./components/StoreSection";
import FactionsRecruiter from "./components/FactionsRecruiter";
import GallerySection from "./components/GallerySection";
import TrailerModal from "./components/TrailerModal";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";

// E-commerce pages
import ProductDetail from "./components/ProductDetail";
import SearchResultsPage from "./components/SearchResultsPage";
import CartPage from "./components/CartPage";
import LoginRegisterPage from "./components/LoginRegisterPage";
import ShippingPage from "./components/ShippingPage";
import PaymentPage from "./components/PaymentPage";
import ConfirmationPage from "./components/ConfirmationPage";

import { Scroll, X, SwatchBook, PlaySquare } from "lucide-react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>("home");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [selectedFaction, setSelectedFaction] = useState<Faction | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);

  // E-commerce specific states
  const [selectedProduct, setSelectedProduct] = useState<GameProduct | null>(null);
  const [searchInitialQuery, setSearchInitialQuery] = useState("");
  const [username, setUsername] = useState<string | null>(null);
  const [appliedDiscount, setAppliedDiscount] = useState(0); // 0 to 1
  const [couponCode, setCouponCode] = useState("");
  const [checkoutData, setCheckoutData] = useState<Partial<CheckoutData>>({});
  const [purchasedItems, setPurchasedItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("sons-of-hell-cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        // Map saved product IDs back to raw objects
        const hydrated: CartItem[] = parsed.map((saved: any) => {
          const rawProduct = PRODUCTS.find((p) => p.id === saved.productId);
          return {
            product: rawProduct,
            quantity: saved.quantity,
            selectedSize: saved.selectedSize,
            selectedPlatform: saved.selectedPlatform
          };
        }).filter((item: CartItem) => item.product !== undefined);
        setCartItems(hydrated);
      } catch (e) {
        console.error("Fallo al hidratar el carro de compras", e);
      }
    }
  }, []);

  // Save cart to local storage on changes
  const saveCartToStorage = (updatedItems: CartItem[]) => {
    const minified = updatedItems.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
      selectedSize: item.selectedSize,
      selectedPlatform: item.selectedPlatform
    }));
    localStorage.setItem("sons-of-hell-cart", JSON.stringify(minified));
  };

  const handleAddToCart = (product: GameProduct, size?: string, platform?: string) => {
    // Check if matching item exists (must match BOTH id, size and platform)
    const existingIndex = cartItems.findIndex(
      (item) => 
        item.product.id === product.id && 
        item.selectedSize === size && 
        item.selectedPlatform === platform
    );

    let updated: CartItem[];
    if (existingIndex > -1) {
      updated = [...cartItems];
      updated[existingIndex].quantity += 1;
    } else {
      updated = [...cartItems, { product, quantity: 1, selectedSize: size, selectedPlatform: platform }];
    }

    setCartItems(updated);
    saveCartToStorage(updated);
    setIsCartOpen(true); // Auto launch cart drawer upon selection
  };

  const handleUpdateQuantity = (productId: string, amount: number, size?: string, platform?: string) => {
    const updated = cartItems.map((item) => {
      if (
        item.product.id === productId && 
        item.selectedSize === size && 
        item.selectedPlatform === platform
      ) {
        return { ...item, quantity: Math.max(1, item.quantity + amount) };
      }
      return item;
    });
    setCartItems(updated);
    saveCartToStorage(updated);
  };

  const handleRemoveItem = (productId: string, size?: string, platform?: string) => {
    const updated = cartItems.filter(
      (item) => !(
        item.product.id === productId && 
        item.selectedSize === size && 
        item.selectedPlatform === platform
      )
    );
    setCartItems(updated);
    saveCartToStorage(updated);
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem("sons-of-hell-cart");
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFactionSelect = (fac: Faction) => {
    setSelectedFaction(fac);
    setCurrentPage("chronicles");
  };

  const handleSelectSearchResult = (type: "product" | "gallery", id: string) => {
    if (type === "product") {
      const matchProduct = PRODUCTS.find((p) => p.id === id);
      if (matchProduct) {
        setSelectedProduct(matchProduct);
        setCurrentPage("detail");
      }
    } else if (type === "gallery") {
      setCurrentPage("gallery");
      const matchedItem = GALLERY.find((g) => g.id === id);
      if (matchedItem) {
        setSelectedGalleryItem(matchedItem);
      }
    }
  };

  const handleViewProductDetail = (product: GameProduct) => {
    setSelectedProduct(product);
    setCurrentPage("detail");
  };

  const handleDirectBuy = (product: GameProduct, size?: string, platform?: string) => {
    handleAddToCart(product, size, platform);
    setIsCartOpen(false);
    setCurrentPage("cart");
  };

  // Checkout flows
  const handleApplyCoupon = (code: string, discount: number) => {
    setCouponCode(code);
    setAppliedDiscount(discount);
  };

  const handleProceedToCheckout = () => {
    if (username) {
      setCurrentPage("shipping");
    } else {
      setCurrentPage("login");
    }
  };

  const handleLoginRegisterSuccess = (nick: string) => {
    setUsername(nick);
    setCurrentPage("shipping");
  };

  const handleProceedAsGuest = () => {
    setUsername("Invitado de Honor");
    setCurrentPage("shipping");
  };

  const handleProceedToPayment = (shippingDetails: Partial<CheckoutData>) => {
    setCheckoutData((prev) => ({ ...prev, ...shippingDetails }));
    setCurrentPage("payment");
  };

  const handleConfirmPurchase = (method: "card" | "paypal") => {
    setCheckoutData((prev) => ({ ...prev, paymentMethod: method }));
    // Copy cart items first as we clear the active cart
    setPurchasedItems([...cartItems]);
    setCurrentPage("confirmation");
    setCartItems([]);
  };

  const handleRestartSession = () => {
    setPurchasedItems([]);
    setAppliedDiscount(0);
    setCouponCode("");
    setCurrentPage("store");
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);


  return (
    <div className="bg-background text-on-background font-sans min-h-screen relative overflow-x-hidden selection:bg-secondary selection:text-black">
      
      {/* Background audio player mockup hidden banner */}
      <div className="fixed bottom-4 left-4 z-40 bg-black/85 border border-outline-variant/60 px-4 py-2 flex items-center gap-3 shadow-2xl backdrop-blur-md rounded-none">
        <PlaySquare className="text-secondary w-4 h-4 animate-pulse shrink-0" />
        <div className="text-[10px] font-sh-subheader tracking-wider">
          <span className="text-[#eebd8e] block uppercase">BANDA SONORA ACTIVA</span>
          <span className="text-on-surface-variant text-[9px] block">"Trujillo en Llamas" • 1521</span>
        </div>
      </div>

      {/* Primary header navbar */}
      <Header 
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        currentPage={currentPage}
        onChangePage={setCurrentPage}
        onOpenRecruiter={() => {
          setCurrentPage("register");
        }}
        onSelectSearchResult={handleSelectSearchResult}
      />

      {/* Main active multi-page viewport with smooth AnimatePresence transition */}
      <main className="relative min-h-[70vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {currentPage === "home" && (
              <>
                <Hero 
                  onOpenTrailer={() => setIsTrailerOpen(true)}
                  onScrollToStore={() => setCurrentPage("store")}
                />
                <AboutSection 
                   onSelectFaction={handleFactionSelect}
                />
              </>
            )}

            {currentPage === "chronicles" && (
              <div className="pt-28 md:pt-36 pb-16 md:pb-28 min-h-screen bg-[#0c0c0c]">
                <InteractivePrologue 
                  initialFaction={selectedFaction}
                  onClose={() => {
                    setSelectedFaction(null);
                    setCurrentPage("home");
                  }}
                />
              </div>
            )}

            {currentPage === "store" && (
              <div className="pt-28 md:pt-36 pb-16 md:pb-28 min-h-screen bg-background">
                <StoreSection 
                  onAddToCart={handleAddToCart}
                  onViewDetail={handleViewProductDetail}
                />
              </div>
            )}

            {currentPage === "detail" && selectedProduct && (
              <div className="pt-28 md:pt-36 pb-16 md:pb-28 min-h-screen bg-background">
                <ProductDetail
                  product={selectedProduct}
                  onAddToCart={handleAddToCart}
                  onDirectBuy={handleDirectBuy}
                  onBack={() => setCurrentPage("store")}
                />
              </div>
            )}

            {currentPage === "search" && (
              <div className="pt-28 md:pt-36 pb-16 md:pb-28 min-h-screen bg-background">
                <SearchResultsPage
                  initialQuery={searchInitialQuery}
                  onSelectProduct={handleViewProductDetail}
                />
              </div>
            )}

            {currentPage === "cart" && (
              <div className="pt-28 md:pt-36 pb-16 md:pb-28 min-h-screen bg-background">
                <CartPage
                  cartItems={cartItems}
                  couponCode={couponCode}
                  appliedDiscount={appliedDiscount}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onApplyCoupon={handleApplyCoupon}
                  onProceedToCheckout={handleProceedToCheckout}
                  onContinueShopping={() => setCurrentPage("store")}
                />
              </div>
            )}

            {currentPage === "login" && (
              <div className="pt-32 md:pt-40 pb-20 md:pb-32 min-h-screen bg-[#0c0c0c]/98 flex items-center justify-center px-4">
                <LoginRegisterPage
                  onLoginSuccess={handleLoginRegisterSuccess}
                  onProceedAsGuest={handleProceedAsGuest}
                />
              </div>
            )}

            {currentPage === "shipping" && (
              <div className="pt-28 md:pt-36 pb-16 md:pb-28 min-h-screen bg-background">
                <ShippingPage
                  cartItems={cartItems}
                  appliedDiscount={appliedDiscount}
                  onProceedToPayment={handleProceedToPayment}
                  onBackToCart={() => setCurrentPage("cart")}
                />
              </div>
            )}

            {currentPage === "payment" && (
              <div className="pt-28 md:pt-36 pb-16 md:pb-28 min-h-screen bg-background">
                <PaymentPage
                  cartItems={cartItems}
                  appliedDiscount={appliedDiscount}
                  shippingName={checkoutData.name}
                  shippingAddress={checkoutData.address}
                  onConfirmPurchase={handleConfirmPurchase}
                  onBackToShipping={() => setCurrentPage("shipping")}
                />
              </div>
            )}

            {currentPage === "confirmation" && (
              <div className="pt-28 md:pt-36 pb-16 md:pb-28 min-h-screen bg-background">
                <ConfirmationPage
                  purchasedItems={purchasedItems}
                  discountCode={couponCode}
                  shippingName={checkoutData.name}
                  shippingAddress={checkoutData.address}
                  onRestartSession={handleRestartSession}
                />
              </div>
            )}

            {currentPage === "gallery" && (
              <div className="pt-28 md:pt-36 pb-16 md:pb-28 min-h-screen bg-background">
                <GallerySection 
                  selectedItem={selectedGalleryItem}
                  onSelectItem={setSelectedGalleryItem}
                />
              </div>
            )}

            {currentPage === "features" && (
              <div className="pt-28 md:pt-36 pb-16 md:pb-28 min-h-screen bg-background">
                <Features />
              </div>
            )}

            {currentPage === "register" && (
              <div className="pt-32 md:pt-40 pb-20 md:pb-32 min-h-screen bg-[#0c0c0c]/98 flex items-center justify-center px-4">
                <div className="max-w-4xl w-full">
                  <FactionsRecruiter 
                    onClose={() => {
                      setCurrentPage("home");
                    }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>


      {/* Custom footer brand elements */}
      <Footer 
        onChangePage={setCurrentPage}
      />

      {/* IMMERSIVE MODALS AND SLIDE OVERLAYS */}

      {/* Shopping cofre list Drawer slider */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 pointer-events-auto"
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className="absolute right-0 top-0 h-full w-full max-w-md pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CartDrawer 
                cartItems={cartItems}
                onClose={() => setIsCartOpen(false)}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                onProceedToCartPage={() => {
                  setIsCartOpen(false);
                  setCurrentPage("cart");
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Film trailers movie visualizer */}
      {isTrailerOpen && (
        <TrailerModal 
          onClose={() => setIsTrailerOpen(false)}
        />
      )}

    </div>
  );
}
