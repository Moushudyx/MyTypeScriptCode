// 一个支持IE的懒加载实现
// 编译时请选用ES5
interface HTMLElement {
    offset: () => { top: number, left: number }
}
(function () {
    /**图片的URL, 可能是 data-url、data-src、file之类的 */
    var lazyAttr = 'lazy-src'
    /**你打算从哪个部分获取需要懒加载的元素 */
    var app = document
    /**CSS选择器 */
    var mySelector = 'img[' + lazyAttr + ']'
    /**默认的图片URL */
    var defaultPicURL = ''
    /**主要处理部分 */
    function handler() {
        var imgs = app.querySelectorAll(mySelector)
        var elems: Array<Element | undefined> = []
        // console.log(imgs);
        for (var i = 0; i < imgs.length; i++) {
            var img = imgs[i]
            img.setAttribute('src', defaultPicURL)
            elems.push(img)
        }
        window.addEventListener('scroll', throttledAndDebounce(load, 500))
        /**触发后检查一轮 */
        function load() {
            for (var i = 0; i < elems.length; i++) {
                var img = elems[i]
                if (!img) { continue }
                if (img.getBoundingClientRect().top <= document.documentElement.clientHeight) {
                    img.setAttribute('src', img.getAttribute(lazyAttr) || defaultPicURL)
                    elems[i] = undefined
                }
            }
            reflash()
        }
        /**更新图片列表 */
        function reflash() {
            var x: Element[] = []
            for (var i = 0; i < elems.length; i++) {
                var img = elems[i]
                if (typeof img != 'undefined') { x.push(img) }
            }
        }
    }
    function throttledAndDebounce(handler: Function, threshold?: number, _arguments?: Array<any>) {
        var last: number | undefined
        var timeout: number | undefined
        threshold = threshold || 300;
        return function () {
            var now = new Date().getTime()
            var timeDiff = now - (last || 0)
            if (timeDiff > (threshold || 300)) {
                last = now
                clearTimeout(timeout)
                handler()
            } else {
                clearTimeout(timeout)
                timeout = setTimeout(function () {
                    handler()
                }, timeDiff)
            }
        }
    }
    document.readyState == 'loading' ? window.addEventListener('DOMContentLoaded', handler) : handler()
})()