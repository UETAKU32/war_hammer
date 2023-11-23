import React, { FC } from 'react'

import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Fighter } from '../types/fighter';
import { AglIcon, AtkIcon, DefIcon, DmgIcon, RangeIcon, SleepIcon } from './GameIcons';
import { TeamName } from '../hooks/useGameInfo';
import HpBar from './HpBar';


type FighterCardProps = {
    teamName: TeamName
    fighter: Fighter
}


export const FighterCard: FC<FighterCardProps> = ({ teamName, fighter }) => {

    const teamColor: string = `linear-gradient(135deg, ${teamName === "A" ? `#FF0000, #8B0000` : `#4287f5, #0a2f6c`})`;
    const imageUrl: string = `${process.env.PUBLIC_URL}/characterImages/Dullahan.png`;

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
                    <Avatar alt="アイコン" src={imageUrl} />
                    <Box marginRight={1}></Box>
                    <Typography variant="h6">{fighter.name}</Typography>
                </Box>
                <Box display="flex" alignItems="center" margin={1}>
                    <FavoriteIcon sx={{ color: 'DeepPink' }} />
                    <Typography variant="body2">5/10</Typography>
                </Box>
                <HpBar fighter={fighter} />
                <Box display="flex" alignItems="center" margin={2}>
                </Box>
                <Box display="flex" alignItems="center" margin={1}>
                    <AglIcon />
                    <Typography variant="body2">5</Typography>
                    <Box marginLeft={1} marginRight={1}></Box>
                    <DefIcon />
                    <Typography variant="body2">5</Typography>
                    <Box marginLeft={1} marginRight={1}></Box>
                    <SleepIcon />
                    <Typography variant="body2">2</Typography>
                </Box>
                <Box display="flex" alignItems="center" margin={2}>
                </Box>
                <Typography variant="body2">攻撃技:剣戟</Typography>
                <Box display="flex" alignItems="center" margin={1}>
                    <AtkIcon />
                    <Typography variant="body2">7</Typography>
                    <Box marginLeft={1} marginRight={1}></Box>
                    <RangeIcon />
                    <Typography variant="body2">1</Typography>
                    <Box marginLeft={1} marginRight={1}></Box>
                    <DmgIcon />
                    <Typography variant="body2">3</Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

