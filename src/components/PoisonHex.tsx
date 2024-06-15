import { FC, useEffect, useMemo } from 'react'
import { getCenterPointFromHex } from '../lib/coordinate';
import { hexHeight, hexWidth } from '../lib/hexSize';
import { useFindFighter, usePlayerContext, } from '../hooks/usePlayer';
import { useGameInfo } from '../hooks/useGameInfo';
import Hex from './Hex';
import { HexType } from '../data/map';

export const PoisonHex: FC<{
    col: number;
    row: number;
    isColored: boolean;
    type: HexType;
}> = (props) => {
    const coordinate = useMemo(() => ({ row: props.row, col: props.col }), [props.row, props.col]);
    const { whichTurn } = useGameInfo();
    const { findFighterByCoordinate } = useFindFighter();
    const { damagedByPoison } = usePlayerContext();


    useEffect(() => {
        const damagedFighter = findFighterByCoordinate({ row: props.row, col: props.col });
        if (damagedFighter)
            damagedByPoison({ damagedFighter });
    }, [whichTurn])


    return (
        <>
            <Hex coordinate={coordinate} {...props} />
            <image
                x={getCenterPointFromHex(coordinate).x - hexWidth / 2 + 2}
                y={getCenterPointFromHex(coordinate).y - hexHeight / 2}
                width={hexWidth}
                height={hexHeight}
                xlinkHref={`${process.env.PUBLIC_URL}/UI/Poison.png`}
                style={{ pointerEvents: "none" }}
                opacity={0.5}
            />
        </>
    )
}
