import { Typography } from '@mui/material';
import { FC } from 'react';
import { Fighter } from '../types/fighter';

interface StatusInfoProps {
    iconName: Icon;
    statusValue: number;
}

type Icon = "agl" | "atk" | "dmg" | "range" | "def" | "sleep";

const StatusInfo: FC<StatusInfoProps> = ({ iconName, statusValue }) => {
    const divStyle = {
        marginRight: '10px',
    };

    return (
        <>
            <div style={divStyle}>
                <img src={`/icons/${iconName}.png`} alt={`Icon for ${iconName}`} />
            </div><Typography variant="body2">{statusValue}</Typography>
        </>
    );
};

export const AglStatus: FC<{ fighter: Pick<Fighter, "currentHp"> }> = ({ fighter: { currentHp } }) => {
    return <StatusInfo iconName='agl' statusValue={currentHp} />
}

export const AtkStatus: FC<{ fighter: Pick<Fighter, "currentHp"> }> = ({ fighter: { currentHp } }) => {
    return <StatusInfo iconName='atk' statusValue={currentHp} />;
};

export const DmgStatus: FC<{ fighter: Pick<Fighter, "currentHp"> }> = ({ fighter: { currentHp } }) => {
    return <StatusInfo iconName='dmg' statusValue={currentHp} />;
};

export const RangeStatus: FC<{ fighter: Pick<Fighter, "currentHp"> }> = ({ fighter: { currentHp } }) => {
    return <StatusInfo iconName='range' statusValue={currentHp} />;
};

export const DefStatus: FC<{ fighter: Pick<Fighter, "currentHp"> }> = ({ fighter: { currentHp } }) => {
    return <StatusInfo iconName='def' statusValue={currentHp} />;
};

export const Status: FC<{ fighter: Pick<Fighter, "currentHp"> }> = ({ fighter: { currentHp } }) => {
    return <StatusInfo iconName='sleep' statusValue={currentHp} />;
};
