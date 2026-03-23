import { useState } from "react";
import { Button } from "./Button";
import { Box } from "./Box";
import { FaInfoCircle, FaShoppingCart, FaTimes } from "react-icons/fa";

interface CardProps {
    title: string;
    price: number;
    image: string;
    description?: string;
    descriptionImage?: string;
}

export function Card({ title, price, image, description, descriptionImage }: CardProps) {
    const [showInfo, setShowInfo] = useState(false);

    const toggleInfo = () => setShowInfo(!showInfo);

    return (
        <>
            <div className="group bg-secondary/10 dark:bg-white/5 rounded-2xl shadow-md hover:shadow-2xl overflow-hidden border border-secondary/20 transition-all duration-300 flex flex-col h-full">
                <div className="relative overflow-hidden h-48 md:h-56 justify-center items-center flex bg-black/5 p-4">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                <div className="p-5 flex flex-col grow gap-4">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-lg md:text-xl font-bold font-body text-foreground line-clamp-2 min-h-14">
                            {title}
                        </h3>
                        <span className="font-body font-bold text-lg text-primary">
                            R$ {price.toFixed(2)}
                        </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mt-auto">
                        <div className="col-span-1">
                            <Button
                                label=""
                                icon={FaInfoCircle}
                                onClick={toggleInfo}
                                className="w-full h-full px-0! aspect-square rounded-full flex items-center justify-center"
                            />
                        </div>
                        <div className="col-span-3">
                            <Button
                                label="Comprar"
                                color="primary"
                                icon={FaShoppingCart}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {showInfo && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={toggleInfo} />
                    
                    <div className="relative w-fit max-w-[90%] md:max-w-md animate-in zoom-in duration-300">
                        <Box color="bg-secondary dark:bg-zinc-900" className="items-center! text-center! border-2 border-primary/50 p-6!">
                            <button onClick={toggleInfo} className="absolute top-4 right-4 text-bright_text hover:text-primary transition-colors text-2xl z-10">
                                <FaTimes />
                            </button>

                            <div className="flex flex-col gap-6 w-full items-center">
                                <div className="w-48 h-48 md:w-64 md:h-64 bg-black/20 rounded-xl overflow-hidden flex items-center justify-center">
                                    <img 
                                        src={descriptionImage || image} 
                                        alt="Detalhes" 
                                        className="w-full h-full object-contain p-4 transition-transform duration-500 hover:scale-110"
                                    />
                                </div>

                                <div className="flex flex-col gap-4 items-center w-full">
                                    <h2 className="font-title text-xl md:text-2xl text-primary">{title}</h2>
                                    <div className="h-px bg-bright_text/20 w-full" />
                                    
                                    <p className="font-body text-bright_text leading-relaxed text-sm md:text-base whitespace-pre-line max-w-sm">
                                        {description || "Nenhuma descrição detalhada disponível para este item."}
                                    </p>

                                    <div className="w-full pt-4 flex flex-col gap-4 items-center border-t border-bright_text/10">
                                        <span className="font-bold text-3xl text-button">
                                            R$ {price.toFixed(2)}
                                        </span>
                                        <Button 
                                            label="Adicionar ao Carrinho" 
                                            icon={FaShoppingCart} 
                                            color="primary" 
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </div>
                </div>
            )}
        </>
    );
}