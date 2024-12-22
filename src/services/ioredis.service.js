import Redis from "ioredis";
import env from "dotenv";
env.config();

let RedisService;

if (!RedisService) {
  RedisService = new Redis(process.env.UPSTASH_REDIS_CONNECTION_URL, {
    lazyConnect: true,
    maxRetriesPerRequest: 5,
    enableReadyCheck: false,
    tls: {
      rejectUnauthorized: false,
    },
    retryStrategy(times) {
      if (times > 5) return null;
      return Math.min(times * 100, 3000);
    },
  });

  RedisService.on("connect", () => {
    console.log("Connected to Redis successfully.");
  });

  RedisService.on("error", (err) => {
    console.error("Redis connection error:", err);
  });
}

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Closing Redis connection...");
  await RedisService.quit();
  process.exit(0);
});

export default RedisService;
