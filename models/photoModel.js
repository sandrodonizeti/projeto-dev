const pool = require('../config/dbConfig');

class PhotoModel {
    async create(filename, path, extension, user_id) {
        try {
            const sql = "INSERT INTO message (filename, path, user_id) VALUES (?, ?, ?)";
            const values = [filename, path, user_id];
            const [rows] = await pool.query(sql, values);
            return rows.insertId;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao salvar a foto.');
        }
    }

    async findByUserId(user_id) {
        try {
            const sql = "SELECT * FROM message WHERE user_id = ?";
            const [rows] = await pool.query(sql, [user_id]);
            return rows;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao buscar fotos do usuário.');
        }
    }
}

module.exports = PhotoModel;
