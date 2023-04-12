import React from "react";
import Tablero from "./Tablero";
import { useState } from "react";

const Tictactoe = () => {
    const CRUZ = "cruz.png";
    const CIRCLE = "circle.png";
    const [playerTurn, setPlayerTurn] = useState(1);
    const [playerImg, setPlayerImg] = useState("circle.png");

    const turn = () => {
        (playerImg === "circle.png") ? setPlayerImg(CRUZ) : setPlayerImg(CIRCLE);

        (playerTurn === 1) ? setPlayerTurn(2) : setPlayerTurn(1);
    }
    return (
        <>
            <div className="Player-Display">
                <p className="Player-Turn">Player {playerTurn}</p>
                <div className="Player-Img">
                    <img
                        src={`../assets/img/icons/${playerImg}`}
                        alt="player icon"
                    ></img>
                </div>
            </div>
            <Tablero turn={turn} playerTurn={playerTurn}></Tablero>
        </>
    )
}

export default Tictactoe;