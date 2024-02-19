import { FC } from 'react'
import { hexWidth, hexHeight } from '../lib/hexSize';
import { useAllPlayers } from '../hooks/usePlayer';
import { getCenterPointFromHex } from '../lib/coordinate';
import { Fighter } from '../types/fighter';

const FighterDisplay: FC = () => {
    const allPlayers = useAllPlayers();
    let aliveFighters: Fighter[] = []
    allPlayers.forEach((player) => {
        player.fighters.forEach((fighter) => {
            if (fighter.coordinate) {
                aliveFighters.push(fighter)
            }
        })
    })

    //NOTE: mapでfighterImages除去できそう
    return (
        <>
            {aliveFighters.map((fighter) => {
                if (fighter.coordinate) {
                    <image
                        key={fighter.name}
                        x={getCenterPointFromHex(fighter.coordinate).x - hexWidth / 2 + 2}
                        y={getCenterPointFromHex(fighter.coordinate).y - hexHeight / 2}
                        width={hexWidth}
                        height={hexHeight}
                        xlinkHref={`${process.env.PUBLIC_URL}/fightersImages/${fighter.image}`}
                        style={{ pointerEvents: "none" }}
                    />
                }
            })}
        </>
    )
}

export default FighterDisplay