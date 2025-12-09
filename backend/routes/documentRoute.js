import express from 'express';
import upload from '../middlewares/multer.js';
import { addDocument, deleteDocument, getAllDocuments, getDocumentById } from '../controllers/documentController.js';

const documentRoute = express.Router();

documentRoute.post("/upload", upload.single('file'), addDocument);
documentRoute.get("/", getAllDocuments);
documentRoute.get("/:id", getDocumentById);
documentRoute.delete("/:id", deleteDocument);

export default documentRoute;