package connection

import (
	"github.com/go-redis/redis"
	"github.com/one-planet/pkg/helper"
)

func RedisConnection() *redis.Client {
	redis_client := redis.NewClient(&redis.Options{
		Addr:     helper.GetENV("REDIS_HOST"),
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	return redis_client
}
