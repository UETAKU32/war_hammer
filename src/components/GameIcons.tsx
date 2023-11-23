import React from 'react';

interface GameIconsProps {
    iconName: Icon;
}

type Icon = "agl" | "atk" | "dmg" | "range" | "def" | "sleep";

const GameIcons: React.FC<GameIconsProps> = ({ iconName }) => {
    const divStyle = {
        marginRight: '10px',
    };

    return (
        <div style={divStyle}>
            <img src={`/icons/${iconName}.png`} alt={`Icon for ${iconName}`} />
        </div>
    );
};

export const AglIcon = () => {
    return <GameIcons iconName='agl' />
}

export const AtkIcon: React.FC = () => {
    return <GameIcons iconName='atk' />;
};

export const DmgIcon: React.FC = () => {
    return <GameIcons iconName='dmg' />;
};

export const RangeIcon: React.FC = () => {
    return <GameIcons iconName='range' />;
};

export const DefIcon: React.FC = () => {
    return <GameIcons iconName='def' />;
};

export const SleepIcon: React.FC = () => {
    return <GameIcons iconName='sleep' />;
};
