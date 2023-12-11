import React, { FC } from 'react'
import { TeamName, useGameInfo } from "../hooks/useGameInfo";
import { Box, Typography } from '@mui/material';

interface VictoryPointsProps {
    teamName: TeamName;
}


const VictoryPoints: FC<VictoryPointsProps> = ({ teamName }) => {

    const { gameInfo } = useGameInfo()
    const victoryPoint: number | undefined = gameInfo.teams.find((team) => team.name === teamName)?.victoryPoint


    const turnUiImage: string = `${process.env.PUBLIC_URL}/UI/Team${teamName}UI2.png`
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