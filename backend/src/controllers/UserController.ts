import { Request, Response } from 'express';
import { DatabaseSync } from 'node:sqlite';
import Client from 'ssh2-sftp-client';
import path from 'path';
import fs from 'fs';

export class UserController {
    static async verifyNick(req: Request, res: Response) {
        let db;
        const sftp = new Client();

        const tempDbPath = path.join(__dirname, 'temp_nlogin.db');

        try {
            const { nick } = req.body;

            await sftp.connect({
                host: process.env.SFTP_HOST as string,
                port: Number(process.env.SFTP_PORT) || 2022,
                username: process.env.SFTP_USERNAME as string,
                password: process.env.SFTP_PASSWORD as string
            });

            const remotePath = 'plugins/nlogin/nlogin.db';
            await sftp.fastGet(remotePath, tempDbPath);
            await sftp.end();

            db = new DatabaseSync(tempDbPath);

            const stmt = db.prepare(
                'SELECT last_name FROM nlogin WHERE last_name = ? COLLATE NOCASE'
            );

            const row = stmt.get(nick) as { last_name: string } | undefined;

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

        } catch (error) {
            console.error("Erro ao processar SQLite via SFTP:", error);
            return res.status(500).json({
                error: 'Erro interno ao acessar os dados do servidor.'
            });
        } finally {
            if (db) db.close();
            if (fs.existsSync(tempDbPath)) {
                fs.unlinkSync(tempDbPath);
            }
        }
    }
}