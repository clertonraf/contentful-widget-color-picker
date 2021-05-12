import * as React from 'react';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import {
  colorBaseBlack,
  colorBaseWhite,
  Heading,
} from '@issuu/silkscreen';
import { getColorSetFromHexCode } from './color-config';

const CardHeading = ({ value }: { value: string }) => {
    const currentColorSet = getColorSetFromHexCode(value);
    return <div
        className="heading"
        style={{
            backgroundColor: value,
            color: currentColorSet.inverted ? colorBaseWhite : colorBaseBlack,
        }}
    >
        <Heading step={0}>{currentColorSet.backgroundColorFullName} {value}</Heading>
    </div>
};

export default CardHeading;
