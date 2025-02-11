import { useState, useContext, lazy, Suspense } from "react";
import { Context } from "../../context/context";
import { AnimatePresence } from "framer-motion";

const ColorSelector = lazy(() => import("../colorSelector/colorSelector"));

const Celda = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const { color, isMouseDown, setIsMouseDown } = useContext(Context);
    const [selectedColor, setSelectedColor] = useState(null);

    const toggleColor = () => {
        setSelectedColor((prevColor) => (prevColor === color ? null : color));
    };

    const handleMouseDown = (event) => {
        if (event.button !== 0) return;
        toggleColor();
        setIsMouseDown(true);
    };

    const handleMouseEnter = (event) => {
        if (isMouseDown && event.buttons === 1) {
            setSelectedColor(color);
        }
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const handleContextMenu = (event) => {
        event.preventDefault();

        const menuWidth = 200; // Suponiendo un ancho aproximado para el menú
        const menuHeight = 100; // Suponiendo una altura aproximada para el menú
        const { clientX, clientY } = event;

        // Ajustar la posición para no desbordarse por los bordes de la pantalla
        let adjustedX = clientX;
        let adjustedY = clientY;

        // Evitar que el menú se desborde por el lado derecho
        if (clientX + menuWidth > window.innerWidth) {
            adjustedX = window.innerWidth - menuWidth - 10; // 10px de margen
        }

        // Evitar que el menú se desborde por la parte inferior
        if (clientY + menuHeight > window.innerHeight) {
            adjustedY = window.innerHeight - menuHeight - 10; // 10px de margen
        }

        setMenuPosition({ x: adjustedX, y: adjustedY });
        setIsMenuOpen(true);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div
            className="relative border border-gray-900/20 h-[20px]"
            style={{
                backgroundColor: selectedColor || "#fff",
            }}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            onMouseUp={handleMouseUp}
            onContextMenu={handleContextMenu}
        >
            <AnimatePresence>
                {isMenuOpen && (
                    <Suspense fallback={<div></div>}>
                        <div
                            style={{
                                top: `${menuPosition.y}px`,
                                left: `${menuPosition.x}px`,
                            }}
                            onMouseLeave={closeMenu}
                        >
                            <ColorSelector closeMenu={closeMenu} />
                        </div>
                    </Suspense>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Celda;
