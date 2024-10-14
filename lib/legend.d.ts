/// <reference types="jest" />
import { Selector } from '@legendapp/state';
/**
 * syncedCrud 의 as 가 object 인 경우 key 로 찾기
 */
export declare const findByKey: <T>(obj: object, key: string, value: string) => T | undefined;
/**
 * data array list를 syncedCrud에 맞게 변환
 * as='object' 인 경우 사용
 */
export declare const transformArrToObj: (arr?: any[]) => {};
export declare function arrayUnique(arr1: any[] | undefined, arr2: any[] | undefined, key: string): any[];
export declare const arrayMerge: (a: any[] | undefined, b: any[] | undefined, p: string) => any[];
/**
 * sync state
 * https://legendapp.com/open-source/state/v3/sync/persist-sync/#syncstate
 */
export declare const useSyncState: <T>(selector: Selector<T>, action: boolean, callback: {
    success: () => void;
    fail: () => void;
}) => void;
