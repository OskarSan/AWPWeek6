import multer, {StorageEngine, Multer} from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const storage : StorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const uniqueId = uuidv4();
        const originalName = path.parse(file.originalname).name; 
        const extension = path.extname(file.originalname); 
        const newFilename = `${originalName}_${uniqueId}${extension}`; 
        cb(null, newFilename);
    }
  })
  
  const upload : Multer= multer({ storage: storage })

export default upload;