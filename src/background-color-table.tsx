import * as React from 'react';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import { colorNames, ColorSet, colorSetTable } from './color-config';
import BackgroundColorItem from './background-color-item';

const BackgroundColorTable = ({ value, onClick }: { value: string, onClick: (event: ColorSet) => void }) => {
    return <div className="grid">
        {colorNames.map((name, index) =>
        <span
            style={{
                gridRowStart: index+1,
                display: 'flex',
                alignItems: 'center',
            }}
            key={name}
        >
            {name}
        </span>
        )}
        {colorSetTable.map((colorSet, index) => 
            <BackgroundColorItem
                colorSet={colorSet}
                key={`${colorSet.backgroundColorFullName}${index}`}
                onClick={onClick}
                value={value}
            />
        )}
    </div>
};

export default BackgroundColorTable;
