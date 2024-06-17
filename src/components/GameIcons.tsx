import { Typography, Box } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { Fighter } from '../types/fighter';

interface StatusProps {
    iconName: Icon;
    statusValue: number;
}

type Icon = "agl" | "atk" | "dmg" | "range" | "def" | "locked";

const Status: FC<StatusProps> = ({ iconName, statusValue }) => {
    const divStyle = {
        marginRight: '10px',
    };

    return (
        <div style={{ marginRight: `15px`, display: `flex`, alignItems: `center` }}>
            <div style={divStyle}>
                <img src={`${process.env.PUBLIC_URL}/icons/${iconName}.png`} alt={`Icon for ${iconName}`} />
            </div><Typography variant="body2">{statusValue}</Typography>
        </div>
    );
};

export const AglStatus: FC<{ fighter: Pick<Fighter, "agl"> }> = ({ fighter: { agl } }) => {
    return <Status iconName='agl' statusValue={agl} />
}

export const AtkStatus: FC<{ fighter: Pick<Fighter, "move"> }> = ({ fighter: { move } }) => {
    return <Status iconName='atk' statusValue={move.atk} />;
};

export const DmgStatus: FC<{ fighter: Pick<Fighter, "move"> }> = ({ fighter: { move } }) => {
    return <Status iconName='dmg' statusValue={move.dmg} />;
};

export const RangeStatus: FC<{ fighter: Pick<Fighter, "move"> }> = ({ fighter: { move } }) => {
    return <Status iconName='range' statusValue={move.range} />;
};

export const DefStatus: FC<{ fighter: Pick<Fighter, "def"> }> = ({ fighter: { def } }) => {
    return <Status iconName='def' statusValue={def} />;
};

export const LockedStatus: FC<{ fighter: Pick<Fighter, "locked"> }> = ({ fighter: { locked } }) => {
    return <Status iconName='locked' statusValue={locked} />;
};

export const StatusContainer: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Box display="flex" alignItems="center" margin={1}>{children}</Box>
    )
}