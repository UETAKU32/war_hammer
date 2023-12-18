import { useState, useEffect } from 'react';
import { Coordinate } from '../types/Coordinate';
import { PlayerId } from '../types/Player';
import { usePlayer } from './usePlayer';
import { Fighter } from '../types/fighter';

export function useSetFighterHEX(playerId: PlayerId, coordinate: Coordinate): Fighter | undefined {
  const { player } = usePlayer(playerId);
  const [foundFighter, setFoundFighter] = useState<Fighter | undefined>(undefined);

  useEffect(() => {
    const fighters: Fighter[] = player.fighters;
    const fighterFound: Fighter | undefined = fighters
      .filter((fighter) => fighter.currentHp > 0)
      .find(
        (fighter) =>
          coordinate.row === fighter.coordinate.row && coordinate.col === fighter.coordinate.col
      );

    setFoundFighter(fighterFound);
  }, [player, coordinate]);

  return foundFighter;
}