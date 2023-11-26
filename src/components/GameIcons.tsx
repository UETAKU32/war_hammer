import { Typography, Box } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { Fighter } from '../types/fighter';
import { margin } from '@mui/system';

interface StatusProps {
    iconName: Icon;
    statusValue: number;
}

type Icon = "agl" | "atk" | "dmg" | "range" | "def" | "sleep";

const Status: FC<StatusProps> = ({ iconName, statusValue }) => {
    const divStyle = {
        marginRight: '10px',
    };

    return (
        <div style={{ marginRight: `20px`, display: `flex`, alignItems: `center` }}>
            <div style={divStyle}>
                <img src={`/icons/${iconName}.png`} alt={`Icon for ${iconName}`} />
            </div><Typography variant="body2">{statusValue}</Typography>
        </div>
    );
};

export const AglStatus: FC<{ fighter: Pick<Fighter, "currentHp"> }> = ({ fighter: { currentHp } }) => {
    return <Status iconName='agl' statusValue={currentHp} />
}

export const AtkStatus: FC<{ fighter: Pick<Fighter, "currentHp"> }> = ({ fighter: { currentHp } }) => {
    return <Status iconName='atk' statusValue={currentHp} />;
};

export const DmgStatus: FC<{ fighter: Pick<Fighter, "currentHp"> }> = ({ fighter: { currentHp } }) => {
    return <Status iconName='dmg' statusValue={currentHp} />;
};

export const RangeStatus: FC<{ fighter: Pick<Fighter, "currentHp"> }> = ({ fighter: { currentHp } }) => {
    return <Status iconName='range' statusValue={currentHp} />;
};

export const DefStatus: FC<{ fighter: Pick<Fighter, "currentHp"> }> = ({ fighter: { currentHp } }) => {
    return <Status iconName='def' statusValue={currentHp} />;
};

export const SleepStatus: FC<{ fighter: Pick<Fighter, "currentHp"> }> = ({ fighter: { currentHp } }) => {
    return <Status iconName='sleep' statusValue={currentHp} />;
};

export const StatusContainer: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Box display="flex" alignItems="center" margin={1}>{children}</Box>
    )
}