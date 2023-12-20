import { FC } from 'react'
import { hexWidth, hexHeight } from '../lib/hexSize';
import { useAllPlayers } from '../hooks/usePlayer';

const FighterDisplay: FC = () => {
    const allPlayers = useAllPlayers();
    const fighterImages: JSX.Element[] = []

    allPlayers.forEach((player) =>
        player.fighters.filter((fighter) => fighter.currentHp > 0).forEach((fighter) =>
            fighterImages.push(
                <image
                    key={fighter.name}
                    x={fighter.coordinate.row * hexWidth + (fighter.coordinate.col % 2 === 1 ? hexWidth / 2 : 0) + 2}
                    y={(fighter.coordinate.col * 1.5 * hexHeight) / 2 + hexHeight / 2 + 2 - hexHeight / 2}
                    width={hexWidth}
                    height={hexHeight}
                    xlinkHref={`${process.env.PUBLIC_URL}/fightersImages/${fighter.image}`}
                    style={{ pointerEvents: "none" }}
                />
            )
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