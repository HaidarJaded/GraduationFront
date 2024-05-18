export function getEnum(enumData, filter = null) {
    let myEnum = [];
    const objectEnum = Object.keys(enumData);


    for (let i = 0; i < objectEnum.length; i++) {
        const key = objectEnum[i];
        const value = enumData[key];

        myEnum.push({
            title: key,
            value: value,
        });
    }
    if (filter) {
        myEnum = myEnum.filter((item) => item.title.toLowerCase().includes(filter.slice(0, 5).toLowerCase()));
    }

    console.log(myEnum);
    return myEnum;
}

function getTitleEnumItem(value) {
    if (value) {
        const removeUnderscore = value.split('_').join(' ');
        return removeUnderscore.charAt(0).toUpperCase() + removeUnderscore.slice(1).toLowerCase();
    }
    return '';
}

export function getEnumValueByEnumKey(_enum, key) {
    let keys = Object.keys(_enum);
    let values = Object.values(_enum);
    for (let i = 0; i < keys.length; i++) {
        if (key === keys[i]) {
            return values[keys.length / 2 + i]
        }
    }
    return -1;
}
