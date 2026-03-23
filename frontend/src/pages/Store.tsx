import { Header } from "../components/Header";
import { Box } from "../components/Box";
import { Input } from "../components/Input";
import { useState } from "react";
import { Button } from "../components/Button";
import { Dropdown } from "../components/Dropdown";
import { Card } from "../components/Card";

export function Store() {
    const [nick, setNick] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (nick.trim() !== "") {
            // Backend integration would go here to validate the nick and fetch user data
            setIsSubmitted(true);
        }
    };

    const categories = ["VIPs", "Caixas", "Informações"];

    const products = {
        "VIPs": [
            { id: 1, title: "VIP Veterano", price: 25, image: "src/assets/elite.png" },
            { id: 2, title: "VIP Campeão", price: 50, image: "src/assets/elite.png" },
            { id: 3, title: "VIP Mestre", price: 115, image: "src/assets/mestre.png", 
                description: "📜 Comandos Exclusivos\n• Acesso a /warps (SEM COOLDOWN)\n• /pc\n• /pokeheal\n🎁 Vantagens\n• Kit de Ativação VIP exclusivo\n• Kit Diário Mestre + Campeão + Veterano\n• 🎟️ 2 Keys Shiny\n• 🎟️ 2 Keys Iniciais (3 IVs perfeitos garantidos)\n• 🏷️ Tag VIP no jogo\n• 💬 Tag VIP no Discord\n• 🏝️ 3 Áreas exclusivas de spawn e farm\n(Veterano + Campeão + Mestre)\n• ⚡ Área exclusiva para farm de EV\n• 🚪 Entra no servidor mesmo estando lotado\n• 🎯 Hunts exclusivas", descriptionImage: "src/assets/VipMestreAtivacao.png" },
        ],
        "Caixas": [
            { id: 4, title: "Caixa Shiny", price: 15, image: "src/assets/bau_shiny.png" },
            { id: 5, title: "Caixa Iniciais", price: 15, image: "src/assets/bau_inicial.png" },
            { id: 6, title: "Caixa Elite", price: 15, image: "src/assets/bau_elite.png" }
        ]
    };

    const [activeCategories, setActiveCategories] = useState("VIPs");

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Header />

            <div className="w-full max-w-4xl mx-auto py-32 px-6 flex flex-col items-center gap-8">
                <Box color="bg-secondary/10" className="transition-all duration-500">
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
                                <Button label="Entrar na Loja" type="submit" />
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
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-xs font-body opacity-60 hover:opacity-100 underline mt-2 transition-opacity"
                                >
                                    Não é você? Clique aqui para trocar.
                                </button>
                            </div>
                        </div>
                    )}
                </Box>

            </div>
            {/* Esta parte só aparece após o login */}
            <div className="w-5/6 mx-auto mb-20">
                {isSubmitted && (
                    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 animate-in fade-in duration-700">

                        {/* Barra Lateral: Agora ocupa 1 coluna no desktop e 100% no mobile */}
                        <aside className="md:col-span-1 flex flex-col gap-4">
                            <Box className="p-4! md:p-6!">
                                <Dropdown label="Servidor" options={["Kanto", "Kanto+"]} />

                                <nav className="flex flex-col gap-2 w-full mt-4">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCategories(cat)}
                                            className={`
                                            w-full text-left px-4 py-3 rounded-xl font-body font-bold transition-all
                                            ${activeCategories === cat
                                                    ? "bg-button text-bright_text shadow-md"
                                                    : "hover:bg-secondary/20 text-foreground/70"}
                                                `}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </nav>
                            </Box>
                        </aside>

                        {/* Lado Direito: Ocupa 3 colunas para dar mais espaço aos produtos */}
                        <main className="md:col-span-3">
                            <Box className="text-left! h-full">
                                <h2 className="font-title text-2xl mb-6 text-primary">{activeCategories}</h2>

                                {activeCategories === "Informações" ? (
                                    <div className="font-body space-y-4 text-foreground/80">
                                        <h3 className="text-xl font-bold text-foreground">Como comprar no Colisão Cobblemon?</h3>
                                        <p>1. Certifique-se de estar logado com seu nick correto.</p>
                                        <p>2. Escolha o servidor desejado no menu lateral.</p>
                                        <p>3. Selecione seus itens e clique em "Comprar" para ser redirecionado ao checkout.</p>
                                        <div className="p-4 bg-button/10 border-l-4 border-button rounded-r-lg mt-6">
                                            <p className="text-sm italic">A entrega dos produtos é feita após a confirmação do pagamento.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                                        {products[activeCategories as keyof typeof products]?.map((item: any) => (
                                            <Card
                                                key={item.id}
                                                title={item.title}
                                                price={item.price}
                                                image={item.image}
                                                description={item.description}
                                                descriptionImage={item.descriptionImage}
                                            />
                                        ))}
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