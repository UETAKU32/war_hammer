import React from 'react'

import { Card, CardContent, Typography, Avatar, LinearProgress, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ShieldIcon from '@mui/icons-material/Shield';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import ColorizeIcon from '@mui/icons-material/Colorize';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';


function FighterCard({ }) {


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
                    <Typography variant="h6">デュラハン</Typography>
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
                    <DirectionsRunIcon sx={{ color: 'blue' }} />
                    <Typography variant="body2">5</Typography>
                    <Box marginLeft={1} marginRight={1}></Box>
                    <ShieldIcon sx={{ color: 'green' }} />
                    <Typography variant="body2">5</Typography>
                    <Box marginLeft={1} marginRight={1}></Box>
                    <ElectricBoltIcon sx={{ color: 'Gold' }} />
                    <Typography variant="body2">2</Typography>
                </Box>
                <Box display="flex" alignItems="center" margin={2}>
                </Box>
                <Typography variant="body2">攻撃技:剣戟</Typography>
                <Box display="flex" alignItems="center" margin={1}>
                    <ColorizeIcon sx={{ color: 'red' }} />
                    <Typography variant="body2">7</Typography>
                    <Box marginLeft={1} marginRight={1}></Box>
                    <RssFeedIcon sx={{ color: 'Aqua' }} />
                    <Typography variant="body2">1</Typography>
                    <Box marginLeft={1} marginRight={1}></Box>
                    <HeartBrokenIcon sx={{ color: 'black' }} />
                    <Typography variant="body2">3</Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default FighterCard;