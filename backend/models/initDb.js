import { openDb } from './db.js';

const init = async () => {
    const db = await openDb();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename TEXT NOT NULL,
        filepath TEXT NOT NULL,
        filesize INTEGER NOT NULL,
        created_at TEXT NOT NULL
        )
    `);
    console.log("Database initialized!");
    await db.close();
};

export default init;