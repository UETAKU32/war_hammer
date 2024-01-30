import { FC, useState, useEffect } from 'react'
import { Coordinate } from '../types/Coordinate'
import { hexWidth, hexHeight } from '../lib/hexSize';
import { getCenterPointFromHex } from '../lib/coordinate';
import { useSpring, animated } from 'react-spring';

type HitType = "Critical" | "Attacked" | "Defended"

export interface HitEffectProps {
    coordinate: Coordinate
    hitType: HitType
}

const HitEffect: FC<HitEffectProps> = ({ coordinate, hitType }) => {

    const centerPoint = getCenterPointFromHex(coordinate);


    const { opacity } = useSpring({
        from: { opacity: 1 },
        to: { opacity: 0 },
        config: { duration: 1000 }, // アニメーションの持続時間（1秒）
    });



    return (
        <>
            <animated.image
                x={centerPoint.x - hexWidth / 2 + 2}
                y={centerPoint.y - hexHeight / 2}
                width={hexWidth}
                height={hexHeight}
                xlinkHref={`${process.env.PUBLIC_URL}/UI/${hitType}.png`}
                style={{
                    pointerEvents: "none",
                    opacity: opacity
                }}
            />
        </>
    )
}

export default HitEffect