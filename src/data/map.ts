import { Coordinate } from "../types/Coordinate";

export type HexType = "NORMAL" | "FORBIDDEN" | "POISON" | "TREASURE";

export type MapInfo = {
  data: HexType[][];
  maxCoordinate: Coordinate;
};

export const MAX_TREASURE_COUNT = 10;

const mapAData: HexType[][] = [
  ["TREASURE", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL"],
  ["POISON" , "NORMAL", "NORMAL",  "NORMAL" , "NORMAL", "NORMAL"],
  ["NORMAL", "NORMAL", "FORBIDDEN", "NORMAL", "NORMAL", "FORBIDDEN", "NORMAL"],
  ["NORMAL", "NORMAL", "NORMAL", "TREASURE" , "POISON" , "NORMAL", "NORMAL"],
  ["NORMAL", "NORMAL", "POISON" , "TREASURE", "NORMAL", "NORMAL", "NORMAL"],
  ["NORMAL", "FORBIDDEN", "NORMAL", "NORMAL" , "FORBIDDEN", "NORMAL", "NORMAL"],
  ["NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "POISON" ],
  ["NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL","TREASURE"],
];

export const defaultMap: MapInfo = {
  data: mapAData,
  maxCoordinate: {
    col: mapAData[0].length,
    row: mapAData.length,
  },
};

const getTreasureCoordinates = () => {
  const treasureCoordinates: Coordinate[] = [];
  mapAData.forEach((row, rowIndex) => {
    row.forEach((type, colIndex) => {
      if (type === "TREASURE") {
        treasureCoordinates.push({ row: rowIndex, col: colIndex });
      }
    });
  });
  return treasureCoordinates;
};

export const treasureCoordinates: Coordinate[] = getTreasureCoordinates();
