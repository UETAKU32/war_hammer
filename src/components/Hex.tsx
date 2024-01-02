import { FC } from 'react'
import { CenterPoint } from '../types/CenterPoint'
import { Coordinate } from '../types/Coordinate'
import { getCenterPointFromHex } from '../lib/coordinate';
import { hexRadius } from '../lib/hexSize';
import { useCurrentTurnPlayer, useFindFighterByCoordinate, useFindTeamFighterByCoordinate, usePlayer } from '../hooks/usePlayer';
import { useGameInfo } from '../hooks/useGameInfo';
import { isEqual } from 'lodash';

type HexProps = {
    coordinate: Coordinate;
    isColored: boolean;
}

const NONE = "rgba(100, 100, 100, 0.5)";
const SELECTED_FIGHTER = "rgba(100, 100, 0, 0.5)";
const IN_ATTACK_RANGE_COLOR = "rgba(100, 0, 100, 0.5)";
const IN_MOVE_RANGE_COLOR = "rgba(0, 100, 0, 0.5)"

const Hex: FC<HexProps> = ({ coordinate, isColored }) => {

    const { whichTurn, selectedFighter, setSelectedFighter, selectedHex, setSelectedHex, phase, setPhase, switchTurn } = useGameInfo();

    const { player, action } = useCurrentTurnPlayer();
    const { findFighterByCoordinate } = useFindFighterByCoordinate();
    const { findTeamFighterByCoordinate } = useFindTeamFighterByCoordinate(whichTurn);

    const centerPoint: CenterPoint = getCenterPointFromHex(coordinate);

    const HEXShapes = [
        [0, hexRadius],
        [(Math.sqrt(3) / 2) * hexRadius, hexRadius / 2],
        [(Math.sqrt(3) / 2) * hexRadius, -hexRadius / 2],
        [0, -hexRadius],
        [-(Math.sqrt(3) / 2) * hexRadius, -hexRadius / 2],
        [-(Math.sqrt(3) / 2) * hexRadius, hexRadius / 2],
    ];
    const pointsString: string = HEXShapes.map((point) => point.join(",")).join(" ");


    const handleClick = (coordinate: Coordinate): void => {
        const clickedFighter = findTeamFighterByCoordinate(coordinate);
        if (phase === "SELECT_FIGHTER") {
            setSelectedFighter(clickedFighter)
        } else if (phase === "SELECT_MOVE" && isColored && !findFighterByCoordinate(coordinate)) {
            setSelectedHex(coordinate)
            setPhase("CONFIRM_MOVE")
        } else if (phase === "SELECT_ATTACK" && isColored) {

        } else if (phase === "CONFIRM_MOVE" && selectedHex && selectedFighter && isColored) {
            if (isEqual(selectedHex, coordinate)) {
                action({ type: "MOVE", payload: { fighter: selectedFighter, coordinate: coordinate } });
                setSelectedFighter(undefined);
                setSelectedHex(undefined);
                switchTurn();
                setPhase("SELECT_FIGHTER");
            } else {
                setSelectedHex(coordinate)
            }
        }
        //NOTE: キャラがいない場合はSELECTED_FIGHTERにリセット
        else if (!clickedFighter) {
            setPhase("SELECT_FIGHTER")
            setSelectedHex(undefined)
            setSelectedFighter(undefined)
        }
    }


    const getColor = () => {
        if (selectedFighter && isEqual(selectedFighter.coordinate, coordinate)) return SELECTED_FIGHTER;
        if (isColored) {
            if (phase === "SELECT_ATTACK") return IN_ATTACK_RANGE_COLOR;
            if (phase === "SELECT_MOVE" || phase === "CONFIRM_MOVE") return IN_MOVE_RANGE_COLOR;
        }
        return NONE;
    }
    const color = getColor();

    return (
        <polygon
            points={pointsString}
            fill={color}
            stroke="black"
            strokeWidth="2"
            transform={`translate(${centerPoint.x}, ${centerPoint.y})`}
            onClick={() => handleClick(coordinate)}
            style={{ cursor: "pointer" }}
        />
    )
}

export default Hex
