import { Coordinate, } from "../types/Coordinate";

export function searchdjacent ({row,col}:Coordinate):Coordinate[] {
    const adjacentHEX :Coordinate []= [];
    adjacentHEX.push(
      {row:row - 1, col:col},
      {row:row, col:col - 1},
      {row:row + 1, col:col},
      {row:row, col:col + 1}
    );
    if (col % 2 === 1) {
      adjacentHEX.push({row:row + 1, col:col + 1}, {row:row + 1, col:col - 1});
    } else {
      adjacentHEX.push({row:row - 1, col:col - 1}, {row:row - 1, col:col + 1});
    }
    return adjacentHEX;
  };