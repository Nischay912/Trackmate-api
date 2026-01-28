import express from "express"
import { createTransaction, deleteTransaction, getSummaryByUserId, getTransactionsByUserId } from "../controllers/transactionsController.js";

// step103: so we now use express Router here below, which creates a mini express app to handle routers and middlewares only here below.

// step104: then we copied all routes from server.js and placed it here now below for organized routes at one place here below.

// step105: since its const router now and not "app" so rename all "aap.get" and all to "router.get" and all there now, here below.

// step106: see the next steps in server.js file now there.
const router = express.Router();

// step111: so now since we have made the transactionsRoute now, we can remove the "/api/transactions/" from the routes here , adn in the main server.js file it will add the corresponding extra part after the "/api/transactions/" by looking from here, thus here below.

// step112: see the next steps in server.js file now there.
router.get("/:userId", getTransactionsByUserId)  

router.post("/", createTransaction)  

router.delete("/:id", deleteTransaction)  

router.get("/summary/:userId" , getSummaryByUserId)


export default router