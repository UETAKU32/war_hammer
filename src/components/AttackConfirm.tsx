import { FC } from 'react';
import { Coordinate } from '../types/Coordinate';
import { hexWidth, hexHeight } from '../lib/hexSize';
import { getCenterPointFromHex } from '../lib/coordinate';
import { useSpring, animated } from 'react-spring';

interface AttackConfirmProps {
    coordinate: Coordinate;
}

const AttackConfirm: FC<AttackConfirmProps> = ({ coordinate }) => {
    const centerPoint = getCenterPointFromHex(coordinate);

    const { opacity } = useSpring({
        loop: { reverse: true },
        from: { opacity: 1 },
        to: { opacity: 0 },
        config: { duration: 1000 },
    });

    return (
        <>
            <animated.image
                x={centerPoint.x - hexWidth / 4 + 2}
                y={centerPoint.y - hexHeight / 4}
                width={hexWidth / 2}
                height={hexHeight / 2}
                xlinkHref={`${process.env.PUBLIC_URL}/icons/AttackAction.png`}
                style={{
                    pointerEvents: 'none',
                    opacity: opacity,
                }}
            />
        </>
    );
};

export default AttackConfirm;