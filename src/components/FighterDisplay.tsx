import { FC } from 'react'
import { hexWidth, hexHeight } from '../lib/hexSize';
import { useAllPlayers } from '../hooks/usePlayer';
import { getCenterPointFromHex } from '../lib/coordinate';

const FighterDisplay: FC = () => {
    const allPlayers = useAllPlayers();
    const fighterImages: JSX.Element[] = []

    allPlayers.forEach((player) =>
        player.fighters.filter((fighter) => fighter.currentHp > 0).forEach((fighter) => {
            const centerPoint = getCenterPointFromHex(fighter.coordinate)
            fighterImages.push(
                <image
                    key={fighter.name}
                    x={centerPoint.x - hexWidth / 2 + 2}
                    y={centerPoint.y - hexHeight / 2}
                    width={hexWidth}
                    height={hexHeight}
                    xlinkHref={`${process.env.PUBLIC_URL}/fightersImages/${fighter.image}`}
                    style={{ pointerEvents: "none" }}
                />
            )
        }
        )
    )

    //NOTE: mapでfighterImages除去できそう
    return (
        <>
            {fighterImages}
        </>
    )
}

export default FighterDisplay