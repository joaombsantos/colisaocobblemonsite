import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Store } from "../pages/Store";
import { Download } from "../pages/Download";
import { Tournaments } from "../pages/Tournaments";
import { Wiki } from "../pages/Wiki";
import { Cart } from "../pages/Cart";

export function IndexRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loja" element={<Store />} />
            <Route path="/download" element={<Download />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/wiki" element={<Wiki />} />
            <Route path="/carrinho" element={<Cart />} />
        </Routes>
    )
}