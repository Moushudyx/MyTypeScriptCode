/**
 * 防抖函数, 防止用户在短时间内触发次数太多
 * @param handler 需要执行的方法
 * @param threshold 防抖阈值, 单位ms
 * @param _arguments 传给方法的参数
 */
let debounce: (handler: Function, threshold?: number, _arguments?: Array<any>) => void
// 防抖函数的简单实现, 必定执行最后一次操作, 但是不会立即响应
debounce = function (handler, threshold = 300, _arguments) {
    let timeout: number | undefined
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            if (_arguments) { handler(..._arguments) } else { handler() }
        }, threshold)
    }
}
/**
 * 节流函数, 防止用户在短时间内触发次数太多
 * @param handler 需要执行的方法
 * @param threshold 节流阈值, 单位ms
 * @param _arguments 传给方法的参数
 */
let throttle: (handler: Function, threshold?: number, _arguments?: Array<any>) => void
// 节流函数的简单实现, 立即响应, 但是不一定执行最后一次操作
throttle = function (handler, threshold = 300, _arguments) {
    let last: number | undefined
    return function () {
        let now = new Date().getTime()
        if (now - (last || 0) > threshold) {
            last = now
            if (_arguments) { handler(..._arguments) } else { handler() }
        }
    }
}
/**
 * 统一的节流防抖函数, 防止用户在短时间内触发次数太多
 * @param handler 需要执行的方法
 * @param threshold 节流与防抖的阈值, 单位ms
 * @param _arguments 传给方法的参数
 */
let throttledAndDebounce: (handler: Function, threshold?: number, _arguments?: Array<any>) => void
// 节流防抖函数的简单实现, 立即响应, 且必定执行最后一次操作
throttledAndDebounce = function (handler, threshold = 300, _arguments) {
    let last: number | undefined
    let timeout: number | undefined
    return function () {
        let now = new Date().getTime()
        let timeDiff = now - (last || 0)
        if (timeDiff > threshold) {
            last = now
            clearTimeout(timeout)
            if (_arguments) { handler(..._arguments) } else { handler() }
        } else {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                if (_arguments) { handler(..._arguments) } else { handler() }
            }, timeDiff)
        }
    }
}
/**
 * 统一的节流防抖函数, 防止用户在短时间内触发次数太多
 * 
 * 默认在阈值的一半时间后再次触发, 视为需要执行的最后一次操作
 * 
 * 若阈值为1000, 二次触发阈值为0.5, 用户两次触发时间间隔大于500时, handler将执行两次
 * @param handler 需要执行的方法
 * @param threshold 节流与防抖的阈值, 单位ms
 * @param _arguments 传给方法的参数
 * @param nextStepThreshold 在冷却期内什么时候再次触发, 视为需要执行的最后一次操作, 小数表示, 默认 0.5 即 50%
 */
let throttledAndDebouncePlus: (handler: Function, threshold?: number, _arguments?: Array<any>, nextStepThreshold?: number) => void
// 节流防抖函数的复杂实现, 立即响应, 在触发时间间隔较长时必定执行最后一次操作
throttledAndDebouncePlus = function (handler, threshold = 300, _arguments, nextStepThreshold = 0.5) {
    let last: number | undefined
    let timeout: number | undefined
    /**判定为有效的下一次操作时间间隔 */
    let nextThreshold = threshold * nextStepThreshold
    return function () {
        let now = new Date().getTime()
        let timeDiff = now - (last || 0)
        if (timeDiff > threshold) {
            last = now
            clearTimeout(timeout)
            if (_arguments) { handler(..._arguments) } else { handler() }
        } else if (timeDiff > nextThreshold) {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                if (_arguments) { handler(..._arguments) } else { handler() }
            }, timeDiff)
        }
    }
}
