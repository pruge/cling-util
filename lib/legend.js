"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSyncState = exports.arrayMerge = exports.arrayUnique = exports.transformArrToObj = exports.findByKey = void 0;
const react_1 = require("@legendapp/state/react");
/**
 * syncedCrud 의 as 가 object 인 경우 key 로 찾기
 */
const findByKey = (obj, key, value) => {
    for (const [k, v] of Object.entries(obj)) {
        // console.log('k, v', k, v)
        if (v[key] === value) {
            return v;
        }
    }
    return undefined;
};
exports.findByKey = findByKey;
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
const useSyncState = (selector, action, callback) => {
    (0, react_1.useObserveEffect)(selector, (state) => {
        if (!action)
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
