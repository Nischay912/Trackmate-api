// step2: lets start off by creating a basic express app here below using import and all.
import express from "express"

// step10: if we now try to use the environment variables like by doing : "console.log(process.env.PORT)" ; it will show "undefined" because to use the environment variables, we need to use the dotenv package and then run its config function thus here below.
import dotenv from "dotenv"
import { initDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"
import transactionsRoute from "./routes/transactionsRoute.js"
import job from "./config/cron.js"
dotenv.config()

const app = express()

if(process.env.NODE_ENV === "production"){
    job.start();
}

// step98: now before all the GET and POST requests routes we have below ; lets use the middleware first thus here below.

// step99: so now before calling any of the roites here below ; this middleware will be used first to check for rate limiting and if success there ; then it calls safely the next() i..e the functions written after this OR below this middleware calling line, thus here below.

// step100: see the next steps in step101.txt file now there.
app.use(rateLimiter)

// step30: to use the req.body , we need to have the body-parser middleware thus here below.

// step31: this is a built-in middleware ; "middleware" is a function that runs in the middle between the request and the response ; so th ebelow middleware runs before we use the req.body there below ; and this reads incoming requests and then : Converts the JSON data into a JavaScript object and attaches it to req.body ; Without it, req.body would be undefined for JSON requests ; it thus : Makes it easy to access data sent from clients (e.g., POST requests with JSON payloads) ; thus here below.
app.use(express.json())

// step11: lets define the PORT from environment variables here below ; and just incase due to some error its undefined we can hardcode it to 5001 here below ; so that the app doesn't crash thus here below.

// step12: see the next steps in step13.txt file now there.
const PORT = process.env.PORT || 5001

app.get('/api/health', (req,res) => {
    res.status(200).json({status: "ok"})
})

// step18: now lets create a function to initialize the database here below.

// step118: WE CAN SHIFT THE BELOW CODE TO db.js FILE Y=TO KEEP THINGS ORGANIZED NOW HERE BELOW.

// step119: AND THEN IMPORT IT FROM THERE AND CAN USE IT THUS HERE BELOW NOW, THUS HERE NOW BELOW.

// step120: see the next steps in step121.txt file now there.
/*
async function initDB() {
    try{
        // step19: we will be using RAW SQL codes for database in this project where we have Tables and all, thus here below.

        // step20: creating the table named "transactions" : only created if it doesn’t already exist. This prevents errors if the table already exists.

        // step21: we created the "id" as SERIAL i.e auto-incrementing integer which is common for unique IDs i.e it starts from 1 and increments by 1 automatically thus here below.

        // step22: we have VARCHAR(255) which tells that the column is a string and can hold up to 255 characters ; and NOT NULL which tells that the column is required and cannot be null thus here below.

        // step23: then we have a created_at timestamp which is automatically populated with the current timestamp whenever a new row is inserted into the table thus here below.

        // step24: DECIMAL(10,2) is used to mention : "fixed-point number" with : 10 digits total , 2 digits after the decimal point ; so the maximum it can store is 9999999999.99 (8 digits before the decimal point and 2 digits after) thus here below.
        await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY, 
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`

        console.log("Database initialized successfully!")
    }
    catch(error){
        console.error("Error initializing database:", error)

        // step25: we exit the process with status code "1" which is for failure ("0" for success) ; exitting from process will kill the server and prevent it from running further; its used to : stop the server completely instead of running it in a broken state. thus here below.

        // step26: see the next steps in step27.txt file now there.
        process.exit(1)
    }
}
*/

// step107: now we see that all the routes had "/api/transactions/"" common in all ; so lets put in common here below and just after that call the transactionsRoute here below.

// step108: so it means now that : “For every route defined inside transactionsRoute, automatically add /api/transactions at the beginning.” ; thus here below.

// step109: thats why we can remove the "/api/transactions/" from the routes there.

// step110: see the next steps in server.js file now there.

// step113: so now this below line means that : if we get a request for a URL strating with "/api/transactions/" then call the transactionsRoute and run the "transactionsRoute" file there and based on other parameters in URL it will run the appropriate routes from there, thus here below.

// step114: example : if request comes for "localhost:5001/api/transactions/123" ; then it will run the transactionsRoute file and based on the parameters in URL it will run the appropriate routes from there ; like here it is "/123" after "/api/transactions/" ; so it will run the "/:userId" route from there ; thus here below.

// step115: can verify by sending a request via POSTMAN to any route and getting correct response there means everything is working correctly as expected now there, hence so now thus here below.

// step116: see the next steps in step117.txt file now there.
app.use("/api/transactions", transactionsRoute)

// step5: now lets create a route here below for the url ending in "/" here below.

// step6: can go on "localhost:5001/" to see the "Hello World" message here below.

// step7: see the next steps in step8.txt file now there.
// app.get("/", (req, res) => {
//     res.send("Hello World")
// })

// step40: now lets make a GET request to fetch the transaction using the user_id here below.

// step41: we will have the user_id dynamic in the URL, so we will use a dynamic route here below using ":" thus here below ; example : "localhost:5001/api/transactions/123" ; where "123" is the user_id thus here below.

/* COMMENTED AND SENT TO TRANSACTIONROUTES.JS FILE THERE FOR BETTER ORGANIZED FOLDER STRUCTURES THERE.
app.get("/api/transactions/:userId", async (req, res) => {
    try{
        console.log(req.params)
        // step42: we will get the user_id from the URL here below, using the params object thus here below ; "params" contains the parameters of the URL thus here below , like if we have "localhost:5001/api/transactions/123" then the "123" will be the "user_id" thus here below and so on....
        const { userId } = req.params;

        // step43: we will now select all the columns from the transactions table we stored in "transactions" variable, for the user_id that we got from the URL thus here below.

        // step44: we will have ORDER BY DESC so that the latest transaction will come first in the list there, thus here below.

        // step45: now we store the result in "transactions" variable thus here below which will be an array of objects thus here below.
        const transactions = await sql`
            SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
        `

        // step46: so we send back the transactions we got from above thus here below.

        // step47: we can test it by sending a GET request for a userId on POSTMAN to "http://localhost:5001/api/transactions/123" ; where "123" is the user_id thus here below.

        // step48: we will thus there get the array of objects containing all the transactions of the user with that user_id ; thus here below.
        res.status(200).json(transactions)
    }
    catch(error){
        console.error("Error fetching transactions:", error)
        res.status(500).json({
            message: "Error fetching transactions due to Internal Server Error"
        })
    }
})

// step28: now lets create a route for sending POST request to the "/api/transactions" enpoint here below.
app.post("/api/transactions", async (req, res) => {
    try{
        // step29: we will destructure the object sent by user through req.body and get it here below.
        const { title, amount, category, user_id } = req.body

        // step32: now lets check if there is no title or category or user_id sent by user OR if the amount entered is undefined as it may be 0 but should not be undefined ; then we will send a respone back thus here below.
        if(!title || !category || !user_id || amount === undefined){
            return res.status(400).json({
                message: "All fields are required!"
            })
        }

        // step33: now once we got all the required fields, we will insert the transaction into the database here below.

        // step34: no need to add the "created_at" field now as it is automatically added by the database thus here below ; with its default value that we mentioned there earlier i.e. the current timestamp thus here below.

        // step35: RETURNING * is a PostgreSQL feature that tells the database that : After inserting, return the full row that was just added ; "*" means return all the columns and store it in the "transaction" variable thus here below.
        const transaction = await sql`
            INSERT INTO transactions (user_id, title, amount, category) 
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *
        `

        // step36: can console log for debugging purposes ; there we see that transaction now is an array of objects ; but we want only the first object of the array thus here below ; so we will send only the 0th index of it in the response back thus here below.
        // console.log(transaction)
        // console.log(transaction[0])

        // step37: now lets send a 201 status code response which means something was created thus here below.

        // step38: see the next steps in step39.txt file now there.
        res.status(201).json(
            transaction[0]
        )
    }
    catch(error){
        console.error("Error creating transaction:", error)
        res.status(500).json({
            message: "Error creating transaction due to Internal Server Error"
        })
    }
})

// step49: now lets make another route for DELETE , to delete a transaction using the transaction id thus here below.

// step50: so we get the transaction id dynamically from the URL here below ; and then delete the transaction with that id thus here below.
app.delete("/api/transactions/:id", async(req, res) => {
    try{
        // step51: lets get the id of the transaction from the URL which is stored as { } object in the req.params thus here below.
        const { id } = req.params;

        // step60: now we can add the "if" check here below to check if the id is a number or not , thus here below.

        // step61: we use isNaN which is used to check if its NaN (Not a Number) or not thus here below ; like if its not a number it will return true thus here below.

        // step62: like if we have : isNaN("abc") ; it will return "true" thus here below ; and if we have : isNaN(123) ; it will return "false" thus here below.

        // step63: but we put Number inside it too for safety check because if : we have "123" both isNaN and isNaN(Number()) will make it "false" as its a number , but check was for NaN i.e. for not a number ; but if we have : isNaN("123abc") > we will use the Number first which checks if its a Number or not , if not it returns NaN and thus the condition becomes true and sends an erro response instead of crashing the entire app thus here below.
        if(isNaN(Number(id))){
            return res.status(400).json({
                message: "Invalid transaction id!"
            })
        }

        // step52: now lets write the query to delete the transaction with the id thus here below.

        // step53: and we use RETURNING * to return all the columns of the deleted transaction thus here below.
        const result = await sql`
            DELETE FROM transactions WHERE id = ${id}
            RETURNING *
        `

        // step54: now if the result array is empty it means that there was no transaction with that id , as nothing got deleted from there, thus here below.
        if(result.length === 0){

            // step55: we use status code 404 here which is used for "Not Found" thus here below.
            return res.status(404).json({
                message: "Transaction not found!"
            })
        }

        // step56: else if there is a transaction with that id, we send back the deleted transaction thus here below.

        // step57: can now use POSTMAN to check it there for any "id" of transaction like : "localhost:5001/api/transactions/1" ; where "1" is the transaction id, thus here below and so on....

        // step58: see the next steps in step59.txt file now there.
        res.status(200).json("Transaction deleted successfully!")
    }
    catch(error){
        console.error("Error deleting transaction:", error)
        res.status(500).json({
            message: "Error deleting transaction due to Internal Server Error"
        })
    }
})

// step64: now lets make an endpoint to get the summary of transactions till now thus here below.

// step65: again we use dynamic route here below using ":" thus here below ; example : "localhost:5001/api/transactions/summary/123" ; where "123" is the user_id thus here below ; so we will get the summary based on the user_id thus here below.
app.get("/api/transactions/summary/:userId" , async(req, res) => {
    try {
        // step66: lets get the user_id from the URL which is stored as { } object in the req.params thus here below.
        const { userId } = req.params;

        // step67: for summary, first we will get the current balance thus here below.

        // step68: the SUM(amount) will sum up all the amount values for that user with that user_id , and the COALESCE(SUM(amount), 0) will return 0 if there are no transactions initially when its their first login for that user_id thus here below ; it may be undefined initially , so to overcome that we use COALESCE which will make it 0 if the SUM(amount) is undefined thus here below.

        // step69: and so here below we store that value from the SELECT statement below into a column named as "balance" thus here below.
        const balanceResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId}
        `

        // step70: similarly lets get the income here below i.e the positive amounts thus here below.

        // step71: we use "amount > 0" so that it adds up only the positive amounts thus here below.
        const incomeResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as income FROM transactions 
            WHERE user_id = ${userId} AND amount > 0
        `

        // step72: similarly sum up all the negative amounts for the "expenses" thus here below.
        const expensesResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions 
            WHERE user_id = ${userId} AND amount < 0
        `

        // step73: finally we can send back in response these values thus here below ; we use HTTP status code to 200, meaning “OK” — the request was successful.
        res.status(200).json({

            // step74: balanceresult will be an array of objects but we want only the first object of it thus here below ; so we will send only the 0th index of it in the response back ; and if the SQL sent back [{ balance: 1200 }] because we had save it as "balance" in the SQL query there ; so now we access it from that object using the key name using the "." operator thus here below.

            // step75: can check it on POSTMAN to get the summary based on the user_id thus here below.

            // step76: see the next steps in step77.txt file now there.
            balance: balanceResult[0].balance,
            income: incomeResult[0].income,
            expenses: expensesResult[0].expenses
        })
    } 
    catch (error) {
        console.error("Error getting transaction summary:", error)
        res.status(500).json({
            message: "Error getting transactions summary due to Internal Server Error"
        })    
    }
})
*/

// step25: now lets initialize the database and then run the app.listen function only after the database is initialized successfully thus here below ; else it will exit with process.exit there using the error message thus here below.

// step26: now we can see the message of "Database initialized successfully!" in console now there and on neon.tech's dashboard ; we can see the table's structure under "tables" section on the dashboard there now.
initDB().then(() => {
    app.listen(PORT, () => {
        // step3: now we can make this to do the following console log when the server is running here below.

        // step4: can check it by running : node server.js in console now here below.
        console.log(`Server is running on port ${PORT} : http://localhost:${PORT}`)
    })
})