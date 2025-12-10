import { openDb } from '../models/db.js';
import fs from'fs';

export const addDocument = async (req, res) => {
    try{
        const file = req.file;

        if (!file) return res.status(400).json({ success: false, message: 'No file uploaded!' });

        const db = await openDb();

        const result = await db.run(
            'INSERT INTO documents (filename, filepath, filesize, created_at) VALUES (?, ?, ?, ?)',
            [req.file.originalname, req.file.path, req.file.size, new Date().toISOString()]
        );

        const document = await db.get('SELECT * FROM documents WHERE id = ?', [result.lastID]);
        
        await db.close();

        return res.status(201).json({ success: true, data: document });
    }
    catch(err){
        return res.status(500).json({ success : false , message : err.message || "Internal server error."});
    }
}

export const getAllDocuments = async (req, res) => {
    try{
        const db = await openDb();

        const documents = await db.all('SELECT * FROM documents ORDER BY created_at DESC');

        await db.close();

        return res.status(200).json({ success: true, data: documents });
    }
    catch(err){
        return res.status(500).json({ success : false , message : err.message || "Internal server error."});
    }
}

export const getDocumentById = async (req, res) => {
    try{
        const { id } = req.params;

        const db = await openDb();

        const document = await db.get('SELECT * FROM documents WHERE id = ?', [id]);
        
        await db.close();

        if (!document) return res.status(404).json({ success: false, message: 'Document not found!' });

        if (!fs.existsSync(document.filepath)) return res.status(404).json({ success: false, message: 'File not found on server!' });

        return res.download(document.filepath, document.filename, (err) => { 
            if (err) {
                if (!res.headersSent) {
                    return res.status(500).json({ success: false, message: 'Error downloading file.' });
                }
            }
        });
    }
    catch(err){
        return res.status(500).json({ success : false , message : err.message || "Internal server error."});
    }
}

export const deleteDocument = async (req, res) => {
    try{
        const { id } = req.params;

        const db = await openDb();

        const document = await db.get('SELECT * FROM documents WHERE id = ?', [id]);

        if (!document) {
            await db.close();
            return res.status(404).json({ success: false, message: 'Document not found!' });
        }

        if (fs.existsSync(document.filepath)) {
            fs.unlinkSync(document.filepath);
        }

        await db.run('DELETE FROM documents WHERE id = ?', [id]);
        
        await db.close();

        return res.status(200).json({ success: true, message: 'Document deleted successfully' });
    }
    catch(err){
        return res.status(500).json({ success : false , message : err.message || "Internal server error."});
    }
}