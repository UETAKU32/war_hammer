import { FC, useEffect, useState } from 'react'
import { CenterPoint } from '../types/CenterPoint'
import { Coordinate } from '../types/Coordinate'
import { getCenterPointFromHex } from '../lib/coordinate';
import { hexHeight, hexRadius, hexWidth } from '../lib/hexSize';
import { useCurrentTurnPlayer, useFindFighter, usePlayer } from '../hooks/usePlayer';
import { useGameInfo } from '../hooks/useGameInfo';
import { isEqual } from 'lodash';
import { usePhaseChange } from '../hooks/usePhaseGhange';
import { HexType } from '../data/map';


type HexProps = {
    coordinate: Coordinate;
    isColored: boolean;
    type: HexType;
}

const NONE = "rgba(100, 100, 100, 0.5)";
const SELECTED_FIGHTER = "rgba(100, 100, 0, 0.5)";
const IN_ATTACK_RANGE_COLOR = "rgba(100, 0, 100, 0.5)";
const IN_MOVE_RANGE_COLOR = "rgba(0, 100, 0, 0.5)"
const IN_PUSH_RANGE_COLOR = "rgba(0, 100, 100, 0.5)"

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
            addVictoryPoint({ whichTurn: "A" });
        }
    }, [treasure.count])

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


const Hex: FC<HexProps> = ({ coordinate, isColored, type }) => {


    const { whichTurn, selectedFighter, setSelectedFighter, selectedHex, setSelectedHex, phase, setTargetFighter, targetFighter, pushedHex, setPushedHex } = useGameInfo();
    const { attack, move } = usePlayer(whichTurn);
    const { confirmMove, confirmAttack, selectMove, selectFighter, selectAttack, confirmPush } = usePhaseChange();
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
        if (type === "FORBIDDEN") return;
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
                move({ fighter: selectedFighter, coordinate: clickedCoordinate })
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
                if (!targetFighter) return;
                attack({ attacker: selectedFighter, receiver: targetFighter, coordinate: selectedHex });
                setTargetFighter(targetFighter);

                //別の攻撃対象を選択
            } else if (clickedFighter) {
                selectAttack(clickedFighter);
                //仲間に攻撃フェーズを渡す
            } else if (findFighterByTeamAndCoordinate(clickedCoordinate, enemy)) {
                setSelectedHex(clickedCoordinate)
            }
            return;
        }
        //押し出しフェーズ
        if (phase === "SELECT_PUSH") {
            if (isColored && !findFighterByCoordinate(clickedCoordinate)) {
                confirmPush(coordinate);
                return
            }
            return;
        }

        if (phase === "CONFIRM_PUSH" && pushedHex && targetFighter) {

            //移動確定
            if (isEqual(pushedHex, clickedCoordinate) && isColored) {
                move({ fighter: targetFighter, coordinate: clickedCoordinate })
                //別の移動候補先を選択
            } else if (!findFighterByCoordinate(clickedCoordinate) && isColored) {
                setPushedHex(clickedCoordinate)
                //仲間に移動フェーズを渡す
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
