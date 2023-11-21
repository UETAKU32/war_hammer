import LinearProgress, {
    linearProgressClasses
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { FC } from 'react';

// HPバーの状態
type HPBarClass = 'green' | 'yellow' | 'red';

// Propsの型定義
type PokemonHPBarProps = {
    value: number; // 現在のHP
    max: number; // 最大HP
};

const PokemonHPBar: FC<PokemonHPBarProps> = ({ value, max }) => {

    // HPの割合を計算
    const hpPercentage: number = (value / max) * 100;

    // HPに応じて適切なクラスを適用する
    let hpBarColor: HPBarClass = 'green';
    if (hpPercentage > 50) {
        hpBarColor = 'green';
    } else if (hpPercentage > 20) {
        hpBarColor = 'yellow';
    } else {
        hpBarColor = 'red';
    }

    const HPBar = styled(LinearProgress)({
        backgroundColor: `black`,
    });

    return (
        <HPBar variant="determinate" value={hpPercentage} sx={{
            [`& .${linearProgressClasses.bar}`]: {
                backgroundColor: hpBarColor
            },
        }} />
    );
};

export default PokemonHPBar;