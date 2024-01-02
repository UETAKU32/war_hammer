import React, { FC, useState } from 'react'
import { Coordinate } from '../types/Coordinate'
import Hex from './Hex'
import { Box } from '@mui/system'
import Grid from '@mui/material/Grid';
import FighterDisplay from './FighterDisplay'
import ActionMenu from './ActionMenu';
import { hexHeight, hexWidth } from '../lib/hexSize';
import { useGameInfo } from '../hooks/useGameInfo';
import { searchdjacent } from '../lib/searchAdjacent';
import { Fighter } from '../types/fighter';
import MoveConfirm from './MoveConfirm';

const Map: FC = () => {

  const { selectedFighter, selectedHex, phase } = useGameInfo();
  console.log({ phase })

  const getRange = () => {
    if (!selectedFighter || phase === "SELECT_FIGHTER") {
      return [];
    }
    if (phase === "SELECT_MOVE" || phase === "CONFIRM_MOVE") return findRange(selectedFighter, selectedFighter.agl);
    if (phase === "SELECT_ATTACK") return findRange(selectedFighter, selectedFighter.move.range);

  }

  //FIXME: anyじゃなくて、ちゃんと型定義したい！
  const range: any = getRange()

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
      const isColored = range.some(([rangeRow, rangeCol]: any[]) => rangeRow === coordinate.row && rangeCol === coordinate.col)
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
          {selectedFighter && (<ActionMenu selectedFighter={selectedFighter} />)}
          {(selectedFighter && selectedHex) && (<MoveConfirm selectedFighter={selectedFighter} coordinate={selectedHex} />)}
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
const findRange = (fighter: Fighter, range: number) => {
  const { col: startRow, row: startCol } = fighter.coordinate;
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
