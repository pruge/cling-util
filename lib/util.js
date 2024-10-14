"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCapitalize = exports.isMobileUserAgent = exports.cn = void 0;
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
