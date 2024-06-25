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
                key={`${x},${y},${lockedCount}`}
                x={x + hexWidth * 2 / 11}
                y={y - hexHeight / 10 - hexWidth * 2 / 9}
                width={hexWidth / 5}
                height={hexHeight / 5}
                xlinkHref={`${process.env.PUBLIC_URL}/icons/Lock.png`}
                style={{ pointerEvents: "none" }}
            />
            <text
                key={`${x},${y}`}
                x={x + hexWidth * 1 / 2.7}
                y={y - hexHeight * 1 / 7.5}
                fill="white"
                fontSize={hexWidth / 6}
                style={{ pointerEvents: 'none', fontWeight: 'bold' }}
            >{lockedCount}</text>
        </>
    )
}

export default LockedIcon