import React, { FC } from 'react'

import { Card, CardContent, Typography, Box } from '@mui/material';
import { Fighter } from '../types/fighter';
import { AglStatus, AtkStatus, DefStatus, DmgStatus, RangeStatus, LockedStatus, StatusContainer } from './GameIcons';
import HpBar from './HpBar';
import CustomAvatar from './CostomAvatar';
import { PlayerId } from '../types/Player';
import { useGameInfo } from '../hooks/useGameInfo';


type FighterCardProps = {
    teamName: PlayerId
    fighter: Fighter
}


export const FighterCard: FC<FighterCardProps> = ({ teamName, fighter }) => {

    const { selectedFighter, setSelectedFighter, phase } = useGameInfo();

    const teamColor: string = (selectedFighter?.id === fighter.id) ? teamName === "A" ? `#FF9999, #CD5C5C` : `#99CCFF, #5C85CD` : teamName === "A" ? `#FF0000, #8B0000` : `#4287f5, #0a2f6c`
    const imageUrl: string = `${process.env.PUBLIC_URL}/icons/${fighter.image}`;
    const handleClick = () => {
        if (phase === "SELECT_FIGHTER") {
            setSelectedFighter(fighter);
        }
    }

    return (
        <Card
            style={{
                marginBottom: 25,
                position: 'relative',
                border: '4px solid transparent', // 境界線スタイル
                borderColor: `rgba(0, 0, 0, 0.7)`,
                borderRadius: '4px', // 角丸
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)', // 影
                background: `linear-gradient(135deg,${teamColor})`,
                opacity: `0.85`,
            }}
        >
            <CardContent
                sx={{ backgroundColor: 'rgba(0, 0, 0, 0.2);' }}
                onClick={handleClick}>
                <Box display="flex" alignItems="center" margin={1}>
                    <CustomAvatar name={fighter.name} imageUrl={imageUrl} />
                    <Box marginRight={1}></Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" marginBottom={2}>{fighter.name}</Typography>
                        <Box sx={{ textAlign: 'right' }} >
                            <Typography variant="body2">{fighter.currentHp}/{fighter.maxHp}</Typography>
                        </Box>
                    </Box>
                </Box>
                <HpBar fighter={fighter} />
                <Box display="flex" alignItems="center" margin={2}>
                </Box>
                <StatusContainer>
                    <AglStatus fighter={fighter} />
                    <DefStatus fighter={fighter} />
                    <LockedStatus fighter={fighter} />
                </StatusContainer>
                <Typography variant="body1">攻撃技:{fighter.move.name}</Typography>
                <StatusContainer>
                    <AtkStatus fighter={fighter} />
                    <RangeStatus fighter={fighter} />
                    <DmgStatus fighter={fighter} />
                </StatusContainer>
                <img
                    src={`${process.env.PUBLIC_URL}/UI/FighterFlame.png`}
                    alt="Flame"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0.6,
                    }}
                />
            </CardContent>
        </Card>
    );
}

