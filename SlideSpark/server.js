const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse/lib/pdf-parse");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static("public"));

// Storage config
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Upload route
app.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);

    const pdfData = await pdfParse(dataBuffer);

    console.log("Extracted Text:");
    console.log(pdfData.text);

    res.json({ 
        message: "PDF processed successfully!",
        text: pdfData.text
     });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
