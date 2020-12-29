const axios = require("axios");
const chalk = require("chalk");
const { log } = require("console");

async function singleRequest(article_id) {
  // 这里我们直接使用 axios 库进行请求
  const reply = await axios.post(
    "https://api.juejin.cn/content_api/v1/article/detail",
    {
      article_id,
    }
  );

  return reply.data;
}

/**
 * 执行多个异步任务
 * @param {*} fnList 任务列表
 * @param {*} max 最大并发数限制
 * @param {*} taskName 任务名称
 */
async function concurrentRun(fnList = [], max = 5, taskName = "未命名") {
  if (!fnList.length) return;

  log(chalk.blue(`开始执行多个异步任务，最大并发数： ${max}`));
  const replyList = []; // 收集任务执行结果
  const count = fnList.length; // 总任务数量
  const startTime = new Date().getTime(); // 记录任务执行开始时间
  
  let current = 0;
  // 任务执行程序
  const schedule = async (index) => {
    return new Promise(async (resolve) => {
      const fn = fnList[index];
      if (!fn) return resolve();

      // 执行当前异步任务
      const reply = await fn();
      replyList[index] = reply;
      log(`${taskName} 事务进度 ${((++current / count) * 100).toFixed(2)}% `);

      // 执行完当前任务后，继续执行任务池的剩余任务
      await schedule(index + max);
      resolve();
    });
  };

  // 任务池执行程序
  const scheduleList = new Array(max)
    .fill(0)
    .map((_, index) => schedule(index));
  // 使用 Promise.all 批量执行
  const r = await Promise.all(scheduleList);

  const cost = (new Date().getTime() - startTime) / 1000;
  log(chalk.green(`执行完成，最大并发数： ${max}，耗时：${cost}s`));
  return replyList;
}

(async () => {
  const requestFnList = new Array(100)
    .fill("6909002738705629198")
    .map((id) => () => singleRequest(id));

  const reply = await concurrentRun(requestFnList, 50, "请求掘金文章");
})();
