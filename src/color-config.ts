import * as silkscreen from '@issuu/silkscreen';

const colorBaseToken = 'colorBase';

export const colorNames = ['Orange', 'Indigo', 'Lime', 'Violet', 'Beige', 'Warm Grey', 'Cool Grey'].sort();

const inverted500 = ['Orange', 'Indigo'];

export const colorShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

export type ColorSet = {
    hexCode: string,
    backgroundColorName: string,
    backgroundColorFullName: string,
    inverted: boolean,
}

export const defaultColorSet: ColorSet = {
    hexCode: silkscreen.colorBaseBlack,
    backgroundColorName: 'Black',
    backgroundColorFullName: 'Black',
    inverted: true,
};

export const whiteColorSet: ColorSet = {
    hexCode: silkscreen.colorBaseWhite,
    backgroundColorName: 'White',
    backgroundColorFullName: 'White',
    inverted: false,
};


export const getColorSet = (backgroundColorName: string, backgroundColorShades: number): ColorSet => {
    const baseName = `${backgroundColorName.replace(' ', '')}${backgroundColorShades}`;
    const prop =`${colorBaseToken}${baseName}`;
    if(prop in silkscreen) {
        return {
            hexCode: silkscreen[prop as keyof typeof silkscreen] as string,
            backgroundColorName,
            backgroundColorFullName: `${backgroundColorName} ${backgroundColorShades}`,
            inverted: isInverted(backgroundColorName, backgroundColorShades),
        }
    }
    return defaultColorSet;
}

const isInverted = (backgroundColorName: string, backgroundColorShades: number) =>
    backgroundColorShades > 500 || (backgroundColorShades == 500 && inverted500.includes(backgroundColorName));

export const colorSetTable: ColorSet[] = colorNames.reduce((acc: ColorSet[], color) => {
    const bgColorShades = colorShades.map(shades => {
        const { hexCode, backgroundColorName, backgroundColorFullName, inverted } = getColorSet(color, shades);
        return {
            hexCode,
            backgroundColorName,
            backgroundColorFullName,
            inverted,
        }
    });
    return [...acc, ...bgColorShades]
}, []);

export const getColorSetFromHexCode = (hexCode: string): ColorSet => {
    if(hexCode === whiteColorSet.hexCode) {
        return whiteColorSet;
    }
    return colorSetTable.find(color => color.hexCode === hexCode) || defaultColorSet;
};
