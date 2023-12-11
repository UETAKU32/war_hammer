import { useGameInfo } from "../hooks/useGameInfo";
import { Coordinate } from "../types/Coordinate";
import { Fighter } from "../types/fighter";

export function useFindFighterFromCoordinate({
  row,
  col,
}: Coordinate): Fighter | undefined {
  const { gameInfo } = useGameInfo();

  const foundFighter: Fighter | undefined = gameInfo.teams
    .flatMap((team) => team.fighters.filter((fighter) => fighter.currentHp > 0))
    .find(
      (fighter) =>
        row === fighter.coordinate.row && col === fighter.coordinate.col
    );

  return foundFighter;
}
