import React, { FC } from 'react'
import { CenterPoint } from '../types/CenterPoint'
import { Coordinate } from '../types/Coordinate'

type MakeHEXProps = {
    centerPoint: CenterPoint;
    coordiate: Coordinate;
    hexRadius: number;
}

const MakeHEX: FC<MakeHEXProps> = ({ centerPoint, coordiate, hexRadius }) => {

    const HEXShapes = [
        [0, hexRadius],
        [(Math.sqrt(3) / 2) * hexRadius, hexRadius / 2],
        [(Math.sqrt(3) / 2) * hexRadius, -hexRadius / 2],
        [0, -hexRadius],
        [-(Math.sqrt(3) / 2) * hexRadius, -hexRadius / 2],
        [-(Math.sqrt(3) / 2) * hexRadius, hexRadius / 2],
    ];
    const pointsString: string = HEXShapes.map((point) => point.join(",")).join(" ");

    return (
        <polygon
            points={pointsString}
            fill="rgba(100, 100, 100, 0.5)"
            stroke="black"
            strokeWidth="2"
            transform={`translate(${centerPoint.x}, ${centerPoint.y})`}
            style={{ cursor: "pointer" }}
        />
    )
}

export default MakeHEX