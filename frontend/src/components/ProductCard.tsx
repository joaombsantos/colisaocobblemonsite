interface ProductProps {
    productName: string;
    price: number;
    server: string;
    photoUrl: string;
    quantity: number;
    onUpdateQuantity: (newQuantity: number) => void;
    onRemove: () => void;
}

export function ProductCard({ productName, price, server, photoUrl: image, quantity, onUpdateQuantity, onRemove }: ProductProps) {

    const handleDecrease = () => {
        if (quantity > 1) onUpdateQuantity(quantity - 1);
    };

    return (
        <div className="bg-secondary/10 border border-secondary/20 shadow-sm transition-all duration-500 w-full rounded-3xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">

            <div className="flex flex-row items-center gap-4 w-full md:w-auto min-w-0 flex-1 pr-0 md:pr-4">
                <img 
                    src={image} 
                    alt={productName} 
                    className="h-12 w-12 rounded-2xl object-cover shrink-0" 
                />
                
                <div className="flex flex-col min-w-0 flex-1">
                    <p 
                        className="font-bold text-lg text-foreground truncate" 
                        title={`${productName} - ${server}`}
                    >
                        {productName}
                    </p>
                    <span className="text-sm font-normal opacity-70 truncate">
                        {server}
                    </span>
                </div>
            </div>

            <div className="flex flex-row items-center justify-between w-full md:w-auto gap-4 md:gap-6 shrink-0 pt-2 md:pt-0 border-t border-secondary/20 md:border-t-0">
                
                <p className="font-semibold min-w-20 text-left md:text-right shrink-0">
                    R$ {Number(price * quantity).toFixed(2)}
                </p>

                <div className="flex flex-row items-center gap-1 bg-secondary/15 rounded-3xl px-2 py-1 shrink-0">
                    <button
                        onClick={handleDecrease}
                        className="font-bold px-3 text-lg hover:text-gray-500 cursor-pointer"
                    >
                        -
                    </button>

                    <input
                        type="number"
                        value={quantity === 0 ? '' : quantity}
                        onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (isNaN(val)) {
                                onUpdateQuantity(0);
                            } else if (val >= 0) {
                                onUpdateQuantity(val);
                            }
                        }}
                        onBlur={() => {
                            if (quantity === 0) onUpdateQuantity(1);
                        }}
                        className="w-10 text-center bg-transparent outline-none font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />

                    <button
                        onClick={() => onUpdateQuantity(quantity + 1)}
                        className="font-bold px-3 text-lg hover:text-gray-500 cursor-pointer"
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={onRemove}
                    className="text-red-500 font-black text-xl hover:text-red-700 transition-colors px-2 shrink-0"
                    title="Remover produto"
                >
                    X
                </button>
            </div>

        </div>
    );
}