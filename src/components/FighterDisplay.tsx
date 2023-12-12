import { FC } from 'react'
import { HEXWidth, HEXHeight } from "../components/HoneyComb";
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
                    x={fighter.coordinate.row * HEXWidth + (fighter.coordinate.col % 2 === 1 ? HEXWidth / 2 : 0) + 2}
                    y={(fighter.coordinate.col * 1.5 * HEXHeight) / 2 + HEXHeight / 2 + 2 - HEXHeight / 2}
                    width={HEXWidth}
                    height={HEXHeight}
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