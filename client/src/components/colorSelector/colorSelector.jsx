import { motion } from "framer-motion";
import { colors } from "../../utils/colors";
import { useContext } from "react";
import { Context } from "../../context/context";
import PropTypes from "prop-types";

const ColorSelector = ({ closeMenu }) => {
    const { setColor } = useContext(Context);

    const handleClick = (colorHex, event) => {
        event.stopPropagation();
        setColor(colorHex);
        closeMenu();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute z-50 bg-stone-100 w-[200px] h-[100px] box-border flex flex-col rounded-lg shadow-lg py-4 gap-2 justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            onMouseDown={(event) => event.stopPropagation()}
        >
            <section className="grid grid-cols-4 gap-2">
                {Object.entries(colors).map(([colorName, colorHex]) => (
                    <div
                        key={colorName}
                        onClick={(event) => handleClick(colorHex, event)}
                        style={{ backgroundColor: colorHex }}
                        className="w-[30px] h-[30px] cursor-pointer rounded-full border border-gray-800 shadow-md"
                    ></div>
                ))}
            </section>
        </motion.div>
    );
};

ColorSelector.propTypes = {
    closeMenu: PropTypes.func.isRequired,
};

export default ColorSelector;
