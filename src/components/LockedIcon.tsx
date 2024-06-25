import { FC } from 'react'
import { hexHeight, hexWidth } from '../lib/hexSize';


interface LockedIconProps {
    lockedCount: number;
    x: number;
    y: number;
}

const LockedIcon: FC<LockedIconProps> = ({ lockedCount, x, y }) => {

    return (
        <>

            <image
                key={`${x},${y}`}
                x={x + hexWidth * 2 / 11}
                y={y - hexHeight / 10 - hexWidth * 3 / 9}
                width={hexWidth / 4}
                height={hexHeight / 4}
                xlinkHref={`${process.env.PUBLIC_URL}/icons/Lock.png`}
                style={{ pointerEvents: "none" }}
            />
            <text
                key={`${x},${y}`}
                x={x + hexWidth * 2 / 5}
                y={y - hexHeight * 2 / 10}
                fill="white"
                fontSize={hexWidth / 5}
                style={{ pointerEvents: 'none', fontWeight: 'bold' }}
            >{lockedCount}</text>
        </>
    )
}

export default LockedIcon