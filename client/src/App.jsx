import { useState } from "react";
// import "./App.css";
import Grid from "./components/grid/grid";
import { Context } from "./context/context";
import { colors } from "./utils/colors";

function App() {
    const [color, setColor] = useState(colors.black);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="w-[100vw] h-[100vh] m-0 flex flex-col justify-items-start overflow-x-hidden overflow-y-hidden">
            <Context.Provider
                value={{
                    color,
                    setColor,
                    isMouseDown,
                    setIsMouseDown,
                    isMenuOpen,
                    setIsMenuOpen,
                }}
            >
                <Grid />
            </Context.Provider>
        </div>
    );
}

export default App;
