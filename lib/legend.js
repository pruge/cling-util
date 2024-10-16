"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSyncState = exports.arrayMerge = exports.arrayUnique = exports.transformArrToObj = exports.uniqueMapAdd = exports.uniqueSetAdd = exports.findByKey = void 0;
const react_1 = require("@legendapp/state/react");
/**
 * syncedCrud 의 as 가 object 인 경우 key 로 찾기
 */
const findByKey = (obj, match) => {
    if (!obj)
        return undefined;
    for (const [k, v] of Object.entries(obj)) {
        let flg = true;
        for (const [k2, v2] of Object.entries(match)) {
            if (v[k2] !== v2) {
                flg = false;
                break;
            }
        }
        if (flg) {
            return v;
        }
    }
    return undefined;
};
exports.findByKey = findByKey;
const uniqueSetAdd = (selector, key, value) => {
    const iter = selector.values();
    let isExist = false;
    for (const item of iter) {
        isExist = item[key] === value[key] || isExist;
        if (isExist) {
            selector.delete(item);
            selector.add(Object.assign(Object.assign({}, item), value));
            break;
        }
    }
    if (!isExist) {
        selector.add(value);
    }
};
exports.uniqueSetAdd = uniqueSetAdd;
const uniqueMapAdd = (selector, key, value) => {
    var _a;
    const _key = value[key];
    const item = (_a = selector.get(_key).get()) !== null && _a !== void 0 ? _a : {};
    selector.set(_key, Object.assign(Object.assign({}, item), value));
};
exports.uniqueMapAdd = uniqueMapAdd;
/**
 * data array list를 syncedCrud에 맞게 변환
 * as='object' 인 경우 사용
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformArrToObj = (arr = []) => {
    return arr.map((item) => [item.id, item]).reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), { [key]: value })), {});
};
exports.transformArrToObj = transformArrToObj;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function arrayUnique(arr1 = [], arr2 = [], key) {
    // [ ] 첫 번째 요소를 선택하는 것 뿐, merge 하지 않는다.
    // console.log('arrayUnique', arr1, arr2)
    const map = new Map([...arr1, ...arr2].map((obj) => [obj[key], obj]));
    const mergedArray = Array.from(map.values());
    return mergedArray;
}
exports.arrayUnique = arrayUnique;
// https://stackoverflow.com/a/41919138/1502778
// export const arrayMerge = (a: any[] = [], b: any[] = [], p: string) =>
//   a.filter((aa) => !b.find((bb) => aa[p] === bb[p])).concat(b)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const arrayMerge = (a = [], b = [], p) => {
    const mergedArray = [...a];
    b.forEach((obj) => {
        const existingObj = mergedArray.find((item) => item[p] === obj[p]);
        if (!existingObj) {
            mergedArray.push(obj);
        }
        else {
            // Merge properties if needed
            Object.assign(existingObj, obj);
        }
    });
    return mergedArray;
};
exports.arrayMerge = arrayMerge;
/**
 * sync state
 * https://legendapp.com/open-source/state/v3/sync/persist-sync/#syncstate
 */
const useSyncState = (selector, check, callback) => {
    (0, react_1.useObserveEffect)(selector, (state) => {
        // console.log('selector', !action, !state.previous, !state.value, !state.value?.isLoaded, state)
        if (!check())
            return;
        if (!state.previous)
            return;
        if (!state.value)
            return;
        const { error, isLoaded } = state.value;
        if (!isLoaded)
            return;
        if (!error) {
            callback.success();
        }
        else {
            callback.fail();
        }
    });
};
exports.useSyncState = useSyncState;
