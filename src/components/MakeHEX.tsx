import React, { FC } from 'react'
import { CenterPoint } from '../types/CenterPoint'
import { Coordinate } from '../types/Coordinate'

type MakeHEXProps = {
    CenterPoint: CenterPoint;
    Coordiate: Coordinate;
    HEXRadius: number;
}

const MakeHEX: FC<MakeHEXProps> = ({ CenterPoint, Coordiate, HEXRadius }) => {

    const HEXShapes = [
        [0, HEXRadius],
        [(Math.sqrt(3) / 2) * HEXRadius, HEXRadius / 2],
        [(Math.sqrt(3) / 2) * HEXRadius, -HEXRadius / 2],
        [0, -HEXRadius],
        [-(Math.sqrt(3) / 2) * HEXRadius, -HEXRadius / 2],
        [-(Math.sqrt(3) / 2) * HEXRadius, HEXRadius / 2],
    ];
    const pointsString: string = HEXShapes.map((point) => point.join(",")).join(" ");

    return (
        <polygon
            points={pointsString}
            fill="white"
            stroke="black"
            strokeWidth="2"
            transform={`translate(${CenterPoint.x}, ${CenterPoint.y})`}
            style={{ cursor: "pointer" }}
        />
    )
}

export default MakeHEX