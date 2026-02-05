// 一.使用Promise.all
/**
 * 并发执行两个 Promise，并在两者都成功完成后返回它们结果的和。
 * 如果任意一个 Promise 被拒绝（rejected），整个操作会抛出错误。
 *
 * @param {Promise<number>} promise1 - 第一个返回数字的 Promise
 * @param {Promise<number>} promise2 - 第二个返回数字的 Promise
 * @returns {Promise<number>} 一个解析为两数之和的新 Promise
 */
var addTwoPromises = async function (promise1, promise2) {
  try {
    // 使用 Promise.all 并发等待两个 Promise 完成
    // 解构赋值获取各自的解析值：res1 和 res2
    const [res1, res2] = await Promise.all([promise1, promise2]);

    // 将两个结果相加并返回（async 函数会自动包装为 Promise）
    return res1 + res2;
  } catch (error) {
    // 捕获 Promise.all 中任一 Promise 的 reject 或运行时错误
    console.error("Error in addTwoPromises:", error);

    // 重新抛出错误，确保调用者能感知失败（不吞掉异常）
    throw error;
  }
};
/*
1. async function : 异步函数声明

1) 自动返回一个Promise，即使写return 5，实际返回的也是Promise.resolve(5)
2) 可以在函数内部使用await关键字
3）如果函数跑出异常，或者reject，返回的Promise会被rejected

2. await：等待Promise解析

1）作用：暂停当前async函数的执行，直到右侧的Promise fulfilled（成功）或者rejected（失败），如果Promise成功，await表达式的值就是resolve的值，如果失败，会抛出错误（被try...catch捕获）
2）只能用在async函数内部，让异步代码看起来像同步，提升可读性

3. Promise.all([p1, p2, p3])：并发等待多个Promise

1）接收一个 Promise 可迭代对象数组（如 [p1, p2]）。
2）并发执行所有 Promise。
3）当所有 Promise 都成功时，返回一个包含所有结果的数组（顺序与输入一致）。
4）只要有一个 reject，整个 Promise.all 立即 reject，其余未完成的 Promise 被忽略（但仍在后台运行）。

4.try...catch与异步错误处理

1）如果 Promise.all(...) reject，await 会抛出 reject 的原因（reason），就像 throw error 一样,Promise reject就会被 try...catch 捕获。

5.返回值有隐式Promise包装：

即使我写return res1+res2，但因为函数是async，实际返回的是Promise.resolve(res1+res2),所以调用时必须用：
const result = await addTwoPromise(p1,p2)
 */

//二.仅使用await
var addTwoPromises = async function (promise1, promise2) {
    try {
        return await promise1 + await promise2;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// 区别在于这里是串行执行，先等p1再等p2