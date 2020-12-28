const axios = require("axios");

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

const requestFnList = new Array(100)
  .fill("6909002738705629198")
  .map((id) => () => singleRequest(id));

/**
 * 执行多个异步任务
 * @param {*} fnList 任务列表
 * @param {*} max 最大并发数限制
 * @param {*} taskName 任务名称
 */
async function concurrentRun(fnList = [], max = 5, taskName = "未命名") {
  if (!fnList.length) return;

  let current = 0;
  const count = fnList.length;
  const replyList = [];
  const schedule = async () => {
    return new Promise(async (resolve) => {
      const fn = fnList[current];
      if (!fn) {
        resolve();
        return;
      }

      const reply = await fn();
      replyList[current] = reply;
      current++;
      if (current > count) {
        resolve();
        return;
      }

      console.log(
        `${taskName} 事务进度 ${((current / count) * 100).toFixed(2)}% `
      );
      await schedule();
      resolve();
    });
  };
  const scheduleList = new Array(max).fill(0).map(() => schedule());
  const r = await Promise.all(scheduleList);
  console.log("执行完成");
  console.log({ replyListLength: replyList.length });
  return replyList;
}

(async () => {
  const reply = await concurrentRun(
    requestFnList.slice(0, 10),
    5,
    "请求掘金文章"
  );
})();
