import React, { FC } from 'react'
import { CenterPoint } from '../types/CenterPoint'
import { Coordinate } from '../types/Coordinate'
import { getCenterPointFromHex } from '../lib/coordinate';
import { HEXRadius } from './HoneyComb';

type MakeHEXProps = {
    coordiate: Coordinate;
}

const MakeHEX: FC<MakeHEXProps> = ({ coordiate }) => {

    const centerPoint: CenterPoint = getCenterPointFromHex(coordiate);

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
            fill="rgba(100, 100, 100, 0.5)"
            stroke="black"
            strokeWidth="2"
            transform={`translate(${centerPoint.x}, ${centerPoint.y})`}
            style={{ cursor: "pointer" }}
        />
    )
}

export default MakeHEX