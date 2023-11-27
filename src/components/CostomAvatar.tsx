import React, { FC } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

interface CustomAvatarProps {
    name: string
    imageUrl: string
}

const CustomAvatar: FC<CustomAvatarProps> = ({ name, imageUrl }) => {
    return (
        <Box position="relative" display="inline-block" overflow="hidden" borderRadius="50%">
            <Avatar alt="アイコン" src={imageUrl} />
            <Box
                style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "50%",
                }} />
        </Box>
    );
};

export default CustomAvatar;