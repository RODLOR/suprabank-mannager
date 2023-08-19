import { pool as db } from "../db.js";

const exportDataController = {
    export: async (req, res) => {
        try {
            const [tables] = await db.query('SHOW TABLES');

            const exportData = {};

            for (const row of tables) {
                const tableName = row[Object.keys(row)[0]];
                const [tableData] = await db.query(`SELECT * FROM ${tableName}`);
                exportData[tableName] = tableData;
            }

            res.json(exportData);
        } catch (error) {
            console.error('Error exporting data:', error);
            res.status(500).json({ error: 'Error exporting data' });
        }
    },
}

export default exportDataController;
