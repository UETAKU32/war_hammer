import React, { FC } from 'react'

import { Card, CardContent, Typography, Avatar, LinearProgress, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Fighter } from '../types/fighter';
import GameIcons from './GameIcons';

type FighterCardProps = {
    fighter: Fighter
}


export const FighterCard: FC<FighterCardProps> = ({ fighter: { name } }) => {


    const imageUrl: string = `${process.env.PUBLIC_URL}/characterImages/Dullahan.png`;

    return (
        <Card
            style={{
                border: '4px solid transparent', // 境界線スタイル
                borderRadius: '12px', // 角丸
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // 影
                background: 'linear-gradient(135deg, #f06, #9f6)',
            }}
        >
            <CardContent sx={{ backgroundColor: 'lightblue' }}>
                <Box display="flex" alignItems="center" margin={1}>
                    <Avatar alt="アイコン" src={imageUrl} />
                    <Box marginRight={1}></Box>
                    <Typography variant="h6">{name}</Typography>
                </Box>
                <Box display="flex" alignItems="center" margin={1}>
                    <FavoriteIcon sx={{ color: 'DeepPink' }} />
                    <Typography variant="body2">5/10</Typography>
                </Box>
                <LinearProgress
                    variant="determinate"
                    value={50}
                />
                <Box display="flex" alignItems="center" margin={2}>
                </Box>
                <Box display="flex" alignItems="center" margin={1}>
                    <GameIcons iconName='agl' />
                    <Typography variant="body2">5</Typography>
                    <Box marginLeft={1} marginRight={1}></Box>
                    <GameIcons iconName='def' />
                    <Typography variant="body2">5</Typography>
                    <Box marginLeft={1} marginRight={1}></Box>
                    <GameIcons iconName='sleep' />
                    <Typography variant="body2">2</Typography>
                </Box>
                <Box display="flex" alignItems="center" margin={2}>
                </Box>
                <Typography variant="body2">攻撃技:剣戟</Typography>
                <Box display="flex" alignItems="center" margin={1}>
                    <GameIcons iconName='atk' />
                    <Typography variant="body2">7</Typography>
                    <Box marginLeft={1} marginRight={1}></Box>
                    <GameIcons iconName='range' />
                    <Typography variant="body2">1</Typography>
                    <Box marginLeft={1} marginRight={1}></Box>
                    <GameIcons iconName='dmg' />
                    <Typography variant="body2">3</Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

