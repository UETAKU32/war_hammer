import { FC } from 'react'
import { Coordinate } from '../types/Coordinate'
import Hex, { TreasureHex } from './Hex'
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
import { MapInfo } from '../data/map';

type MapProps = {
  mapInfo: MapInfo;
}

const Map: FC<MapProps> = ({ mapInfo: { data, maxCoordinate } }) => {

  const { selectedFighter, selectedHex, phase, hitEffect, targetFighter, pushedHex } = useGameInfo();

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

  const boardWidth: number = maxCoordinate.col * hexWidth * 0.95;
  const boardHeight: number = (maxCoordinate.row + 0.5) * hexHeight * 0.85


  const honeycomb: any = [];


  //row col の蜂の巣型盤面を作成
  for (let col = 0; col < maxCoordinate.col; col++) {
    for (let row = 0; row < maxCoordinate.row; row++) {
      //座標情報を保持
      const coordinate: Coordinate = {
        row: row,
        col: col
      }
      const isColored = range.some(({ row: rangeRow, col: rangeCol }) => rangeRow === coordinate.row && rangeCol === coordinate.col)
      if (data[col][row] !== "FORBIDDEN") {
        if (data[col][row] === "TREASURE") {
          honeycomb.push(
            <TreasureHex
              key={`${row}-${col}`}
              coordinate={coordinate}
              isColored={isColored}
              type={data[col][row]}
            />
          )
        } else {
          honeycomb.push(
            <>
              <Hex
                key={`${row}-${col}`}
                coordinate={coordinate}
                isColored={isColored}
                type={data[col][row]}
              />
            </>
          )
        }

      }
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
          {selectedFighter?.coordinate && phase !== "SELECT_PUSH" && phase !== "CONFIRM_PUSH" && (<ActionMenu coordinate={selectedFighter.coordinate} />)}
          {(selectedFighter && selectedHex && phase === "CONFIRM_MOVE") && (<MoveConfirm selectedFighter={selectedFighter} coordinate={selectedHex} />)}
          {(selectedFighter && selectedHex && phase === "CONFIRM_ATTACK") && (<AttackConfirm coordinate={selectedHex} />)}
          {(targetFighter && pushedHex && phase === "CONFIRM_PUSH") && (<PushConfirm targetFighter={targetFighter} coordinate={pushedHex} />)}
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
    if (!queueWithoutFirst) break;
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