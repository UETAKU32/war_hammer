import { Coordinate } from "./Coordinate";
import { Fighter } from "./fighter";

export type PlayerId = "A" | "B";

export type Player = {
  id: PlayerId;
  name: string;
  victoryPoint: number;
  fighters: Fighter[];
  selectedCoordinate?: Coordinate;
  selectedFighterId?: number;
};
