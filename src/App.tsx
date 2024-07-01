import "./App.css";
import { GameInfoProvider } from "./hooks/useGameInfo";
import { GameThemeProvider } from "./components/GameThemeProvider";
import { GameContainer } from "./components/GameContainer";
import { PlayerProvider } from "./hooks/usePlayer";
import { PhaseChangeProvider } from "./hooks/usePhaseGhange";

function App() {
  return (
    <GameThemeProvider>
      <GameInfoProvider>
        <PhaseChangeProvider>
          <PlayerProvider>
            <GameContainer />
          </PlayerProvider>
        </PhaseChangeProvider>
      </GameInfoProvider>
    </GameThemeProvider>
  );
}

export default App;
