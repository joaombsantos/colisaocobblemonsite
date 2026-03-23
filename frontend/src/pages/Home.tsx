import { FaDownload } from "react-icons/fa6";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { FaDiscord } from "react-icons/fa";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Roadmap } from "../components/Roadmap";

export function Home() {
    return (
        <div className="home">
            <Header />
            <Hero />

            <div className="justify-center flex flex-col items-center gap-6 text-center px-4 py-8">
                <img src="src\assets\banner.png" alt="Banner de Kanto+" className="rounded-3xlx "/>
                <iframe
                    className="w-full max-w-2xl aspect-video rounded-lg shadow-xl"
                    src="https://www.youtube.com/embed/GU3IjCL1gUQ"
                    title="Trailer Colisão Cobblemon"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen

                />
                <div className="font-body text-xl max-w-3xl gap-4 flex flex-col">
                    <h1 className="font-bold text-2xl">
                        O que é o Colisão Cobblemon?
                    </h1>
                    <p>
                        Colisão Cobblemon é um servidor que traz a verdadeira essência dos jogos de Pokémon para dentro do Minecraft,
                        combinando as melhores mecânicas da franquia com sistemas exclusivos e diversas regiões imersivas.
                    </p>
                </div>
                <Button
                    label="Baixar"
                    icon={FaDownload}
                    fontSize="2xl"
                    destination="/download"
                />
                <Carousel className="w-full max-w-4xl"
                    plugins={[
                        Autoplay({
                            delay: 5000,
                        }),
                    ]}
                >
                    <CarouselContent>
                        <CarouselItem><img src="src\assets\print1.png" alt="Imagem com Inicias em Pallet" /></CarouselItem>
                        <CarouselItem><img src="src\assets\print2.png" alt="Imagem com Inicias na Liga Pokémon" /></CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                <Roadmap />
            </div>
            <div className="bg-primary w-full flex flex-col items-center gap-6 text-center px-4 py-16">
                <h2 className="font-body text-2xl font-bold text-bright_text ">
                    Ficou com alguma dúvida ou quer participar da comunidade?
                </h2>
                <Button
                    label="Acesse nosso Discord!"
                    icon={FaDiscord}
                    onClick={() => window.open("https://discord.com/invite/pCQEge6hUv", "_blank")}
                />
            </div>
        </div>
    );
}