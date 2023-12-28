import React, { FC } from 'react'
import { CenterPoint } from '../types/CenterPoint';
import { hexWidth } from '../lib/hexSize';
import { useGameInfo } from '../hooks/useGameInfo';

interface ActionIconProps {
    action: Action;
    point: CenterPoint;
    selected: boolean;
    onClick?: () => void;
}

type Action = "Attack" | "Move"

const iconSize: number = hexWidth / 3

const ActionIcon: FC<ActionIconProps> = ({ action, point, selected, onClick }) => {
    return (
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
    )
}

export const AttackIcon: FC<Pick<ActionIconProps, "point" | "onClick">> = ({ point, onClick }) => {
    const { phase } = useGameInfo();
    const selected = phase === "SELECT_ATTACK";
    return <ActionIcon action={'Attack'} point={point} selected={selected} onClick={onClick} />
}

export const MoveIcon: FC<Pick<ActionIconProps, "point" | "onClick">> = ({ point, onClick }) => {
    const { phase } = useGameInfo();
    const selected = phase === "SELECT_MOVE";
    return <ActionIcon action={'Move'} point={point} selected={selected} onClick={onClick} />
}

