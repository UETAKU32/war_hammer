import { FC } from 'react'
import { CenterPoint } from '../types/CenterPoint'
import { Coordinate } from '../types/Coordinate'
import { getCenterPointFromHex } from '../lib/coordinate';
import { hexRadius } from '../lib/hexSize';
import { useCurrentTurnPlayer, useFindFighterByCoordinate } from '../hooks/usePlayer';
import { useGameInfo } from '../hooks/useGameInfo';
import { searchdjacent } from '../lib/searchAdjacent';

type MakeHEXProps = {
    coordinate: Coordinate;
}

const MakeHEX: FC<MakeHEXProps> = ({ coordinate }) => {

    const { selectedFighter, setSelectedFighter, phase, setPhase } = useGameInfo();


    const { player, action } = useCurrentTurnPlayer();
    const { findFighterByCoordinate } = useFindFighterByCoordinate();

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

    let hexColor = "rgba(100, 100, 100, 0.5)"

    const handleClick = (coordinate: Coordinate): void => {
        const selectedFighter = findFighterByCoordinate(coordinate);
        setSelectedFighter(selectedFighter)
        if (!selectedFighter) {
            setPhase("SELECT_FIGHTER")
        }
    }


    let range: any = []
    if (selectedFighter && phase === "SELECT_MOVE") {
        range = findRange(selectedFighter.coordinate.row, selectedFighter.coordinate.col, selectedFighter.agl)

        if (range.some((item: any[]) => item[0] == coordinate.row && item[1] == coordinate.col)) {
            hexColor = "rgba(0, 100, 0, 0.5)"
        }
    } else if (selectedFighter && phase === "SELECT_ATTACK") {
        range = findRange(selectedFighter.coordinate.row, selectedFighter.coordinate.col, selectedFighter.move.range)

        if (range.some((item: any[]) => item[0] == coordinate.row && item[1] == coordinate.col)) {
            hexColor = "rgba(100, 0, 100, 0.5)"
        }
    }

    if (selectedFighter?.coordinate.row === coordinate.row && selectedFighter?.coordinate.col === coordinate.col) {
        hexColor = "rgba(100, 100, 0, 0.5)"
    }


    return (
        <polygon
            points={pointsString}
            fill={hexColor}
            stroke="black"
            strokeWidth="2"
            transform={`translate(${centerPoint.x}, ${centerPoint.y})`}
            onClick={() => handleClick(coordinate)}
            style={{ cursor: "pointer" }}
        />
    )
}

export default MakeHEX

const findRange = (startRow: number, startCol: number, range: number) => {
    const visited = new Set();
    const queue = [[startRow, startCol, 0]]; // [row, col, moves]

    while (queue.length > 0) {
        const queueWithoutFirst = queue.shift();
        if (!queueWithoutFirst) return;
        const [currentRow, currentCol, moves] = queueWithoutFirst;
        if (moves === range) {
            continue;
        }
        const neighbors = searchdjacent({ row: currentRow, col: currentCol });
        for (const { row: nextRow, col: nextCol } of neighbors) {
            const nextCell = [nextRow, nextCol];
            if (!visited.has(nextCell)) {
                visited.add(nextCell);
                queue.push([nextRow, nextCol, moves + 1]);
            }
        }
    }
    return Array.from(visited);
};
