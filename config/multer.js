const multer = require(`multer`),
    Path = require(`path`);


const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.fieldname + Date.now() + Path.extname(file.originalname))
    }
});
    
exports.upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 /* 10mB */ },
    fileFilter: (req, file, cb) => {
        const ext = Path.extname(file.originalname).toLowerCase();

        if(ext === `.png` || ext === `.jpg` || ext === `.jpeg` || ext === `.mp4`){
            return cb(null, true);
        }

        return cb(new Error(`File format is not valid`));
    }
});