import React, { FC } from 'react'
import { CenterPoint } from '../types/CenterPoint';
import { hexWidth } from '../lib/hexSize';

interface ActionIconProps {
    action: Action
    point: CenterPoint
    onClick?: () => void
}

type Action = "Attack" | "Move"

const iconSize: number = hexWidth / 3

const ActionIcon: FC<ActionIconProps> = ({ action, point, onClick }) => {

    return (
        <image
            x={point.x - iconSize / 2}
            y={point.y - iconSize / 2}
            width={iconSize}
            height={iconSize}
            xlinkHref={`${process.env.PUBLIC_URL}/icons/${action}Action.png`}
            style={{ cursor: "pointer" }}
            onClick={onClick}
        />
    )
}

export default ActionIcon