const {OrderedMap, Map} = require('immutable');

class Tools {
    // ============================== RANDOM ID =============================================
    randomString(length: number, chars: string) {
        let mask = '';

        if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
        if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (chars.indexOf('#') > -1) mask += '0123456789';
        if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';

        let result = '';

        for (let i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
            return result;
    }

    randomStr(length: number) {
        return this.randomString(length, "a#");
    }

    // ============================== ARR TO MAP =============================================
    arrToMap(arr, DataRecord = Map) {
        return arr.reduce((acc, item) => acc.set(item.id, new DataRecord(item)), new OrderedMap({}));
    }

    // ============================== MAP TO ARR =============================================
    mapToArr(map) {
        return map.valueSeq().toArray();
    }
}

export const tools = new Tools();
