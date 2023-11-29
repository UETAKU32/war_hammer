import React, { FC } from 'react';
import Box from '@mui/material/Box';

interface CustomAvatarProps {
    name: string
    imageUrl: string
}

const backgroundImage: string = `${process.env.PUBLIC_URL}/icons/iconBackground.png`
const IconFlameUrl: string = `${process.env.PUBLIC_URL}/icons/iconFlame.png`
const iconSize: number = 60;

const CustomAvatar: FC<CustomAvatarProps> = ({ name, imageUrl }) => {
    return (
        <Box
            style={{
                width: `${iconSize}px`,
                height: `${iconSize}px`,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '4px', // 任意の角丸のサイズ
            }}
        >
            <img
                src={IconFlameUrl}
                alt="IconFlame"
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    objectFit: 'cover',
                    zIndex: 3,
                }}
            />
            <img
                src={imageUrl}
                alt="Avatar"
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    objectFit: 'cover',
                    borderRadius: '2px', // 任意の角丸のサイズ
                    zIndex: 2,
                }}
            />
            <img
                src={backgroundImage}
                alt="BackgroundImage"
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    objectFit: 'cover',
                    zIndex: 1,
                }}
            />
        </Box>
    );
};

export default CustomAvatar;