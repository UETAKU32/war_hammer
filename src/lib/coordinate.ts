import { HEXRadius, HEXWidth } from "../components/HoneyComb";
import { CenterPoint } from "../types/CenterPoint";
import { Coordinate, } from "../types/Coordinate";

export function getCenterPointFromHex ({row,col}:Coordinate):CenterPoint{
    return {
        x: row * HEXWidth + (col % 2 === 1 ? HEXWidth / 2 : 0) + HEXWidth / 2 + 2,
        y: col * 1.5 * HEXRadius + HEXRadius + 2,
      }

}