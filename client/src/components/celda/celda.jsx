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
        setIsMenuOpen(true);
        setMenuPosition({ x: event.clientX, y: event.clientY });
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
