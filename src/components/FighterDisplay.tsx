import { FC } from 'react'
import { useGameInfo } from '../hooks/useGameInfo';
import { HEXWidth, HEXHeight } from "../components/HoneyComb";

const FighterDisplay: FC = () => {
    const { gameInfo } = useGameInfo();
    const fighterImages: JSX.Element[] = []
    gameInfo.teams.forEach((team) =>
        team.fighters.filter((fighter) => fighter.currentHp > 0).forEach((fighter) =>
            fighterImages.push(
                <image
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