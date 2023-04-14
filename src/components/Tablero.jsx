import React from "react";
import { useState } from "react";

const Tablero = ({ turn, playerTurn }) => {
    const tablero = [
        { id: 1, circulo: false, cruz: false },
        { id: 2, circulo: false, cruz: false },
        { id: 3, circulo: false, cruz: false },
        { id: 4, circulo: false, cruz: false },
        { id: 5, circulo: false, cruz: false },
        { id: 6, circulo: false, cruz: false },
        { id: 7, circulo: false, cruz: false },
        { id: 8, circulo: false, cruz: false },
        { id: 9, circulo: false, cruz: false },
    ]

    const [mesa, setMesa] = useState(tablero);
    const [playerTwo, setPlayerTwo] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [playerOne, setPlayerOne] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [cuadroGanador, setCuadroGanador] = useState({ "display": "none" });
    const [finJuego, setFinJuego] = useState(0);

    const verificarVacio = (casilla) => {
        const elemento = mesa.find(item => item.id === casilla);
        let retorno;
        !(elemento.circulo || elemento.cruz) ?
            retorno = true :
            retorno = false;
        return retorno;
    }

    const casillaOcupada = () => {
        console.log("casilla ocupada");
    }

    const setearPlayer = (dato, player) => {
        return new Promise(resolve => {
            if (player === 1) { setPlayerOne(dato) }
            if (player === 2) { setPlayerTwo(dato) }
            resolve("ok")
        })
    }

    const setearGanador = (jugador) => {
        setFinJuego(jugador);
        console.log(finJuego)
        setCuadroGanador({ "display": "inline" });
        console.log(cuadroGanador)

    }

    const tateti = async (tableroJugador, jugador) => {
        const posicionesWin = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7]
        ]
        const msg = await setearPlayer(tableroJugador, jugador);
        console.log("Mensaje ", msg);
        let posicionJugador = [];
        let ordenJugador = [];
        //console.log(tableroJugador)
        for (let i = 0; i < tableroJugador.length; i++) {
            if (tableroJugador[i] === jugador && tableroJugador !== 0) {
                ordenJugador.push(i + 1);
            } else {
                ordenJugador.push(0);
            }
        }
        //console.log("Orden jugador", ordenJugador);
        posicionJugador.push([
            ordenJugador[0],
            ordenJugador[1],
            ordenJugador[2]
        ])
        posicionJugador.push([
            ordenJugador[3],
            ordenJugador[4],
            ordenJugador[5]
        ])
        posicionJugador.push([
            ordenJugador[6],
            ordenJugador[7],
            ordenJugador[8]
        ])
        //console.log(posicionJugador);

        if (finJuego <= 0) {
            ganador(posicionJugador, posicionesWin, jugador);
        }
        posicionJugador.splice(0, 1, [
            ordenJugador[0],
            ordenJugador[3],
            ordenJugador[6]
        ])
        posicionJugador.splice(1, 1, [
            ordenJugador[1],
            ordenJugador[4],
            ordenJugador[7]
        ])
        posicionJugador.splice(2, 1, [
            ordenJugador[2],
            ordenJugador[5],
            ordenJugador[8]
        ])
        if (finJuego <= 0) {
            ganador(posicionJugador, posicionesWin, jugador);
        }

        posicionJugador.splice(0, 1, [
            ordenJugador[0],
            ordenJugador[4],
            ordenJugador[8]
        ])
        posicionJugador.splice(1, 1, [
            ordenJugador[2],
            ordenJugador[4],
            ordenJugador[6]
        ])
        if (finJuego <= 0) {
            ganador(posicionJugador, posicionesWin, jugador);
        }
        console.log("Fin del juego es igual a ", finJuego)
    }

    const ganador = async (posicionJugador, posicionesWin, jugador) => {
        let ganador = 0;
        posicionJugador.map(element => {
            let coincidencia = 0
            coincidencia = posicionesWin.findIndex(item => item.toString() === element.toString());
            //console.log(element)
            if (coincidencia >= 0) {
                console.log("Hay ganador", jugador)
                ganador = jugador;
                return
            }
        })
        if (ganador > 0) setearGanador(jugador);
        return ganador
    }

    const colocarFicha = (id) => {
        let TABLEROTEMP = [...mesa];
        if (playerTurn === 2) {
            let PLAYERSTEMP = [...playerTwo];
            TABLEROTEMP.splice(id - 1, 1, { id: id, circulo: false, cruz: true })
            PLAYERSTEMP.splice(id - 1, 1, 2);
            setMesa([...TABLEROTEMP])
            //setearPlayer(PLAYERSTEMP, 2)
            //setPlayerTwo(PLAYERSTEMP);
            tateti(PLAYERSTEMP, 2)
        }
        if (playerTurn === 1) {
            let PLAYERSTEMP = [...playerOne];
            TABLEROTEMP.splice(id - 1, 1, { id: id, circulo: true, cruz: false })
            PLAYERSTEMP.splice(id - 1, 1, 1);
            setMesa([...TABLEROTEMP])
            //setearPlayer(PLAYERSTEMP, 1)
            //setPlayerOne(PLAYERSTEMP);
            tateti(PLAYERSTEMP, 1)
        }
        turn()
    }

    const handleClick = (item) => {
        verificarVacio(item.id) ?
            colocarFicha(item.id) :
            casillaOcupada();
    }

    const reiniciar = () => {
        setMesa(tablero);
        setPlayerOne([0, 0, 0, 0, 0, 0, 0, 0, 0])
        setPlayerTwo([0, 0, 0, 0, 0, 0, 0, 0, 0])
        setFinJuego(0);
        setCuadroGanador({ "display": "none" });
    }

    return (
        <div className="Tablero">
            <div className="Cuadro-Ganador animate__bounceIn" style={cuadroGanador}>
                <div className="Ganador">{`Ganador Player ${finJuego}`}</div>
                <div className="Reiniciar" onClick={() => reiniciar()}>
                    <p>Reiniciar</p>
                </div>
            </div>
            {
                mesa.map(item => {
                    let marca;
                    (!item.circulo && !item.cruz) ?
                        marca = "" :
                        item.circulo !== item.cruz ?
                            item.circulo ?
                                marca = "Circulo" :
                                marca = "Cruz" :
                            marca = "Error"
                    return (
                        <div
                            key={item.id}
                            id={`div${item.id}`}
                            className={marca}
                            onClick={() => handleClick(item)}>
                        </div>
                    )
                })
            }
        </div >
    )
}

export default Tablero;