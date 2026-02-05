/**
 * 创建一个记忆化（memoization）包装器函数，用于缓存函数调用的结果。
 * 当传入相同参数时，直接从缓存中返回结果，避免重复计算。
 *
 * @param {Function} fn - 需要被记忆化的原始函数
 * @returns {Function} 返回一个包装后的函数，具有记忆化功能
 */
function memoize(fn) {
    // 使用 Map 来存储函数调用的参数和对应的结果
    const cache = new Map();

    // 返回一个新函数，该函数会检查缓存并决定是否执行原始函数
    return function(...args) {
        // 将参数序列化为字符串作为缓存的键
        const key = JSON.stringify(args);

        // 如果缓存中已存在该参数组合的结果，则直接返回缓存值
        if (cache.has(key)) {
            return cache.get(key);
        }

        // 否则调用原始函数，并将结果存入缓存
        const result = fn.apply(this, args);
        cache.set(key, result);

        // 返回计算结果
        return result;
    };
}