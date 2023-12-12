import { FC } from 'react'
import { hexWidth, hexHeight } from '../lib/hexSize';
import { usePlayer } from '../hooks/usePlayer';

const FighterDisplay: FC = () => {
    const { player: playerA } = usePlayer("A");
    const { player: playerB } = usePlayer("B");
    const fighterImages: JSX.Element[] = []
    const allPlayers = [playerA, playerB]

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

    return (
        <>
            {fighterImages}
        </>
    )
}

export default FighterDisplay