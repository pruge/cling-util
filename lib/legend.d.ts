import { Observable } from '@legendapp/state';
/**
 * syncedCrud 의 as 가 object 인 경우 key 로 찾기
 */
export declare const findByKey: <T>(obj: object, match: {
    [key: string]: string;
}) => T | undefined;
export declare const uniqueSetAdd: <T>(selector: Observable<Set<T>>, key: keyof T, value: T) => void;
export declare const uniqueMapAdd: <T>(selector: Observable<Map<string, T>>, key: keyof T, value: T) => void;
/**
 * data array list를 syncedCrud에 맞게 변환
 * as='object' 인 경우 사용
 */
export declare const transformArrToObj: (arr?: any[]) => {};
export declare function arrayUnique(arr1: any[] | undefined, arr2: any[] | undefined, key: string): any[];
export declare const arrayMerge: (a: any[] | undefined, b: any[] | undefined, p: string) => any[];
