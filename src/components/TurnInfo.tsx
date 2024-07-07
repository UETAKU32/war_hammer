import { FC } from 'react'
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { useGameInfo } from '../hooks/useGameInfo';
import { useAllPlayers } from '../hooks/usePlayer';


const TurnInfo: FC = () => {

    const { whichTurn: currentTeam, maxTurnNum: maxTurn, currentTurnNum: currentTurn, whichWon, setWhichWon, phase, gameEnd } = useGameInfo();
    const allPlayer = useAllPlayers();
    let turnUiImage: string = `${process.env.PUBLIC_URL}/UI/Team${currentTeam}UI.png`
    const turnMessage: string = `Turn ${currentTurn} / ${maxTurn} Max`
    const winnerMessage: string = whichWon ? `Winner Is Team${whichWon}` : `DROW`
    let userMessage: string = ""

    switch (phase) {
        case "SELECT_FIGHTER":
            userMessage = "Choose your character";
            break;
        case "SELECT_MOVE":
            userMessage = "Choose where to go";
            break;
        case "CONFIRM_MOVE":
            userMessage = "Confirm where to go";
            break;
        case "SELECT_ATTACK":
            userMessage = "Choose target in enemy";
            break;
        case "CONFIRM_ATTACK":
            userMessage = "Confirm target in enemy";
            break;
        case "SELECT_PUSH":
            userMessage = "Choose where to push";
            break;
        case "CONFIRM_PUSH":
            userMessage = "Confirm where to push";
            break;
        case "CONFIRM_END":
            userMessage = "End this turn ?";
            break;
        case "CONFIRM_GUARD":
            userMessage = "Confirm guard action";
            break;
        default:
            userMessage = "不明なフェーズです";
            break;
    }

    if (gameEnd && (allPlayer[0].victoryPoint > allPlayer[1].victoryPoint)) {
        setWhichWon("A")
    } else if (gameEnd && (allPlayer[0].victoryPoint < allPlayer[1].victoryPoint)) {
        setWhichWon("B")
    }

    if (whichWon && gameEnd) {
        turnUiImage = `${process.env.PUBLIC_URL}/UI/Team${whichWon}UI.png`
    } else if (gameEnd) {

    }


    return (
        <Box
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
            }}>
            <Typography variant="h6"
                style={{
                    color: `white`,
                    zIndex: 1,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >{gameEnd ? winnerMessage : turnMessage}
                <br />{userMessage}</Typography>
            <img
                src={turnUiImage}
                alt='TurnUI'
                style={{
                    width: '100%',
                    height: '120px',
                    position: 'relative',
                    opacity: 1,
                    margin: 5,
                    zIndex: 0,
                }}
            />
        </Box>
    )
}

export default TurnInfo