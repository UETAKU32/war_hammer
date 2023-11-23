import LinearProgress, {
    linearProgressClasses
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { FC } from 'react';
import { Fighter } from '../types/fighter';

// HPバーの状態
type HPBarClass = 'green' | 'yellow' | 'red';

// Propsの型定義
type HPBarProps = {
    fighter: Pick<Fighter, "maxHp" | "currentHp">
};

const HpBar: FC<HPBarProps> = ({ fighter: { maxHp, currentHp } }) => {

    // HPの割合を計算
    const hpPercentage: number = (currentHp / maxHp) * 100;

    // HPに応じて適切なクラスを適用する
    let hpBarColor: HPBarClass = 'green';
    if (hpPercentage <= 50) hpBarColor = "yellow";
    if (hpPercentage <= 20) hpBarColor = "red";

    const StyledLinearProgress = styled(LinearProgress)({
        backgroundColor: `black`,
    });

    return (
        <StyledLinearProgress variant="determinate" value={hpPercentage} sx={{
            [`& .${linearProgressClasses.bar}`]: {
                backgroundColor: hpBarColor
            },
        }} />
    );
};

export default HpBar;