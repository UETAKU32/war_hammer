import { FC } from 'react'
import { CenterPoint } from '../types/CenterPoint'
import { Coordinate } from '../types/Coordinate'
import { getCenterPointFromHex } from '../lib/coordinate';
import { hexRadius } from '../lib/hexSize';
import { useFindFighter } from '../hooks/usePlayer';
import { useGameInfo } from '../hooks/useGameInfo';
import { isEqual } from 'lodash';
import { usePhaseChange } from '../hooks/usePhaseGhange';

type HexProps = {
    coordinate: Coordinate;
    isColored: boolean;
}

const NONE = "rgba(100, 100, 100, 0.5)";
const SELECTED_FIGHTER = "rgba(100, 100, 0, 0.5)";
const IN_ATTACK_RANGE_COLOR = "rgba(100, 0, 100, 0.5)";
const IN_MOVE_RANGE_COLOR = "rgba(0, 100, 0, 0.5)"
const IN_PUSH_RANGE_COLOR = "rgba(0, 100, 100, 0.5)"

const Hex: FC<HexProps> = ({ coordinate, isColored }) => {


    const { whichTurn, selectedFighter, setSelectedFighter, selectedHex, setSelectedHex, phase } = useGameInfo();
    const { confirmMove, confirmAttack, selectMove, selectFighter, selectAttack, doMove, doAttack } = usePhaseChange();
    const enemy = whichTurn === "A" ? "B" : "A";
    const { findFighterByCoordinate, findFighterByTeamAndCoordinate } = useFindFighter();


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


    const handleClick = (clickedCoordinate: Coordinate): void => {
        const clickedFighter = findFighterByTeamAndCoordinate(clickedCoordinate, whichTurn);

        if (phase === "SELECT_FIGHTER") {
            setSelectedFighter(clickedFighter);
            return;
        }

        //クリックされたHexがハイライトされており、キャラがいなければ
        if (phase === "SELECT_MOVE" && isColored && !findFighterByCoordinate(clickedCoordinate)) {
            confirmMove(clickedCoordinate);
            return;
        }
        if (phase === "SELECT_ATTACK" && isColored) {
            if (findFighterByTeamAndCoordinate(clickedCoordinate, enemy)) {
                confirmAttack(clickedCoordinate);
            } else if (clickedFighter) {
                setSelectedFighter(clickedFighter)
            }
            return;
        }

        //移動フェーズ
        if (phase === "CONFIRM_MOVE" && selectedHex && selectedFighter && isColored) {
            //移動確定
            if (isEqual(selectedHex, clickedCoordinate)) {
                doMove(selectedHex);
                //別の移動候補先を選択
            } else if (!findFighterByCoordinate(clickedCoordinate)) {
                setSelectedHex(clickedCoordinate)
                //仲間に移動フェーズを渡す
            } else if (clickedFighter) {
                selectMove(clickedFighter);
            }
            return;
        }

        //攻撃フェーズ
        if (phase === "CONFIRM_ATTACK" && selectedHex && selectedFighter && isColored) {
            //攻撃確定
            if (isEqual(selectedHex, clickedCoordinate)) {
                const targetFighter = findFighterByTeamAndCoordinate(clickedCoordinate, enemy)
                if (!targetFighter) return
                doAttack(targetFighter, clickedCoordinate)

                //別の攻撃対象を選択
            } else if (clickedFighter) {
                selectAttack(clickedFighter);
                //仲間に攻撃フェーズを渡す
            } else if (findFighterByTeamAndCoordinate(clickedCoordinate, enemy)) {
                setSelectedHex(clickedCoordinate)
            }
            return;
        }

        //上記if全てに当てはまらない場合、下記条件式の判定をしたい
        if (clickedFighter) {
            setSelectedHex(undefined);
            setSelectedFighter(clickedFighter);
            return;
        }

        //NOTE: キャラがいない場合はSELECTED_FIGHTERにリセット
        if (!clickedFighter) {
            selectFighter()
            return;
        }
    }


    const getColor = () => {
        if (selectedFighter && isEqual(selectedFighter.coordinate, coordinate)) return SELECTED_FIGHTER;
        if (isColored) {
            if (phase === "SELECT_ATTACK" || phase === "CONFIRM_ATTACK") return IN_ATTACK_RANGE_COLOR;
            if (phase === "SELECT_MOVE" || phase === "CONFIRM_MOVE") return IN_MOVE_RANGE_COLOR;
            if (phase === "SELECT_PUSH" || phase === "CONFIRM_PUSH") return IN_PUSH_RANGE_COLOR;
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
