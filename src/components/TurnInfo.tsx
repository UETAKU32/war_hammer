import { FC } from 'react'
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { useGameInfo } from '../hooks/useGameInfo';


const TurnInfo: FC = () => {

    const { whichTurn: currentTeam, maxTurnNum: maxTurn, currentTurnNum: currentTurn, whichWon, phase } = useGameInfo();
    let turnUiImage: string = `${process.env.PUBLIC_URL}/UI/Team${currentTeam}UI.png`
    const turnMessage: string = `Turn ${currentTurn} / ${maxTurn} Max`
    const winnerMessage: string = `Winner Is Team${whichWon}`
    if (whichWon) {
        turnUiImage = `${process.env.PUBLIC_URL}/UI/Team${whichWon}UI.png`
    }


    return (
        <Box
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
            }}>
            <Typography variant="h5"
                style={{
                    color: `white`,
                    zIndex: 1,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >{whichWon ? winnerMessage : turnMessage} {phase}</Typography>
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