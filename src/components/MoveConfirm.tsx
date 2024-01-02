import { FC, useState, useEffect } from 'react'
import { Coordinate } from '../types/Coordinate'
import { hexWidth, hexHeight } from '../lib/hexSize';
import { Fighter } from '../types/fighter';

interface MoveConfirmProps {
    selectedFighter: Pick<Fighter, "image">
    coordinate: Coordinate
}

const MoveConfirm: FC<MoveConfirmProps> = ({ selectedFighter: { image }, coordinate }) => {

    const [opancy, setOpancy] = useState(0.6);

    useEffect(() => {
        const interval = setInterval(() => {
            setOpancy((prevOpancy) => (prevOpancy === 0.6 ? 0.2 : 0.6));
        }, 1000)
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <image
                x={coordinate.row * hexWidth + (coordinate.col % 2 === 1 ? hexWidth / 2 : 0) + 2}
                y={(coordinate.col * 1.5 * hexHeight) / 2 + hexHeight / 2 + 2 - hexHeight / 2}
                width={hexWidth}
                height={hexHeight}
                xlinkHref={`${process.env.PUBLIC_URL}/fightersImages/${image}`}
                style={{
                    pointerEvents: "none",
                    opacity: opancy, transition: `opancy 1s ease-in-out`
                }}
            />
        </>
    )
}

export default MoveConfirm