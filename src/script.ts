import fs from "fs";
import path from "path";

export default function createUploadsDir() {
  const uploadsDir = path.join(__dirname, "uploads");

  console.log(uploadsDir);

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }
}
