import React, { FC } from 'react'
import { CenterPoint } from '../types/CenterPoint'
import { Coordinate } from '../types/Coordinate'
import MakeHEX from './MakeHEX'


const HoneyComb: FC = () => {

  //HEXの大きさを定義
  const HEXRadius: number = 55;//中心点から各頂点への距離
  const HEXWidth: number = Math.sqrt(3) * HEXRadius;//ヨコの長さ
  const HEXHeight: number = HEXRadius * 2;//タテの長さ

  const MaxCoordinate: Coordinate = {
    row: 7,
    col: 8
  }

  const honeycomb: any = [];

  //row col の蜂の巣型盤面を作成
  for (let row = 0; row < MaxCoordinate.row; row++) {
    for (let col = 0; col < MaxCoordinate.col; col++) {
      //座標情報を保持
      const Coordinate: Coordinate = {
        row: row,
        col: col
      }
      //各HEXの中心座標を計算
      const CenterPoint: CenterPoint = {
        x: row * HEXWidth + (col % 2 === 1 ? HEXWidth / 2 : 0) + HEXWidth / 2 + 2,
        y: col * 1.5 * HEXRadius + HEXRadius + 2,
      }

      honeycomb.push(
        <>
          <MakeHEX
            CenterPoint={CenterPoint}
            Coordiate={Coordinate}
            HEXRadius={HEXRadius}
          />
        </>
      )
    }
  }

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${MaxCoordinate.col * HEXWidth} ${(MaxCoordinate.row + 0.5) * HEXHeight}}`}
      style={{ display: "block", margin: "auto" }}
    >
      {honeycomb}
    </svg>
  )
}

export default HoneyComb