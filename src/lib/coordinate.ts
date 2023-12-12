import { hexRadius ,hexWidth} from "./hexSize";
import { CenterPoint } from "../types/CenterPoint";
import { Coordinate, } from "../types/Coordinate";

export function getCenterPointFromHex ({row,col}:Coordinate):CenterPoint{
    return {
        x: row * hexWidth + (col % 2 === 1 ? hexWidth / 2 : 0) + hexWidth / 2 + 2,
        y: col * 1.5 * hexRadius + hexRadius + 2,
      }

}