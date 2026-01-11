import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    cb(new Error("Faqat rasm yuklash mumkin"), false);
  } else {
    cb(null, true);
  }
};

export default multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});
