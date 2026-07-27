"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const node_sqlite_1 = require("node:sqlite");
const ssh2_sftp_client_1 = __importDefault(require("ssh2-sftp-client"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class UserController {
    static async verifyNick(req, res) {
        let db;
        const sftp = new ssh2_sftp_client_1.default();
        const tempDbPath = path_1.default.join(__dirname, 'temp_nlogin.db');
        try {
            const { nick } = req.body;
            await sftp.connect({
                host: process.env.SFTP_HOST,
                port: Number(process.env.SFTP_PORT) || 2022,
                username: process.env.SFTP_USERNAME,
                password: process.env.SFTP_PASSWORD
            });
            const remotePath = 'plugins/nlogin/nlogin.db';
            await sftp.fastGet(remotePath, tempDbPath);
            await sftp.end();
            db = new node_sqlite_1.DatabaseSync(tempDbPath);
            const stmt = db.prepare('SELECT last_name FROM nlogin WHERE last_name = ? COLLATE NOCASE');
            const row = stmt.get(nick);
            if (!row) {
                return res.status(404).json({
                    success: false,
                    error: 'Você precisa se registrar no servidor primeiro!'
                });
            }
            return res.json({
                success: true,
                nick: row.last_name
            });
        }
        catch (error) {
            console.error("Erro ao processar SQLite via SFTP:", error);
            return res.status(500).json({
                error: 'Erro interno ao acessar os dados do servidor.'
            });
        }
        finally {
            if (db)
                db.close();
            if (fs_1.default.existsSync(tempDbPath)) {
                fs_1.default.unlinkSync(tempDbPath);
            }
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map