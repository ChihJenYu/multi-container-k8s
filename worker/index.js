const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  // retry every 1000ms if fails
  retry_strategy: () => 1000,
});
const sub = redisClient.duplicate();

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

// subscribe to the channel `insert`
sub.subscribe("insert");

// channel: `insert`
// message: the new index
sub.on("message", (channel, message) => {
  redisClient.hset("values", message, fib(parseInt(message)));
});
