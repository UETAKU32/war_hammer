import { FC, useEffect, useState } from 'react'
import { getCenterPointFromHex } from '../lib/coordinate';
import { hexHeight, hexWidth } from '../lib/hexSize';
import { useCurrentTurnPlayer, useFindFighter, useFindTeam } from '../hooks/usePlayer';
import { useGameInfo } from '../hooks/useGameInfo';
import Hex, { HexProps } from './Hex';

export const TreasureHex: FC<HexProps> = (props) => {
    const { findTreasureAt, whichTurn, decreaseTreasureCount } = useGameInfo();
    const { findFighterByCoordinate } = useFindFighter();
    const treasure = findTreasureAt(props.coordinate);
    if (!treasure) {
        throw Error(`${props.coordinate}宝物が存在するはずだが、無い`)
    };

    type TreasureStatus = "Closed" | "Opened" | "Empty";

    const [treasureStatus, setTreasureStatus] = useState<TreasureStatus>("Closed");
    const { addVictoryPoint } = useCurrentTurnPlayer();
    const { findPlayerByFighter } = useFindTeam();

    useEffect(() => {
        if (findFighterByCoordinate(props.coordinate)) {
            decreaseTreasureCount(props.coordinate);
        }
    }, [whichTurn])

    useEffect(() => {
        if (treasure.count > 3) {
            setTreasureStatus("Closed");
        } else if (treasure.count > 0) {
            setTreasureStatus("Opened");
        } else {
            setTreasureStatus("Empty");
        }
        if (treasure.count === 0 && findFighterByCoordinate(props.coordinate)) {
            const fighter = findFighterByCoordinate(props.coordinate)
            if (fighter) {
                addVictoryPoint({ whichTurn: findPlayerByFighter(fighter) });
            }
        }
    }, [treasure.count])

    //内部的にはcountはマイナスになるが、画面上では0で減少は停止するようにする
    const showCount = treasure.count > 0 ? treasure.count : 0;



    return (
        <>
            <Hex {...props} />
            <image
                x={getCenterPointFromHex(props.coordinate).x - hexWidth / 2 + 2}
                y={getCenterPointFromHex(props.coordinate).y - hexHeight / 2}
                width={hexWidth}
                height={hexHeight}
                xlinkHref={`${process.env.PUBLIC_URL}/UI/Treasure${treasureStatus}.png`}
                style={{ pointerEvents: "none" }}
                opacity={0.5}
            />
            <text
                x={getCenterPointFromHex(props.coordinate).x - hexWidth / 2}
                y={getCenterPointFromHex(props.coordinate).y - hexHeight / 10}
                fill="yellow"
                fontSize={hexWidth / 3}
                style={{ pointerEvents: 'none', fontWeight: 'bold' }}
                opacity={0.6}
            >{showCount}</text>
        </>
    )
}
