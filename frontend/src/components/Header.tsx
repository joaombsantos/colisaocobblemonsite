import { useEffect, useState } from "react";
import { BiAdjust } from "react-icons/bi";
import { CiMenuBurger } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import logo from "@/assets/logo.png";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            return savedTheme === "dark";
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 h-20 md:h-16 bg-secondary/75 backdrop-blur-sm flex items-center justify-between px-6 text-bright_text shadow-lg transition-all">
                <div className="flex items-center gap-3 md:gap-4 z-60">
                    <img
                        src={logo}
                        alt="Logo"
                        onClick={() => window.location.href = "/"}
                        className="w-10 h-10 md:w-12 md:h-12 cursor-pointer"
                    />
                    <h1 className="font-body font-bold text-sm md:text-xl max-w-37.5 md:max-w-none">
                        Colisão Cobblemon
                    </h1>
                </div>

                <nav className="hidden md:flex gap-8 text-xl font-medium">
                    <a href="/download" className="hover:text-yellow-400 transition-colors">Baixar</a>
                    <a href="/loja" className="hover:text-yellow-400 transition-colors">Loja</a>
                    <a href="/wiki" className="hover:text-yellow-400 transition-colors">Wiki</a>
                    <a href="/tournaments" className="hover:text-yellow-400 transition-colors">Torneios</a>
                    <a href="https://discord.com/invite/pCQEge6hUv" target="_blank" className="hover:text-yellow-400 transition-colors">Discord</a>
                </nav>
                <div className="flex items-center gap-4 z-60">
                    <div
                        className={`text-2xl cursor-pointer transition-transform duration-500 ease-in-out ${isDark ? "rotate-180" : "rotate-0"
                            }`}
                        onClick={toggleTheme}
                    >
                        <BiAdjust title="Trocar Tema" />
                    </div>
                    <button className="md:hidden text-3xl cursor-pointer" onClick={toggleMenu}>
                        {isOpen ? <IoClose /> : <CiMenuBurger />}
                    </button>
                </div>
            </header>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-40 md:hidden transition-opacity"
                    onClick={toggleMenu}
                />
            )}

            <div className={`
                fixed top-0 right-0 w-[65%] sm:w-[50%] h-screen bg-secondary z-45 flex flex-col items-start p-10 pt-24 gap-6 text-xl font-title transition-transform duration-300 ease-in-out md:hidden shadow-2xl text-bright_text
                ${isOpen ? "translate-x-0" : "translate-x-full"}
            `}>
                <a href="/download" onClick={toggleMenu} className="hover:text-yellow-400 border-b border-white/10 w-full pb-2">Baixar</a>
                <a href="/loja" onClick={toggleMenu} className="hover:text-yellow-400 border-b border-white/10 w-full pb-2">Loja</a>
                <a href="/wiki" onClick={toggleMenu} className="hover:text-yellow-400 border-b border-white/10 w-full pb-2">Wiki</a>
                <a href="/tournaments" onClick={toggleMenu} className="hover:text-yellow-400 border-b border-white/10 w-full pb-2">Torneios</a>
                <a href="https://discord.com/invite/pCQEge6hUv" target="_blank" className="hover:text-yellow-400 w-full">Discord</a>
            </div>
        </>
    );
}