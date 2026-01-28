// step88: lets import the ratelimiter we made in the previous steps, thus here below.
import ratelimit from "../config/upstash.js";

// step89: now lets create a middleware here below ; which will have "next" as input parameter too here below ; once the middleware completes doing its job, it can call the "next" function, that will call the function that was written or called after it / next to it there, thus here below.
const rateLimiter = async(req,res,next) => {
    try{
        // step91: now we connect to redis via Redis.fromEnv() in the upstash file ; then we Checks how many requests were made recently for that key ; if count < limit : then it allows the request and increments the stored count ; else blocks the request and returns the information that the rate limit has been reached ; so : ".limit()" returns an object like :
        /*
        {
            success: true,        // or false if limit exceeded
            limit: 100,           // total allowed requests
            remaining: 72,        // how many left in the window
            reset: 1734745920,    // time (in seconds) when the limit resets
        }

        So, we destructure only the success here below ; if success is true , allows the request ; else block if its false, thus here below.
        */

        // step92: so thus overall : The method .limit() checks and updates the rate limit for a given unique identifier (called a key) ; the key can be anything like : a user ID (for logged-in users), an IP address (for anonymous users), etc ; since we don't have any authentication on backend side , so lets put a hardcoded key here below.

        // step93: the reason why we have "key" here below is that : If you use the same key for everyone, all users share one limit (global rate limit) ; but : If you use a different key per user or IP, each user has their own independent limit ; so we maintain independent seperate rate-limits for each user independently based on their IDs, thus here below.
        const {success} = await ratelimit.limit("my-rate-limit")

        // step94: now if success is false ; means the request was blocked thus here below.
        if(!success){
            return res.status(429).json({message: "Rate limit exceeded : Too many requests, please try again later."})
        }

        // step95: but if its a success, we can call the next() function called after the middleware safely, thus here below.
        next()
    }
    catch(error){
        console.log("Rate limit error", error)

        // step90: if any error comes, call the next function written after the middleware wherever this middleware called; and pass the "error" to that function thus here below.
        next(error)
    }
};

// step96: now lets export it so that we can put it infront of our APIs in other files and use it there, to check for the rate-limit using this middleware first before every response, thus here below.

// step97: see the next steps in server.js file now there.
export default rateLimiter