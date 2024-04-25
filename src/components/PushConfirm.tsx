import { FC } from 'react'
import { Coordinate } from '../types/Coordinate'
import { hexWidth, hexHeight } from '../lib/hexSize';
import { Fighter } from '../types/fighter';
import { getCenterPointFromHex } from '../lib/coordinate';
import { animated, useSpring } from 'react-spring';

interface PushConfirmProps {
    targetFighter: Pick<Fighter, "image">
    coordinate: Coordinate
}

const PushConfirm: FC<PushConfirmProps> = ({ targetFighter: { image }, coordinate }) => {

    const centerPoint = getCenterPointFromHex(coordinate);

    const { opacity } = useSpring({
        loop: true,
        from: { opacity: 1 },
        to: { opacity: 0 },
        config: { duration: 1000 },
    });


    return (
        <>
            <animated.image
                x={centerPoint.x - hexWidth / 2 + 2}
                y={centerPoint.y - hexHeight / 2}
                width={hexWidth}
                height={hexHeight}
                xlinkHref={`${process.env.PUBLIC_URL}/fightersImages/${image}`}
                style={{
                    pointerEvents: "none",
                    opacity: opacity,
                }}
            />
        </>
    )
}

export default PushConfirm