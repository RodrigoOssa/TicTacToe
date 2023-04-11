import React from "react";
import { useState } from "react";

const Tablero = () => {
    const tablero = [
        { id: 1, circulo: false, cruz: false },
        { id: 2, circulo: false, cruz: false },
        { id: 3, circulo: false, cruz: false },
        { id: 4, circulo: false, cruz: true },
        { id: 5, circulo: true, cruz: false },
        { id: 6, circulo: true, cruz: true },
        { id: 7, circulo: false, cruz: false },
        { id: 8, circulo: false, cruz: false },
        { id: 9, circulo: false, cruz: false },
    ]
    const [mesa, setMesa] = useState(tablero);

    return (
        <div className="Tablero">
            {
                mesa.map(item => {
                    let marca;
                    (!item.circulo && !item.cruz) ?
                        marca = "" :
                        item.circulo != item.cruz ?
                            item.circulo ?
                                marca = "Circulo" :
                                marca = "Cruz" :
                            marca = "Error"
                    return (
                        <div id={`div${item.id}`} className={marca}></div>
                    )
                })
            }
        </div>
    )
}

export default Tablero;