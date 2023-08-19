import { pool as db } from "../db.js";

const loansControllers = {
    loans: async (req, res) => {
        try {
            const query = `
                SELECT loans.*, clients.id_number AS client_id_number
                FROM loans
                JOIN clients ON loans.client_id = clients.id
            `;
            const [rows] = await db.query(query);
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    addLoan: async (req, res) => {
        const {
            requirement_date,
            id_number,
            required_amount,
            cuotes_quantity,
            monthly_interest
        } = req.body;

        try {
            const [searchIdResult] = await db.query("SELECT id FROM clients WHERE id_number = ?", [id_number]);
            const searchId = searchIdResult[0].id;

            const cuotes_amount = (parseFloat(required_amount) / parseInt(cuotes_quantity)) * (1 + (parseFloat(monthly_interest) / 100));

            const data = {
                requirement_date: requirement_date,
                client_id: searchId,
                required_amount: required_amount,
                cuotes_quantity: cuotes_quantity,
                cuotes_amount: cuotes_amount,
                monthly_interest: monthly_interest,
            };

            const insertSql = "INSERT INTO loans SET ?";
            const [insertResult] = await db.query(insertSql, [data]);
            res.send(insertResult);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ msg: "Error adding loan" });
        }
    },
}

export default loansControllers;
