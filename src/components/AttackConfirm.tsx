import { FC, useState, useEffect } from 'react'
import { Coordinate } from '../types/Coordinate'
import { hexWidth, hexHeight } from '../lib/hexSize';
import { getCenterPointFromHex } from '../lib/coordinate';

interface AttackConfirmProps {
    coordinate: Coordinate
}

const AttackConfirm: FC<AttackConfirmProps> = ({ coordinate }) => {

    const centerPoint = getCenterPointFromHex(coordinate);

    const [opancy, setOpancy] = useState(0.6);

    useEffect(() => {
        const interval = setInterval(() => {
            setOpancy((prevOpancy) => (prevOpancy === 0.6 ? 1 : 0.6));
        }, 1000)
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <image
                x={centerPoint.x - hexWidth / 4 + 2}
                y={centerPoint.y - hexHeight / 4}
                width={hexWidth / 2}
                height={hexHeight / 2}
                xlinkHref={`${process.env.PUBLIC_URL}/icons/AttackAction.png`}
                style={{
                    pointerEvents: "none",
                    opacity: opancy, transition: `opancy 1s ease-in-out`
                }}
            />
        </>
    )
}

export default AttackConfirm