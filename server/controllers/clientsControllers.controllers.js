import { pool as db } from "../db.js";

const clientsControllers = {
    clients: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM clients');
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    addClient: async (req, res) => {
        const id_number = req.body.id_number;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;
        const address = req.body.address;
        const tel = req.body.tel;

        try {

            const data = {
                id_number: id_number,
                first_name: first_name,
                last_name: last_name,
                email: email,
                address: address,
                tel: tel,
            };

            const checkEmail = `SELECT * FROM clients WHERE email=?`;
            const checkIdNumber = `SELECT * FROM clients WHERE id_number=?`;
            const [checkEmailResult] = await db.query(checkEmail, [email]);
            const [checkIdNumberResult] = await db.query(checkIdNumber, [id_number]);

            if (checkEmailResult.length > 0 && checkIdNumberResult > 0) {
                return res.status(400).send({ msg: "Id Number or Email Already Present" });
            } else {
                const insertSql = "INSERT INTO `clients` SET ?";
                const [insertResult] = await db.query(insertSql, [data]);
                res.send(insertResult);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({ msg: "Error registering user" });
        }
    },
}

export default clientsControllers;
