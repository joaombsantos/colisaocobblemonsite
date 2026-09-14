import { Header } from "../components/Header";
import { Box } from "../components/Box";
import { Input } from "../components/Input";
import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Dropdown } from "../components/Dropdown";
import { Card } from "../components/Card";

import storeBg from "../assets/store_background.png";
import { FaShoppingCart } from "react-icons/fa";

function CountdownTimer({ expiresAt }: { expiresAt: string }) {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const updateTimer = () => {
            const diff = new Date(expiresAt).getTime() - new Date().getTime();
            if (diff <= 0) {
                setTimeLeft("Expirado");
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);

            if (days > 0) {
                setTimeLeft(`${days}d ${hours}h`);
            } else {
                setTimeLeft(`${hours}h ${minutes}m`);
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 60000);
        return () => clearInterval(interval);
    }, [expiresAt]);

    return <span>{timeLeft}</span>;
}

export function Store() {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";

    const [nick, setNick] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [promotions, setPromotions] = useState<any[]>([]);

    useEffect(() => {
        const nickSalvo = localStorage.getItem("@colisao:nick");
        if (nickSalvo) {
            setNick(nickSalvo);
            setIsSubmitted(true);
        }
    }, []);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await fetch(`${API_URL}/api/promotions/active`);
                if (response.ok) {
                    const data = await response.json();
                    setPromotions(data);
                }
            } catch (err) {
                console.error("Erro ao buscar promoções:", err);
            }
        };

        fetchPromotions();
        const interval = setInterval(fetchPromotions, 30000);
        return () => clearInterval(interval);
    }, [API_URL]);

    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        if (nick.trim() === "") return;

        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/users/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nick: nick.trim() })
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                setErrorMsg("Erro interno no servidor.");
                return;
            }

            const data = await response.json();

            if (response.ok && data.success) {
                setNick(data.nick);
                setIsSubmitted(true);
                localStorage.setItem("@colisao:nick", data.nick);
            } else {
                setErrorMsg(data.error || "Nick não encontrado.");
            }
        } catch (err) {
            setErrorMsg("Erro ao conectar com o servidor.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddToCart = async (productId: string) => {
        try {
            const response = await fetch(`${API_URL}/api/cart/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nick: nick,
                    productId: productId,
                    quantity: 1
                })
            });

            if (!response.ok) {
                const data = await response.json();
                alert(`Erro: ${data.error || "Falha ao adicionar"}`);
            }
        } catch (error) {
            alert("Erro de conexão ao adicionar produto.");
        }
    };

    const categories = ["VIPs", "Caixas", "Passes", "Informações"];

    const [activeCategories, setActiveCategories] = useState("VIPs");
    const [selectedServer, setSelectedServer] = useState("Survival");

    const [storeProducts, setStoreProducts] = useState<any[]>([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);

    const serverMap: Record<string, string> = {
        "Kanto": "KANTO",
        "Kanto+": "KANTO_PLUS",
        "Survival": "SURVIVAL"
    };

    const categoryMap: Record<string, string> = {
        "VIPs": "VIPS",
        "Caixas": "CAIXAS",
        "Passes": "PASSES"
    };

    useEffect(() => {
        if (!isSubmitted || activeCategories === "Informações") return;

        const fetchProducts = async () => {
            setIsLoadingProducts(true);
            try {
                const backendCategory = categoryMap[activeCategories];
                const backendServer = serverMap[selectedServer];

                const url = `${API_URL}/api/products/category/${backendCategory}?server=${backendServer}`;

                const response = await fetch(url);
                const data = await response.json();

                if (response.ok) {
                    setStoreProducts(data);
                } else {
                    setStoreProducts([]);
                }
            } catch (error) {
                setStoreProducts([]);
            } finally {
                setIsLoadingProducts(false);
            }
        };

        fetchProducts();
    }, [activeCategories, selectedServer, isSubmitted]);

    return (
        <div
            className="min-h-screen text-foreground transition-colors duration-300 bg-cover bg-center bg-no-repeat bg-fixed bg-blend-overlay bg-black/50"
            style={{ backgroundImage: `url(${storeBg})` }}
        >
            <Header />

            <div className="w-full max-w-4xl mx-auto py-32 px-6 flex flex-col items-center gap-8">
                <Box color="bg-background/95 shadow-xl" className="transition-all duration-500">
                    {!isSubmitted ? (
                        <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-300">
                            <h2 className="font-title text-xl md:text-2xl mb-6 text-primary">
                                Insira seu Nick para continuar
                            </h2>
                            <form
                                onSubmit={handleSubmit}
                                className="w-full max-w-xs flex flex-col gap-6 justify-center items-center"
                            >
                                <Input
                                    label="Seu Nick"
                                    placeholder="Digite seu nick no servidor"
                                    value={nick}
                                    onChange={setNick}
                                />

                                {errorMsg && (
                                    <p className="text-red-500 text-sm font-semibold text-center animate-in fade-in">
                                        {errorMsg}
                                    </p>
                                )}

                                <Button
                                    label={isLoading ? "Verificando..." : "Entrar na Loja"}
                                    type="submit"
                                />
                            </form>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col items-center gap-4 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="relative group">
                                <img
                                    src={`https://mineskin.eu/helm/${nick}/100.png`}
                                    alt={`Skin de ${nick}`}
                                    className="w-24 h-24 md:w-32 md:h-32 rounded-lg shadow-xl border-4 border-button p-1 bg-white/10"
                                />
                                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-secondary animate-pulse" />
                            </div>

                            <div className="flex flex-col items-center">
                                <h2 className="font-title text-2xl md:text-3xl text-primary">
                                    Bem-vindo(a), {nick}!
                                </h2>
                                <button
                                    onClick={() => {
                                        setIsSubmitted(false);
                                        setNick("");
                                        localStorage.removeItem("@colisao:nick");
                                    }}
                                    className="text-xs font-body opacity-60 hover:opacity-100 underline mt-2 transition-opacity"
                                >
                                    Não é você? Clique aqui para trocar.
                                </button>
                            </div>
                        </div>
                    )}
                </Box>

                {isSubmitted && (
                    <div className="w-full flex justify-center md:justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Button
                            label="Ver Meu Carrinho"
                            destination="/carrinho"
                            icon={FaShoppingCart}
                            color="button"
                            className="w-full md:w-auto text-lg py-3 px-8 shadow-lg hover:scale-105 transition-transform"
                        />
                    </div>
                )}
            </div>

            <div className="w-5/6 mx-auto pb-20">
                {isSubmitted && (
                    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 animate-in fade-in duration-700">

                        <aside className="md:col-span-1 flex flex-col gap-4">
                            <Box color="bg-background/95 shadow-xl" className="p-4! md:p-6!">
                                <Dropdown
                                    label="Servidor"
                                    options={["Kanto", "Kanto+", "Survival"]}
                                    value={selectedServer}
                                    onChange={(e) => setSelectedServer(e.target.value)}
                                />

                                <nav className="flex flex-col gap-2 w-full mt-4">
                                    {categories.map((cat) => {
                                        const catKey = categoryMap[cat];

                                        const activePromo = promotions.find(p => {
                                            if (!p.isActive) return false;
                                            const promoCat = p.category?.toLowerCase();
                                            return promoCat === 'all' || promoCat === catKey?.toLowerCase();
                                        });

                                        return (
                                            <button
                                                key={cat}
                                                onClick={() => setActiveCategories(cat)}
                                                className={`
                                                w-full px-4 py-3 rounded-xl font-body font-bold transition-all flex items-center justify-between gap-2
                                                ${activeCategories === cat
                                                ? "bg-button text-bright_text shadow-md"
                                                : "hover:bg-secondary/20 text-foreground/75"}
                                            `}
                                            >
                                                <span className="text-left">{cat}</span>
                                                {activePromo && (
                                                    <span className="shrink-0 flex items-center gap-1 text-[10px] md:text-xs font-semibold bg-red-500/15 text-red-600 px-2 py-0.5 rounded-md">
                                                        <span>-{activePromo.discount}%</span>
                                                        <span className="opacity-75">|</span>
                                                        <CountdownTimer expiresAt={activePromo.expiresAt} />
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </nav>
                            </Box>
                        </aside>

                        <main className="md:col-span-3">
                            <Box color="bg-background/95 shadow-xl" className="text-left! h-full">
                                <h2 className="font-title text-2xl mb-6 text-primary">{activeCategories}</h2>

                                {activeCategories === "Informações" ? (
                                    <div className="font-body space-y-4 text-foreground/80">
                                        <h3 className="text-xl font-bold text-foreground">Como comprar no Colisão Cobblemon?</h3>
                                        <p>1. Certifique-se de estar logado com seu nick correto.</p>
                                        <p>2. Escolha o servidor desejado no menu lateral.</p>
                                        <p>3. Selecione seus itens e clique em "Ver Meu Carrinho" para ser redirecionado ao checkout.</p>
                                        <p>4. Após o pagamento você receberá seus itens em até 1 minuto online no servidor.</p>
                                        <div className="p-4 bg-button/10 border-l-4 border-button rounded-r-lg mt-6">
                                            <p className="text-sm italic">A entrega dos produtos é feita após a confirmação do pagamento.</p>
                                        </div>
                                    </div>
                                ) : isLoadingProducts ? (
                                    <div className="flex justify-center items-center h-32">
                                        <p className="text-foreground/70 font-body animate-pulse">Carregando produtos de {selectedServer}...</p>
                                    </div>
                                ) : storeProducts.length === 0 ? (
                                    <div className="flex justify-center items-center h-32">
                                        <p className="text-foreground/50 font-body italic">Nenhum produto encontrado nesta categoria.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                                        {storeProducts.map((item: any) => {
                                            const getImageUrl = (path?: string) => {
                                                if (!path) return undefined;
                                                if (path.startsWith("http")) return path;
                                                return path.startsWith("/")
                                                    ? `${API_URL}${path}`
                                                    : `${API_URL}/${path}`;
                                            };

                                            return (
                                                <Card
                                                    key={item.id}
                                                    id={item.id}
                                                    productName={item.productName || item.title}
                                                    price={item.price}
                                                    originalPrice={item.originalPrice}
                                                    hasPromotion={item.hasPromotion}
                                                    photoUrl={getImageUrl(item.photoUrl) || ""}
                                                    description={item.description}
                                                    descriptionImage={getImageUrl(item.descriptionImage)}
                                                    onAdd={handleAddToCart}
                                                />
                                            );
                                        })}
                                    </div>
                                )}
                            </Box>
                        </main>
                    </div>
                )}
            </div>
        </div>
    );
}