import express from "express";

import { generateMessage, uploadPdf } from "./controller.js";
import upload from "../../config/multer.config.js";

const router = express.Router();

router.get("/", generateMessage);
router.post("/upload-pdf", upload.single("file"), uploadPdf);

export default router;
