import { Accordion } from "../components/Accordion";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Box } from "../components/Box";
import { FaDownload, FaMobileAlt, FaDesktop } from "react-icons/fa";
import { SiCurseforge, SiModrinth } from "react-icons/si";

export function Download() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            
            <div className="w-full max-w-5xl mx-auto py-32 px-6 flex flex-col items-center gap-10">
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-4xl md:text-5xl font-title text-primary animate-in fade-in slide-in-from-top-4 duration-500">
                        Download do Modpack
                    </h1>
                    <p className="text-lg md:text-xl font-body opacity-80 max-w-2xl">
                        Escolha a plataforma ideal para sua jornada Pokémon. Oferecemos suporte completo para PC e Mobile.
                    </p>
                </div>

                <div className="w-full flex flex-col gap-6">
                    <Accordion 
                        label="Versão para Computador (PC)" 
                        className="border-primary/30"
                    >
                        <div className="flex flex-col gap-8 p-2">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Button 
                                    label="Modrinth" 
                                    icon={SiModrinth} 
                                    destination="https://modrinth.com/modpack/colisao-cobblemon"
                                    color="button"
                                    className="w-full"
                                    fontSize="xl"
                                />
                                <Button 
                                    label="CurseForge" 
                                    icon={SiCurseforge} 
                                    destination="https://www.curseforge.com/minecraft/modpacks/colisao-cobblemon"
                                    color="button"
                                    className="w-full"
                                    fontSize="xl"
                                />
                                <Button 
                                    label="Download Direto" 
                                    icon={FaDownload} 
                                    destination="https://www.mediafire.com/file/zze1ktu8zx56rxp/modpack.zip/file"
                                    color="primary"
                                    className="w-full"
                                    fontSize="xl"
                                />
                            </div>

                            <Box color="bg-black/20" className="p-4!">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <FaDesktop /> Tutorial de Instalação (PC)
                                </h3>
                                <iframe
                                    className="w-full aspect-video rounded-xl shadow-2xl border-2 border-primary/20"
                                    src="https://www.youtube.com/embed/MKd6JFQQPq8"
                                    title="Tutorial PC"
                                    allowFullScreen
                                />
                            </Box>
                        </div>
                    </Accordion>

                    <Accordion 
                        label="Versão para Celular (Mobile)"
                        className="border-primary/30"
                    >
                        <div className="flex flex-col gap-8 p-2">
                            {/* <div className="flex justify-center">
                                <Button 
                                    label="Download Modpack Mobile" 
                                    icon={FaMobileAlt} 
                                    destination="https://www.mediafire.com/file/t6mpzbaedui4syt/modpackcolisaocobblemonCELULAR1.0.4celularnew.zip/file"
                                    color="primary"
                                    className="w-full md:w-fit"
                                    fontSize="xl"
                                />
                            </div> */}

                            <Box color="bg-black/20" className="p-4!">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <FaMobileAlt /> Tutorial de Instalação (Mobile)
                                </h3>
                                <iframe
                                    className="w-full aspect-video rounded-xl shadow-2xl border-2 border-primary/20"
                                    src="https://www.youtube.com/embed/JfGu4zZQb90"
                                    title="Tutorial Mobile"
                                    allowFullScreen
                                />
                            </Box>
                        </div>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}