export function objSort(arr?: any, id?: any) {
    const args: any = arguments;
    const array = args[0];
    let caseSensitive: any;
    let keysLength: any;
    let key;
    let desc;
    let a;
    let b;
    let i;

    if (typeof arguments[arguments.length - 1] === 'boolean') {
        caseSensitive = arguments[arguments.length - 1];
        keysLength = arguments.length - 1;
    } else {
        caseSensitive = false;
        keysLength = arguments.length;
    }

    return array.sort((obj1: any, obj2: any) => {
        for (i = 1; i < keysLength; i++) {
            key = args[i];
            if (typeof key !== 'string') {
                desc = key[1];
                key = key[0];
                a = obj1[args[i][0]];
                b = obj2[args[i][0]];
            } else {
                desc = false;
                a = obj1[args[i]];
                b = obj2[args[i]];
            }

            if (caseSensitive === false && typeof a === 'string' && typeof b === 'string') {
                a = a.toLowerCase();
                b = b.toLowerCase();
            }

            if (typeof a === 'object') {
                if (a !== null && a.hasOwnProperty('value')) {
                    a = a.value.value.toLowerCase();
                    b = b.value.value.toLowerCase();
                }
            }

            if (!desc) {
                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
                if (a === b) {
                    return 0;
                }
                if (a === null) {
                    return 1;
                }
                if (b === null) {
                    return -1;
                }
            } else {
                if (a > b) {
                    return -1;
                }
                if (a < b) {
                    return 1;
                }
                if (a === b) {
                    return 0;
                }
                if (a === null) {
                    return 1;
                }
                if (b === null) {
                    return -1;
                }
            }
        }

        return 0;
    });
}
