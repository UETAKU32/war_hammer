import { FC } from 'react'
import { Box, Typography } from '@mui/material';
import { usePlayer } from '../hooks/usePlayer';
import { PlayerId } from '../types/Player';

interface VictoryPointsProps {
    playerId: PlayerId;
}


const VictoryPoints: FC<VictoryPointsProps> = ({ playerId }) => {
    const { player: { victoryPoint } } = usePlayer(playerId);

    const turnUiImage: string = `${process.env.PUBLIC_URL}/UI/Team${playerId}UI2.png`
    return (
        <Box
            style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <img
                src={turnUiImage}
                alt=''
                style={{
                    width: 'auto',
                    height: '120px',
                    position: 'absolute',
                    opacity: 1,
                    margin: 5,
                    zIndex: 0,
                }}
            />
            <Typography variant="h2"
                style={{
                    color: `gold`,
                    zIndex: 1,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >{victoryPoint}</Typography>
        </Box>
    )
}

export default VictoryPoints