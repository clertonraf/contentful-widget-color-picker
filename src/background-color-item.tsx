import * as React from 'react';
import './index.css';
import {
  colorBaseBlack,
  colorBaseWhite,
} from '@issuu/silkscreen';
import { ColorSet } from './color-config';

type BackgroundColorItemProps = {
    colorSet: ColorSet,
    onClick: (value: ColorSet) => void;
    value: string;
    extraStyle?: React.CSSProperties;
};

const BackgroundColorItem = ({ value, colorSet, onClick, extraStyle = {} }: BackgroundColorItemProps) => {
    return <span
      className="grid__item"
      style={{
        color: colorSet.inverted ? colorBaseWhite : colorBaseBlack,
        backgroundColor: colorSet.hexCode,
        ...extraStyle,
      }}
      aria-checked={value === colorSet.hexCode}
      role="checkbox"
      onClick={() => onClick(colorSet)}
    >{value === colorSet.hexCode ? '✔️' : 'Aa'}</span>
};

export default BackgroundColorItem;
