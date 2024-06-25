import { FC } from 'react'
import { hexHeight, hexWidth } from '../lib/hexSize';


interface GuardingIconProps {
    x: number;
    y: number;
}

const GuardingIcon: FC<GuardingIconProps> = ({ x, y }) => {

    return (
        <>
            <image
                key={`${x},${y}`}
                x={x - hexWidth * 5 / 11}
                y={y - hexHeight / 10 - hexWidth * 2 / 9}
                width={hexWidth / 5}
                height={hexHeight / 5}
                xlinkHref={`${process.env.PUBLIC_URL}/icons/Guard.png`}
                style={{ pointerEvents: "none" }}
            />
        </>
    )
}

export default GuardingIcon