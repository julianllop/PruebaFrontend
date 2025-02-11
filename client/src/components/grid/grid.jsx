import { useContext, useState, useEffect } from "react";
import Celda from "../celda/celda";
import { Context } from "../../context/context";

const CELL_SIZE = 20;

const Grid = () => {
    const { setIsMouseDown } = useContext(Context);
    const [numRows, setNumRows] = useState(
        Math.floor(window.innerHeight / CELL_SIZE)
    );

    useEffect(() => {
        const updateRows = () =>
            setNumRows(Math.floor(window.innerHeight / CELL_SIZE));
        window.addEventListener("resize", updateRows);
        return () => window.removeEventListener("resize", updateRows);
    }, []);

    return (
        <div
            className="w-full h-[100vh] grid grid-cols-[repeat(100,_minmax(0,_1fr))] auto-rows-max justify-center bg-white"
            onMouseUp={() => setIsMouseDown(false)}
        >
            {Array.from({ length: 100 * numRows }).map((_, index) => (
                <Celda key={index} />
            ))}
        </div>
    );
};

export default Grid;
