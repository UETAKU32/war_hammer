import { FC } from 'react'
import { hexWidth, hexHeight } from '../lib/hexSize';
import { useAllPlayers } from '../hooks/usePlayer';
import { getCenterPointFromHex } from '../lib/coordinate';
import { Fighter } from '../types/fighter';

const FighterDisplay: FC = () => {
    const allPlayers = useAllPlayers();
    const aliveFighters: Fighter[] = allPlayers
        .flatMap(player => player.fighters)
        .filter(fighter => fighter.coordinate);

    return (
        <>
            {aliveFighters.map((fighter) => {
                //getCenterPointFromHexが型定義を認識しないためif (fighter.coordinate)でundefinedを回避
                if (fighter.coordinate) {
                    return (
                        <image
                            key={fighter.id}
                            x={getCenterPointFromHex(fighter.coordinate).x - hexWidth / 2 + 2}
                            y={getCenterPointFromHex(fighter.coordinate).y - hexHeight / 2}
                            width={hexWidth}
                            height={hexHeight}
                            xlinkHref={`${process.env.PUBLIC_URL}/fightersImages/${fighter.image}`}
                            style={{ pointerEvents: "none" }}
                        />
                    )
                } else {
                    return null
                }
            })}
        </>
    )
}

export default FighterDisplay