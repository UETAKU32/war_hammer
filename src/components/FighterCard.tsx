import React, { FC } from 'react'

import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Fighter } from '../types/fighter';
import { AglStatus, AtkStatus, DefStatus, DmgStatus, RangeStatus, SleepStatus, StatusContainer } from './GameIcons';
import { TeamName } from '../hooks/useGameInfo';
import HpBar from './HpBar';
import CustomAvatar from './CostomAvatar';


type FighterCardProps = {
    teamName: TeamName
    fighter: Fighter
}


export const FighterCard: FC<FighterCardProps> = ({ teamName, fighter }) => {

    const teamColor: string = `linear-gradient(135deg, ${teamName === "A" ? `#FF0000, #8B0000` : `#4287f5, #0a2f6c`})`;
    const imageUrl: string = `${process.env.PUBLIC_URL}/characterImages/${fighter.image}`;

    return (
        <Card
            style={{
                border: '4px solid transparent', // 境界線スタイル
                borderRadius: '12px', // 角丸
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // 影
                background: teamColor,
            }}
        >
            <CardContent sx={{ backgroundColor: 'rgba(0, 0, 0, 0.2);' }}>
                <Box display="flex" alignItems="center" margin={1}>
                    <CustomAvatar name={fighter.name} imageUrl={imageUrl} />
                    <Box marginRight={1}></Box>
                    <Typography variant="h6">{fighter.name}</Typography>
                </Box>
                <Box display="flex" alignItems="center" margin={1}>
                    <FavoriteIcon sx={{ color: 'DeepPink' }} />
                    <Typography variant="body2">{fighter.currentHp}/{fighter.maxHp}</Typography>
                </Box>
                <HpBar fighter={fighter} />
                <Box display="flex" alignItems="center" margin={2}>
                </Box>
                <StatusContainer>
                    <AglStatus fighter={fighter} />
                    <DefStatus fighter={fighter} />
                    <SleepStatus fighter={fighter} />
                </StatusContainer>
                <Typography variant="body1">攻撃技:{fighter.move.name}</Typography>
                <StatusContainer>
                    <AtkStatus fighter={fighter} />
                    <RangeStatus fighter={fighter} />
                    <DmgStatus fighter={fighter} />
                </StatusContainer>
            </CardContent>
        </Card>
    );
}

