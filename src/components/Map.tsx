import { FC } from 'react'
import { Coordinate } from '../types/Coordinate'
import Hex from './Hex'
import { Box } from '@mui/system'
import Grid from '@mui/material/Grid';
import FighterDisplay from './FighterDisplay'
import ActionMenu from './ActionMenu';
import { hexHeight, hexWidth } from '../lib/hexSize';
import { useGameInfo } from '../hooks/useGameInfo';
import { searchdjacent } from '../lib/searchAdjacent';
import MoveConfirm from './MoveConfirm';
import AttackConfirm from './AttackConfirm';
import HitEffect from './HitEffect';
import PushConfirm from './PushConfirm';

const Map: FC = () => {

  const { selectedFighter, selectedHex, phase, hitEffect, targetFighter } = useGameInfo();

  const getRange = () => {
    if (!selectedFighter || phase === "SELECT_FIGHTER") {
      return [];
    }
    if ((phase === "SELECT_MOVE" || phase === "CONFIRM_MOVE") && selectedFighter.coordinate) return findRange(selectedFighter.coordinate, selectedFighter.agl);
    if ((phase === "SELECT_ATTACK" || phase === "CONFIRM_ATTACK") && selectedFighter.coordinate) return findRange(selectedFighter.coordinate, selectedFighter.move.range);
    if ((phase === "SELECT_PUSH" || phase === "CONFIRM_PUSH") && selectedHex) return findRange(selectedHex, 1);
    return []
  }

  const range = getRange()

  const MaxCoordinate: Coordinate = {
    row: 7,
    col: 8
  }

  const boardWidth: number = MaxCoordinate.col * hexWidth * 0.95;
  const boardHeight: number = (MaxCoordinate.row + 0.5) * hexHeight * 0.85


  const honeycomb: any = [];

  //row col の蜂の巣型盤面を作成
  for (let row = 0; row < MaxCoordinate.row; row++) {
    for (let col = 0; col < MaxCoordinate.col; col++) {
      //座標情報を保持
      const coordinate: Coordinate = {
        row: row,
        col: col
      }
      const isColored = range.some(({ row: rangeRow, col: rangeCol }) => rangeRow === coordinate.row && rangeCol === coordinate.col)
      honeycomb.push(
        <>
          <Hex
            key={`${row}-${col}`}
            coordinate={coordinate}
            isColored={isColored}
          />
        </>
      )
    }
  }

  return (
    <Grid item style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box width={boardWidth} height={boardHeight}>
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${boardWidth} ${boardHeight}}`}
          style={{ display: "block", margin: "auto" }}
        >
          {honeycomb}
          <FighterDisplay />
          {selectedFighter?.coordinate && (<ActionMenu coordinate={selectedFighter.coordinate} />)}
          {(selectedFighter && selectedHex && phase === "CONFIRM_MOVE") && (<MoveConfirm selectedFighter={selectedFighter} coordinate={selectedHex} />)}
          {(selectedFighter && selectedHex && phase === "CONFIRM_ATTACK") && (<AttackConfirm coordinate={selectedHex} />)}
          {(targetFighter && selectedHex && phase === "CONFIRM_PUSH") && (<PushConfirm targetFighter={targetFighter} coordinate={selectedHex} />)}
          {hitEffect && (<HitEffect hitType={hitEffect.hitType} coordinate={hitEffect.coordinate} />)}
        </svg>
      </Box>
    </Grid>
  )
}

export default Map;


/**
 * Fighterからrange分の座標の配列を返す
 * @param fighter 
 * @param range 
 * @returns 
 */
const findRange = (coordinate: Coordinate, range: number) => {
  const { row: startRow, col: startCol } = coordinate;
  const visited = new Set<Coordinate>();
  const queue = [[startRow, startCol, 0]]; // [row, col, moves]

  while (queue.length > 0) {
    const queueWithoutFirst = queue.shift();
    //HACK: 型解決のためにチェックしているが、queue.lengh == 0の場合は、whileの中に入らないため、queueWithoutFirstがundefinedは起こり得ないはず。
    if (!queueWithoutFirst) return Array.from(visited);
    const [currentRow, currentCol, moves] = queueWithoutFirst;
    if (moves === range) {
      continue;
    }
    const neighbors = searchdjacent({ row: currentRow, col: currentCol });
    for (const { row: nextRow, col: nextCol } of neighbors) {
      const nextCell = { row: nextRow, col: nextCol };
      if (!visited.has(nextCell)) {
        visited.add(nextCell);
        queue.push([nextRow, nextCol, moves + 1]);
      }
    }
  }

  return Array.from(visited);
};