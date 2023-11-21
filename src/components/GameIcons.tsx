import React from 'react';

interface GameIconsProps {
    iconName: string;
}

const GameIcons: React.FC<GameIconsProps> = ({ iconName }) => {
    let iconPath: string = '';

    const divStyle = {
        marginRight: '10px',
    };

    // iconNameに基づいて表示するアイコンを切り替える
    switch (iconName) {
        case 'agl':
            iconPath = '/icons/agl.png';
            break;
        case 'atk':
            iconPath = '/icons/atk.png';
            break;
        case 'dmg':
            iconPath = '/icons/dmg.png';
            break;
        case 'range':
            iconPath = '/icons/range.png';
            break;
        case 'def':
            iconPath = '/icons/def.png';
            break;
        case 'sleep':
            iconPath = '/icons/sleep.png';
            break;
        default:
            throw new Error('GameIconに種別のpropsが渡されていないです');

    }

    return (
        <div style={divStyle}>
            <img src={iconPath} alt={`Icon for ${iconName}`} />
        </div>
    );
};

export default GameIcons;