export function toMinutes(num) {
    let duration = num / 60000

    return ((duration.toFixed(2)).split('.').join(':'));
}
export function artistsString(arr) {
    let str = ''

    if (arr.length > 1) {
        arr.forEach((element, index) => {
            str += `${element.name}`
            if (index !== arr.length - 1) {
                str += ', ';
            }
        });
    } else {
        str = arr[0].name;
    }

    return str;
}
