const express = require("express");
const multer = require("multer");
const PDFParser = require("pdf2json"); //use this instead of the old one pdf-parse which is the legacy
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static("public"));

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("pdf"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const pdfParser = new PDFParser(this, 1); // '1' means extract text only

    // If parsing fails
    pdfParser.on("pdfParser_dataError", errData => {
        console.error(errData.parserError);
        res.status(500).json({ error: "Parsing failed" });
    });

    // If parsing succeeds
    pdfParser.on("pdfParser_dataReady", pdfData => {
        const text = pdfParser.getRawTextContent();
        
        console.log("PDF parsed successfully!");
        res.json({
            message: "Success!",
            text: text
        });

        // Clean up the file
        fs.unlinkSync(req.file.path);
    });

    // Start the parsing process
    pdfParser.loadPDF(req.file.path);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});