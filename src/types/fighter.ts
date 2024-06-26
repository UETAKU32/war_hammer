import { Coordinate } from "./Coordinate";
import { Move } from "./move";

export type Fighter = {
  id: number;
  name: string;
  maxHp: number;
  currentHp: number;
  agl:number;
  def:number;
  locked:number;
  move:Move;
  coordinate?:Coordinate;
  image:string;
  guard: boolean;
};
