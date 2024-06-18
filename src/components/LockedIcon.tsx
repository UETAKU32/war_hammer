import { FC } from 'react'
import { hexHeight, hexWidth } from '../lib/hexSize';
import { getCenterPointFromHex } from '../lib/coordinate';
import { Coordinate } from '../types/Coordinate';


interface LockedIconProps {
    lockedCount: number;
    row: number;
    col: number;
}

const LockedIcon: FC<LockedIconProps> = ({ lockedCount, row, col }) => {
    const coordinate: Coordinate = {
        row: row,
        col: col
    }

    return (
        <>

            <image
                key={`row:${row},col:${col}`}
                x={getCenterPointFromHex(coordinate).x + hexWidth * 2 / 11}
                y={getCenterPointFromHex(coordinate).y - hexHeight / 10 - hexWidth * 2 / 9}
                width={hexWidth / 4}
                height={hexHeight / 4}
                xlinkHref={`${process.env.PUBLIC_URL}/icons/Lock.png`}
                style={{ pointerEvents: "none" }}
            />
            <text
                x={getCenterPointFromHex(coordinate).x + hexWidth * 2 / 5}
                y={getCenterPointFromHex(coordinate).y - hexHeight / 10}
                fill="white"
                fontSize={hexWidth / 5}
                style={{ pointerEvents: 'none', fontWeight: 'bold' }}
            >{lockedCount}</text>
        </>
    )
}

export default LockedIcon