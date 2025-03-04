import {Observable, ObservablePrimitive, Selector} from '@legendapp/state'
import {useObserveEffect} from '@legendapp/state/react'

/**
 * syncedCrud 의 as 가 object 인 경우 key 로 찾기
 */
export const findByKey = <T>(obj: object, match: {[key: string]: string}) => {
  if (!obj) return undefined
  for (const [k, v] of Object.entries(obj)) {
    let flg = true
    for (const [k2, v2] of Object.entries(match)) {
      if (v[k2] !== v2) {
        flg = false
        break
      }
    }
    if (flg) {
      return v as T
    }
  }
  return undefined
}

export const uniqueSetAdd = <T>(selector: Observable<Set<T>>, key: keyof T, value: T) => {
  const iter = selector.values()
  let isExist = false
  for (const item of iter) {
    isExist = item[key] === value[key] || isExist
    if (isExist) {
      selector.delete(item)
      selector.add({...item, ...value})
      break
    }
  }
  if (!isExist) {
    selector.add(value)
  }
}

export const uniqueMapAdd = <T>(selector: Observable<Map<string, T>>, key: keyof T, value: T) => {
  const _key = value[key] as unknown as string
  const item = selector.get(_key).get() ?? {}
  selector.set(_key, {...item, ...value})
}

/**
 * data array list를 syncedCrud에 맞게 변환
 * as='object' 인 경우 사용
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformArrToObj = (arr: any[] = []) => {
  return arr.map((item) => [item.id, item]).reduce((acc, [key, value]) => ({...acc, ...{[key as number]: value}}), {})
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function arrayUnique(arr1: any[] = [], arr2: any[] = [], key: string) {
  // [ ] 첫 번째 요소를 선택하는 것 뿐, merge 하지 않는다.
  // console.log('arrayUnique', arr1, arr2)
  const map = new Map([...arr1, ...arr2].map((obj) => [obj[key], obj]))
  const mergedArray = Array.from(map.values())
  return mergedArray
}

// https://stackoverflow.com/a/41919138/1502778
// export const arrayMerge = (a: any[] = [], b: any[] = [], p: string) =>
//   a.filter((aa) => !b.find((bb) => aa[p] === bb[p])).concat(b)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const arrayMerge = (a: any[] = [], b: any[] = [], p: string) => {
  const mergedArray = [...a]

  b.forEach((obj) => {
    const existingObj = mergedArray.find((item) => item[p] === obj[p])
    if (!existingObj) {
      mergedArray.push(obj)
    } else {
      // Merge properties if needed
      Object.assign(existingObj, obj)
    }
  })

  return mergedArray
}
