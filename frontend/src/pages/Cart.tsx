import { useState, useEffect } from "react";
import { Box } from "../components/Box";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { Button } from "../components/Button";
import { FaShoppingCart, FaQrcode, FaCreditCard, FaCopy } from "react-icons/fa";

export function Cart() {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";

    const [nick, setNick] = useState<string | null>(null);
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<"pix" | "card" | null>(null);
    const [pixData, setPixData] = useState<{ qrCodeBase64: string; qrCodeText: string } | null>(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const nickSalvo = localStorage.getItem("@colisao:nick");
        if (nickSalvo) {
            setNick(nickSalvo);
            fetchCart(nickSalvo);
        } else {
            setIsLoading(false);
        }

        setFirstName(localStorage.getItem("@colisao:firstName") || "");
        setLastName(localStorage.getItem("@colisao:lastName") || "");
        setCpf(localStorage.getItem("@colisao:cpf") || "");
        setEmail(localStorage.getItem("@colisao:email") || "");
    }, []);

    const fetchCart = async (userNick: string) => {
        try {
            const response = await fetch(`${API_URL}/api/cart/${userNick}`);
            const data = await response.json();

            if (response.ok && data.items) {
                setCartItems(data.items);
            }
        } catch (error) {
            console.error("Erro ao buscar carrinho:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
        if (!nick) return;

        try {
            const response = await fetch(`${API_URL}/api/cart/update-item`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nick, productId, quantity: newQuantity })
            });

            if (response.ok) {
                const updatedCart = await response.json();
                setCartItems(updatedCart.items);
            }
        } catch (error) {
            console.error("Erro ao atualizar quantidade:", error);
        }
    };

    const handleRemove = async (productId: string) => {
        if (!nick) return;

        try {
            const response = await fetch(`${API_URL}/api/cart/remove-item`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nick, productId })
            });

            if (response.ok) {
                const updatedCart = await response.json();
                setCartItems(updatedCart.items);
            }
        } catch (error) {
            console.error("Erro ao remover item:", error);
        }
    };

    const handleCheckout = async () => {
        if (!nick || !paymentMethod) return;

        if (paymentMethod === "pix" && (!firstName || !lastName || !cpf || !email)) {
            alert("Preencha Nome, Sobrenome, E-mail e CPF para gerar o PIX.");
            return;
        }

        setIsProcessing(true);

        if (paymentMethod === "pix") {
            localStorage.setItem("@colisao:firstName", firstName);
            localStorage.setItem("@colisao:lastName", lastName);
            localStorage.setItem("@colisao:cpf", cpf);
            localStorage.setItem("@colisao:email", email);
        }

        try {
            if (paymentMethod === "pix") {
                const res = await fetch(`${API_URL}/api/checkout/pix`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nick, firstName, lastName, cpf, email })
                });
                const data = await res.json();

                if (res.ok) {
                    setPixData(data);
                } else {
                    alert("Erro ao gerar PIX: " + data.error);
                }
            } else if (paymentMethod === "card") {
                const res = await fetch(`${API_URL}/api/checkout/card`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nick })
                });
                const data = await res.json();

                if (res.ok && data.url) {
                    window.location.href = data.url;
                } else {
                    alert("Erro ao gerar link de pagamento: " + data.error);
                }
            }
        } catch (error) {
            console.error("Erro no checkout:", error);
            alert("Erro de conexão com o servidor.");
        } finally {
            setIsProcessing(false);
        }
    };

    const copyToClipboard = () => {
        if (pixData?.qrCodeText) {
            navigator.clipboard.writeText(pixData.qrCodeText);
            alert("Código PIX copiado!");
        }
    };

    const getImageUrl = (path?: string) => {
        if (!path) return "";
        if (path.startsWith("http")) return path;
        return `${API_URL}${path}`;
    };

    const totalCart = cartItems.reduce((acc, item) => {
        return acc + (Number(item.product.price) * item.quantity);
    }, 0);

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300 pb-20">
            <Header />

            <div className="w-full max-w-6xl mx-auto py-32 px-6">
                <h1 className="text-3xl font-title text-primary mb-8 flex items-center gap-3">
                    <FaShoppingCart /> Seu Carrinho
                </h1>

                {!nick ? (
                    <Box className="w-full flex flex-col items-center justify-center py-20 text-center gap-4">
                        <p className="text-xl font-body">Você precisa informar seu nick para ver o carrinho.</p>
                        <Button label="Ir para a Loja" destination="/loja" color="primary" />
                    </Box>
                ) : isLoading ? (
                    <div className="w-full flex justify-center py-20">
                        <p className="animate-pulse text-lg font-body opacity-70">Carregando seus itens...</p>
                    </div>
                ) : cartItems.length === 0 ? (
                    <Box className="w-full flex flex-col items-center justify-center py-20 text-center gap-4">
                        <p className="text-xl font-body opacity-80">Seu carrinho está vazio, {nick}.</p>
                        <Button label="Explorar Produtos" destination="/loja" color="primary" />
                    </Box>
                ) : (
                    <div className="flex flex-col lg:flex-row items-start gap-8">

                        <div className="w-full lg:w-2/3 flex flex-col gap-4">
                            {[...cartItems]
                                .sort((a, b) => a.product.server.localeCompare(b.product.server))
                                .sort((a, b) => a.product.productName.localeCompare(b.product.productName))
                                .map((item: any) => (
                                    <ProductCard
                                        key={item.id}
                                        productName={item.product.productName}
                                        price={Number(item.product.price)}
                                        server={item.product.server}
                                        photoUrl={getImageUrl(item.product.photoUrl)}
                                        quantity={item.quantity}
                                        onUpdateQuantity={(newQuantity) => handleUpdateQuantity(item.product.id, newQuantity)}
                                        onRemove={() => handleRemove(item.product.id)}
                                    />
                                ))}
                        </div>

                        <Box className="w-full lg:w-1/3 items-start! text-left! flex flex-col gap-6 sticky top-32">
                            <h2 className="text-3xl font-bold text-foreground">Finalizar Pedido</h2>

                            <div className="flex justify-between w-full items-center border-b border-secondary/20 pb-4">
                                <span className="text-lg font-bold">Total:</span>
                                <span className="text-3xl font-bold text-button">R$ {totalCart.toFixed(2)}</span>
                            </div>

                            {/* Seleção de Pagamento ou Exibição do PIX */}
                            {!pixData ? (
                                <div className="w-full flex flex-col gap-4">
                                    <p className="font-semibold opacity-80">Escolha a forma de pagamento:</p>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setPaymentMethod("pix")}
                                            className={`flex-1 py-3 flex flex-col items-center gap-2 rounded-xl border-2 transition-colors ${paymentMethod === "pix" ? "border-button bg-button/10 text-button" : "border-secondary/30 hover:border-button/50"}`}
                                        >
                                            <FaQrcode size={24} />
                                            <span className="font-bold">PIX</span>
                                        </button>
                                        <button
                                            onClick={() => setPaymentMethod("card")}
                                            className={`flex-1 py-3 flex flex-col items-center gap-2 rounded-xl border-2 transition-colors ${paymentMethod === "card" ? "border-button bg-button/10 text-button" : "border-secondary/30 hover:border-button/50"}`}
                                        >
                                            <FaCreditCard size={24} />
                                            <span className="font-bold">Cartão</span>
                                        </button>
                                    </div>

                                    {paymentMethod === "pix" && (
                                        <div className="flex flex-col gap-3 mt-2 animate-in fade-in slide-in-from-top-2">
                                            <p className="text-sm opacity-70">Preencha os campos abaixo:</p>
                                            
                                            <div className="flex gap-2">
                                                <input 
                                                    type="text" 
                                                    placeholder="Nome" 
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    className="w-1/2 bg-background border border-secondary/30 rounded-lg p-3 text-foreground outline-none focus:border-primary transition-colors"
                                                />
                                                <input 
                                                    type="text" 
                                                    placeholder="Sobrenome" 
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    className="w-1/2 bg-background border border-secondary/30 rounded-lg p-3 text-foreground outline-none focus:border-primary transition-colors"
                                                />
                                            </div>
                                            
                                            <input 
                                                type="email" 
                                                placeholder="E-mail" 
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-background border border-secondary/30 rounded-lg p-3 text-foreground outline-none focus:border-primary transition-colors"
                                            />

                                            <input 
                                                type="number" 
                                                placeholder="CPF" 
                                                value={cpf}
                                                onChange={(e) => setCpf(e.target.value)}
                                                maxLength={14}
                                                className="w-full bg-background border border-secondary/30 rounded-lg p-3 text-foreground outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                    )}

                                    <Button
                                        label={isProcessing ? "Aguarde..." : "Pagar Agora"}
                                        color="button"
                                        className={`w-full mt-2 text-lg py-4 ${(!paymentMethod || isProcessing) ? "opacity-50 cursor-not-allowed" : ""}`}
                                        onClick={(!paymentMethod || isProcessing) ? undefined : handleCheckout}
                                    />
                                </div>
                            ) : (
                                <div className="w-full flex flex-col items-center gap-4 animate-in fade-in">
                                    <p className="text-center font-bold text-green-500">PIX Gerado com Sucesso!</p>
                                    <img
                                        src={`data:image/jpeg;base64,${pixData.qrCodeBase64}`}
                                        alt="QR Code PIX"
                                        className="w-48 h-48 rounded-xl border-4 border-secondary/30"
                                    />
                                    <button
                                        onClick={copyToClipboard}
                                        className="flex items-center gap-2 w-full justify-center py-3 bg-secondary/20 hover:bg-secondary/40 rounded-xl font-bold transition-colors"
                                    >
                                        <FaCopy /> Copiar Código Copia e Cola
                                    </button>
                                    <p className="text-sm text-center opacity-70 mt-2">
                                        Assim que você pagar, o sistema detectará automaticamente e os itens serão enviados para o servidor.
                                    </p>
                                </div>
                            )}
                        </Box>
                    </div>
                )}
            </div>
        </div>
    );
}