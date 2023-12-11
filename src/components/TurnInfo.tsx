import React, { FC } from 'react'
import { TeamName } from '../hooks/useGameInfo';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';

//TODO 以下の3つの定数は、ゲーム制御回りの実装が終わったら、providerから読み込む
const currentTeam: TeamName = "A"
const maxTurn: number = 8
const currentTurn: number = 4
//--------------------------------------------------------------------

const turnUiImage: string = `${process.env.PUBLIC_URL}/UI/Team${currentTeam}UI.png`

const TurnInfo: FC = () => {

    return (
        <Box
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
            }}>
            <Typography variant="h4"
                style={{
                    color: `white`,
                    zIndex: 1,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >Turn {currentTurn} / {maxTurn} Max</Typography>
            <img
                src={turnUiImage}
                alt=''
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