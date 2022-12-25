//redis
const redis: any = require("redis");

const redisClient = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});

redisClient.on("connect", function () {
  console.log("redis 连接成功");
});
redisClient.on("error", function (err) {
  console.log("redis 连接异常 ", err);
});
redisClient.on("reconnecting", (stats) => {
  console.log("redis重连", stats);
});

export async function hSet(key: any, hashkey: any, hashval: any) {
  if (typeof hashval === "object") {
    hashval = JSON.stringify(hashval);
  }
  await redisClient.hmset(key, hashkey, hashval);
}

export async function hGetAll(key: any) {
  const promise = new Promise((resolve, reject) => {
    redisClient.hgetall(key, function (err, val) {
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
}

export async function hDel(key: any, hashkey: any) {
  await redisClient.hdel(key, hashkey);
}
