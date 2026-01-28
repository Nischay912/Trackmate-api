// step78: we paste the code from documentation of redis at upstash.com here below.
import { Redis } from '@upstash/redis'
import { Ratelimit } from "@upstash/ratelimit"

// step83: we also use the config method of dotenv here below so that : it loads variables from your .env file into process.env, so Redis.fromEnv() can use them.
import "dotenv/config"

// step84: we thus created a ratelimiter instance i.e. an object that will track and limit incoming requests.
const ratelimit = new Ratelimit({
    // step79: we will now not have url and token harcoded but get it from the env file thus here below.

    // step80: so first install the package in terminal > cd backend > npm i @upstash/redis@1.34.9 @upstash/ratelimit@2.0.5 thus here below.

    // step81: instead of harcoding the url and token needed by redis to setup, we write the code below which means that : “Connect to Redis using whatever configuration is stored in my .env file or environment variables.”
    redis: Redis.fromEnv(),

    // step82: then the below code will set up a rate limiter which will use the redis instance we created above to store and check the rate-limit data i.e. the request counts coming per user to the server thus here below.

    // step85: “Sliding window” means the limit gradually resets over time rather than all at once (it’s smoother than a fixed window) ; so it means every 1 minute , a new window comes to track the requests in this 1-minute windows thus here ; so now each user can make up to 100 requests every 60 seconds.
    limiter: Ratelimit.slidingWindow(100, "60 s")
})

// step86: finally we export this rate limiter, so that we can use it in other files where we can use it as a middleware there to check for the rate limit before sending each response there, so that if the rate limit has been exceeded, the error response gets thrown there, thus so now thus here below.

// step87: see the next steps in rateLimiter.js file now there.
export default ratelimit