import { HEXRadius} from "../components/HoneyComb";
import { CenterPoint } from "../types/CenterPoint";
import { Coordinate, } from "../types/Coordinate";

export function getCenterPointFromHex ({row,col}:Coordinate):CenterPoint{
  const hexWidth :number =Math.sqrt(3) * HEXRadius;
    return {
        x: row * hexWidth + (col % 2 === 1 ? hexWidth / 2 : 0) + hexWidth / 2 + 2,
        y: col * 1.5 * HEXRadius + HEXRadius + 2,
      }

}