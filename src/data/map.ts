import { Coordinate } from "../types/Coordinate";

export type HexType = "NORMAL" | "FORBIDDEN" | "POND" | "TREASURE";

export type MapInfo = {
  data: HexType[][];
  maxCoordinate: Coordinate;
};

export const MAX_TREASURE_COUNT = 5;

const mapAData: HexType[][] = [
  ["NORMAL", "NORMAL", "FORBIDDEN", "NORMAL", "NORMAL", "NORMAL", "TREASURE"],
  ["NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL"],
  ["NORMAL", "NORMAL", "NORMAL", "FORBIDDEN", "NORMAL", "FORBIDDEN", "NORMAL"],
  ["NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL"],
  ["NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL"],
  ["NORMAL", "FORBIDDEN", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL"],
  ["NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL"],
  ["NORMAL", "NORMAL", "NORMAL", "TREASURE", "FORBIDDEN", "NORMAL", "NORMAL"],
];

export const defaultMap: MapInfo = {
  data: mapAData,
  maxCoordinate: {
    row: mapAData[0].length,
    col: mapAData.length,
  },
};

const getTreasureCoordinates = () => {
  const treasureCoordinates: Coordinate[] = [];
  mapAData.forEach((col, colIndex) => {
    col.forEach((type, rowIndex) => {
      if (type === "TREASURE") {
        treasureCoordinates.push({ row: rowIndex, col: colIndex });
      }
    });
  });
  return treasureCoordinates;
};

export const treasureCoordinates: Coordinate[] = getTreasureCoordinates();
