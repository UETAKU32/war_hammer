import { FC } from 'react'
import { CenterPoint } from '../types/CenterPoint';
import { hexWidth } from '../lib/hexSize';
import { useGameInfo } from '../hooks/useGameInfo';

interface ActionIconProps {
    action: Action;
    point: CenterPoint;
    selected: boolean;
    onClick?: () => void;
    isLocked: boolean;
}

type Action = "Attack" | "Move" | "Guard"

const iconSize: number = hexWidth / 3;
const lockedIconSize: number = hexWidth / 3;

const ActionIcon: FC<ActionIconProps> = ({ action, point, selected, onClick, isLocked }) => {
    return (
        <>
            <image
                x={point.x - iconSize / 2}
                y={point.y - iconSize / 2}
                width={iconSize}
                height={iconSize}
                xlinkHref={`${process.env.PUBLIC_URL}/icons/${action}Action.png`}
                style={{ cursor: "pointer" }}
                onClick={onClick}
                opacity={selected ? 1 : 0.6}
            />
            {(isLocked && action != "Guard") && <image
                x={point.x - lockedIconSize / 2}
                y={point.y - lockedIconSize / 2}
                width={lockedIconSize}
                height={lockedIconSize}
                xlinkHref={`${process.env.PUBLIC_URL}/icons/Lock.png`}
                style={{ cursor: "pointer" }}
            />}
        </>
    )
}

export const AttackIcon: FC<Pick<ActionIconProps, "point" | "onClick" | "isLocked">> = ({ point, onClick, isLocked }) => {
    const { phase } = useGameInfo();
    const selected = (phase === "SELECT_ATTACK" || phase === "CONFIRM_ATTACK");
    return <ActionIcon action={'Attack'} point={point} selected={selected} onClick={onClick} isLocked={isLocked} />
}

export const MoveIcon: FC<Pick<ActionIconProps, "point" | "onClick" | "isLocked">> = ({ point, onClick, isLocked }) => {
    const { phase } = useGameInfo();
    const selected = (phase === "SELECT_MOVE" || phase === "CONFIRM_MOVE");
    return <ActionIcon action={'Move'} point={point} selected={selected} onClick={onClick} isLocked={isLocked} />
}

export const GuardIcon: FC<Pick<ActionIconProps, "point" | "onClick" | "isLocked">> = ({ point, onClick, isLocked }) => {
    const { phase } = useGameInfo();
    const selected = false;
    return <ActionIcon action={`Guard`} point={point} selected={selected} onClick={onClick} isLocked={isLocked} />
}
