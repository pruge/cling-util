"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValue = exports.isEmpty = exports.generateUrl = exports.isEqualObject = exports.omit = exports.pick = exports.arraySortByKey = exports.toCapitalize = exports.isMobileUserAgent = exports.cn = void 0;
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
function cn(...inputs) {
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
exports.cn = cn;
/**
 * server component에서 사용 가능
 *
 * const headersList = headers()
 * const isMobile = isMobileUserAgent(headersList.get('user-agent') ?? '')
 */
function isMobileUserAgent(userAgent) {
    return /iPhone|iPad|iPod|Android/i.test(userAgent);
}
exports.isMobileUserAgent = isMobileUserAgent;
function toCapitalize(input) {
    input = input.replace(/-/g, ' ');
    if (typeof input !== 'string' || input.length === 0) {
        return '';
    }
    return input.charAt(0).toUpperCase() + input.slice(1);
}
exports.toCapitalize = toCapitalize;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const arraySortByKey = (arr: any[], key: string, direction: 'asc' | 'desc' = 'asc') => {
//   return arr.sort((a, b) => {
//     if (a[key] < b[key]) {
//       return direction === 'asc' ? -1 : 1
//     }
//     if (a[key] > b[key]) {
//       return direction === 'asc' ? 1 : -1
//     }
//     return 0
//   })
// }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const arraySortByKey = (arr, options) => {
    const standard = {};
    for (const key in options) {
        standard[key] = options[key] === 'asc' ? -1 : 1;
    }
    return arr.sort((a, b) => {
        for (const key in standard) {
            const first = a[key];
            const second = b[key];
            if (first !== second) {
                return standard[key] * (first < second ? 1 : -1);
            }
        }
        return 0;
    });
};
exports.arraySortByKey = arraySortByKey;
const pick = (obj, ...props) => {
    return props.reduce(function (result, prop) {
        result[prop] = obj[prop];
        return result;
    }, {});
};
exports.pick = pick;
const omit = (obj, ...props) => {
    const result = Object.assign({}, obj);
    props.forEach(function (prop) {
        delete result[prop];
    });
    return result;
};
exports.omit = omit;
const isEqualObject = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
};
exports.isEqualObject = isEqualObject;
const generateUrl = (path, query = {}) => {
    const url = new URL(path, window.location.origin);
    for (const [key, value] of Object.entries(query)) {
        url.searchParams.set(key, value);
    }
    return '/' + url.toString().split('/').slice(3).join('/');
};
exports.generateUrl = generateUrl;
/**
 * isEmpty
 */
const isEmpty = (value) => {
    if (value === null || value === undefined)
        return true;
    if (typeof value === 'string')
        return value.trim() === '';
    if (Array.isArray(value))
        return value.length === 0;
    if (typeof value === 'object')
        return Object.keys(value).length === 0;
    return false;
};
exports.isEmpty = isEmpty;
/**
 * getValue with default
 */
const getValue = (value, defaultValue) => {
    if ((0, exports.isEmpty)(value))
        return defaultValue;
    return value;
};
exports.getValue = getValue;
