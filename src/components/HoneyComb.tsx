import React, { FC } from 'react'
import { Coordinate } from '../types/Coordinate'
import MakeHEX from './MakeHEX'
import { Box } from '@mui/system'
import Grid from '@mui/material/Grid';
import FighterDisplay from './FighterDisplay'
import ActionMenu from './ActionMenu';

//HEXの大きさを定義
export const HEXRadius: number = 65;//中心点から各頂点への距離
export const HEXWidth: number = Math.sqrt(3) * HEXRadius;//ヨコの長さ
export const HEXHeight: number = HEXRadius * 2;//タテの長さ

const HoneyComb: FC = () => {


  const MaxCoordinate: Coordinate = {
    row: 7,
    col: 8
  }

  const boardWidth: number = MaxCoordinate.col * HEXWidth * 0.95;
  const boardHeight: number = (MaxCoordinate.row + 0.5) * HEXHeight * 0.85


  const honeycomb: any = [];

  //row col の蜂の巣型盤面を作成
  for (let row = 0; row < MaxCoordinate.row; row++) {
    for (let col = 0; col < MaxCoordinate.col; col++) {
      //座標情報を保持
      const coordinate: Coordinate = {
        row: row,
        col: col
      }

      honeycomb.push(
        <>
          <MakeHEX
            key={`${row}-${col}`}
            coordiate={coordinate}
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
        </svg>
      </Box>
    </Grid>
  )
}

export default HoneyComb