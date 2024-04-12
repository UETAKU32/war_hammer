import { Coordinate } from "../types/Coordinate";

export type Type = "NORMAL" | "FORBIDDEN" | "POND";

export type MapInfo = {
  data: Type[][];
  maxCoordinate: Coordinate;
};

const mapAData: Type[][] = [
  ["NORMAL", "NORMAL", "FORBIDDEN", "NORMAL", "NORMAL", "NORMAL", "NORMAL"],
  ["NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL"],
  ["NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL"],
  ["NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL"],
  ["NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL"],
  ["NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL"],
  ["NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL"],
  ["NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL"],
  ["NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL"],
];

export const defaultMap: MapInfo = {
  data: mapAData,
  maxCoordinate: {
    row: mapAData[0].length,
    col: mapAData.length,
  },
};
