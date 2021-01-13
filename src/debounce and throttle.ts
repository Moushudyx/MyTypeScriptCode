/**
 * 防抖函数, 防止用户在短时间内触发次数太多
 * @param handler 需要执行的方法
 * @param threshold 防抖阈值
 * @param _arguments 传给方法的参数
 */
let debounce: (handler: Function, threshold?: number, _arguments?: Array<any>) => void
// 防抖函数的简单实现, 必定执行最后一次操作, 但是不会立即响应
debounce = function (handler: Function, threshold: number = 300, _arguments?: Array<any>) {
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
 * @param threshold 节流阈值
 * @param _arguments 传给方法的参数
 */
let throttle: (handler: Function, threshold?: number, _arguments?: Array<any>) => void
// 节流函数的简单实现, 立即响应, 但是不一定执行最后一次操作
throttle = function (handler: Function, threshold: number = 300, _arguments?: Array<any>) {
    let last: number | undefined
    return function () {
        let now = new Date().getTime()
        if (now - (last || 0) > threshold) {
            last = now
            if (_arguments) { handler(..._arguments) } else { handler() }
        }
    }
}
