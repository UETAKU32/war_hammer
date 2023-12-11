import React, { FC } from 'react'
import { CenterPoint } from '../types/CenterPoint';
import { HEXRadius } from './HoneyComb';

interface ActionIconProps {
    action: Action
    point: CenterPoint
}

type Action = "Attack" | "Move"

const iconSize: number = HEXRadius / 1.5

const ActionIcon: FC<ActionIconProps> = ({ action, point }) => {

    return (
        <image
            x={point.x - iconSize / 2}
            y={point.y - iconSize / 2}
            width={iconSize}
            height={iconSize}
            xlinkHref={`${process.env.PUBLIC_URL}/icons/${action}Action.png`}
            style={{ cursor: "pointer" }}
        />
    )
}

export default ActionIcon