import React from "react";
import { colorBaseBlack, colorBaseWhite, Paragraph } from "@issuu/silkscreen";
import './index.css';
import BackgroundColorItem from "./background-color-item";
import { ColorSet, defaultColorSet, whiteColorSet } from "./color-config";

const BackgroundColorTableBase = ({ value, onClick }: { onClick: (value: ColorSet) => void, value: string }) => {
    return <div>
        <div className="grid">
            <span><Paragraph>{defaultColorSet.backgroundColorFullName}</Paragraph></span>
            <BackgroundColorItem
                colorSet={defaultColorSet}
                onClick={onClick}
                value={value}
            />
        </div>
        <div className="grid">
            <span><Paragraph>{whiteColorSet.backgroundColorFullName}</Paragraph></span>
            <BackgroundColorItem
                colorSet={whiteColorSet}
                onClick={onClick}
                value={value}
                extraStyle={{ border: '1px solid black' }}
            />
        </div>
    </div>
};

export default BackgroundColorTableBase;
