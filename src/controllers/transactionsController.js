import { sql } from "../config/db.js";

export async function getTransactionsByUserId(req,res) {
    try{         
            console.log(req.params)         
            const { userId } = req.params;          
            const transactions = await sql`             
                SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC         
            `          
            res.status(200).json(transactions)     
    }     
    catch(error){         
        console.error("Error fetching transactions:", error)         
        res.status(500).json({             
            message: "Error fetching transactions due to Internal Server Error"         
        })     
    } 
}

export async function createTransaction(req,res) {
    try{         
        const { title, amount, category, user_id } = req.body          
        if(!title || !category || !user_id || amount === undefined){             
            return res.status(400).json({                 
                message: "All fields are required!"             
            })         
        }          
        const transaction = await sql`             
            INSERT INTO transactions (user_id, title, amount, category)              
            VALUES (${user_id}, ${title}, ${amount}, ${category})             
            RETURNING *         
        `          
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
}
export async function deleteTransaction(req,res) {
    try{         
            const { id } = req.params;          
            if(isNaN(Number(id))){             
                return res.status(400).json({                 
                    message: "Invalid transaction id!"             
                })         
            }          
            const result = await sql`             
                DELETE FROM transactions WHERE id = ${id}             
                RETURNING *         
            `          
            if(result.length === 0){              
                return res.status(404).json({                 
                    message: "Transaction not found!"             
                })         
            }          
            res.status(200).json("Transaction deleted successfully!")     
        }     
        catch(error){         
            console.error("Error deleting transaction:", error)         
            res.status(500).json({             
                message: "Error deleting transaction due to Internal Server Error"         
            })     
        }
}
export async function getSummaryByUserId(req,res) {
    try {         
        const { userId } = req.params;          
        const balanceResult = await sql`             
            SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId}         
        `          
        const incomeResult = await sql`             
            SELECT COALESCE(SUM(amount), 0) as income FROM transactions              
            WHERE user_id = ${userId} AND amount > 0         
        `          
        const expensesResult = await sql`             
            SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions              
            WHERE user_id = ${userId} AND amount < 0         
        `          
        res.status(200).json({              
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
}