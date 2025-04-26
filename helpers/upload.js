import multer from "multer";
import path from "node:path";

const tempDir = path.resolve("temp");

const storage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    console.log(file);
    const fileName = `${Date.now()}_${file.originalname}`;
    cb(null, fileName);
  },
});

export const upload = multer({ storage });
