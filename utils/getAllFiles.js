import fs from "fs";
import path from "path";

const getAllFiles = (dir, dirOnly = false) => {
  let Names = [];

  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (let file of files) {
    const filePath = path.join(dir, file.name);

    if (dirOnly) {
      if (file.isDirectory()) {
        Names.push(filePath);
      }
    } else {
      if (file.isFile()) {
        Names.push(filePath);
      }
    }
  }

  return Names;
};

export default getAllFiles;
