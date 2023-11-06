import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

type Fighter = {
  name: string;
  hp: number;
};

export type PlayerInfo = {
  victoryPoint: number;
  fighters: Fighter[];
};

const samplePlayer = {
  victoryPoint: 10,
  fighters: [
    {
      name: "pikachu",
      hp: 100,
      atk: 10,
    },
    {
      name: "koratta",
      hp: 20,
      atk: 10,
    },
  ],
};

type PlayerInfoProviderProps = {
  player: PlayerInfo;
  updatePlayer: (info: PlayerInfo) => void;
};

const PlayerInfoContext = createContext<PlayerInfoProviderProps | null>(null);

export const PlayerInfoProvider: FC<PropsWithChildren> = ({ children }) => {
  const [player, setPlayer] = useState<PlayerInfo>(samplePlayer);
  return (
    <PlayerInfoContext.Provider value={{ player, updatePlayer: setPlayer }}>
      {children}
    </PlayerInfoContext.Provider>
  );
};

export const usePlayerInfo = () => {
  const value = useContext(PlayerInfoContext);
  if (!value)
    throw new Error(
      "usePlayerInfoはPlayerInfoProviderの子でしか呼び出せません！"
    );
  return value;
};
