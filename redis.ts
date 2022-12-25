// 导入 Redis 库
const redis = require("redis");
// 利用这个库连接到 Redis 服务器
const redisClient = redis.createClient({
  host: "127.0.0.1",
  port: "6379",
});
// 监听连接成功还是失败
redisClient.on("connect", function () {
  console.log("redis 连接成功");
});

redisClient.on("error", function (err) {
  console.log("redis 连接异常 ", err);
});
redisClient.on("reconnecting", (stats) => {
  console.log("redis重连", stats);
});

export const hSet = async (key: any, hashkey: any, hashval: any) => {
  if (typeof hashval === "object") {
    hashval = JSON.stringify(hashval);
  }
  await redisClient.hmset(key, hashkey, hashval);
};

export const hGetAll = async (key: any) => {
  const promise = new Promise((resolve, reject) => {
    redisClient.hgetall(key, function (err, val) {
      console.log(err,111);
      if (err) {
        reject(err);
        return;
      }
      if (val == null) {
        resolve(null);
        return;
      }
      resolve(val);
    });
  });
  return promise;
};

export async function hDel(key: any, hashkey: any) {
  await redisClient.hdel(key, hashkey);
}
