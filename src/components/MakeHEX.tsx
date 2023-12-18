import React, { FC } from 'react'
import { CenterPoint } from '../types/CenterPoint'
import { Coordinate } from '../types/Coordinate'
import { getCenterPointFromHex } from '../lib/coordinate';
import { hexRadius } from '../lib/hexSize';
import { PlayerId } from '../types/Player';
import { useGameInfo } from '../hooks/useGameInfo';
import { useSetFighterHEX } from '../hooks/useSetFighterHEX';

type MakeHEXProps = {
    coordinate: Coordinate;
}

const MakeHEX: FC<MakeHEXProps> = ({ coordinate }) => {

    const currentPlayer: PlayerId = useGameInfo().whichTurn

    useSetFighterHEX(currentPlayer, coordinate)

    const centerPoint: CenterPoint = getCenterPointFromHex(coordinate);

    const HEXShapes = [
        [0, hexRadius],
        [(Math.sqrt(3) / 2) * hexRadius, hexRadius / 2],
        [(Math.sqrt(3) / 2) * hexRadius, -hexRadius / 2],
        [0, -hexRadius],
        [-(Math.sqrt(3) / 2) * hexRadius, -hexRadius / 2],
        [-(Math.sqrt(3) / 2) * hexRadius, hexRadius / 2],
    ];
    const pointsString: string = HEXShapes.map((point) => point.join(",")).join(" ");

    const cuurentPlayer: PlayerId = useGameInfo().whichTurn

    const handleClick = (coordinate: Coordinate): void => {
        if (useSetFighterHEX(cuurentPlayer, coordinate)) {
            setSectedFighter(useSetFighterHEX(cuurentPlayer, coordinate))
        }
        console.log(useSetFighterHEX(cuurentPlayer, coordinate))
    }


    return (
        <polygon
            points={pointsString}
            fill="rgba(100, 100, 100, 0.5)"
            stroke="black"
            strokeWidth="2"
            transform={`translate(${centerPoint.x}, ${centerPoint.y})`}
            onClick={() => handleClick(coordinate)}
            style={{ cursor: "pointer" }}
        />
    )
}

export default MakeHEX

function setSectedFighter(arg0: import("../types/fighter").Fighter | undefined) {
    throw new Error('Function not implemented.');
}
