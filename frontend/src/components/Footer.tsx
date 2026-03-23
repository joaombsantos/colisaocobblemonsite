import { FaYoutube, FaDiscord, FaTiktok } from "react-icons/fa";

export function Footer() {
    return (
        <footer className="footer text-bright_text w-full overflow-hidden gap-3">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 justify-center w-full px-4">
                <img src="src/assets/logo.png" alt="Logo" className="w-12 h-12 md:w-16 md:h-16" />
                <h1 className="font-title text-3xl sm:text-4xl md:text-6xl text-center wrap-break-word max-w-full">
                    Colisão Cobblemon
                </h1>
            </div>
            <p className="font-title">&copy; 2026 All rights reserved.</p>
            <p className="font-body">Colisão Cobblemon não é afiliado com a The Pokemon Company ou a Mojang</p>
            <div className="w-1/5 border-t-2 border-bright_text opacity-80 my-4" />
            <div className="flex items-center gap-4 justify-center text-3xl">
                <FaYoutube className="cursor-pointer hover:scale-110 transition-transform duration-200" onClick={() => window.open("https://www.youtube.com/@ColisaoCobblemon", "_blank")} />
                <FaDiscord className="cursor-pointer hover:scale-110 transition-transform duration-200" onClick={() => window.open("https://discord.com/invite/pCQEge6hUv", "_blank")} />
                <FaTiktok className="cursor-pointer hover:scale-110 transition-transform duration-200" onClick={() => window.open("https://www.tiktok.com/@colisaocobblemon", "_blank")} />
            </div>
        </footer>
    )
}