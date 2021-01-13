// 一个现代化的懒加载实现
(function () {
    /**图片的URL, 可能是 data-url、data-src、file之类的 */
    const lazyAttr = 'lazy-src'
    /**你打算从哪个部分获取需要懒加载的元素 */
    const app = document
    /**CSS选择器 */
    const mySelector = 'img[' + lazyAttr + ']'
    /**默认的图片URL */
    const defaultPicURL = ''
    /**主要处理部分 */
    function handler() {
        let imgs = Array.from(app.querySelectorAll(mySelector))
        // console.log(imgs);
        let obs = new IntersectionObserver((entries) => { // 构建监视器, 监视 img 元素是否出现在可视区域
            let img = entries[0].target
            img.setAttribute('src', img.getAttribute(lazyAttr) || defaultPicURL)
            obs.unobserve(img) // 完成任务取消监视
        });
        for (let img of imgs) {
            img.setAttribute('src', defaultPicURL)
            obs.observe(img) // 监视该元素
        }
    }
    document.readyState == 'loading' ? window.addEventListener('DOMContentLoaded', handler) : handler()
})()