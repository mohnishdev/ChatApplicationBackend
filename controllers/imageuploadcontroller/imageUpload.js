import multer from "multer";

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log(req.body, "file");
        if(file.fieldname ==="messageImage"){
            cb(null, './public/uploads/')
        }else{
            cb(null, './public/ProfileImage/')
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)

    }
})
const upload = multer({ storage: fileStorageEngine })

const uploadImage = upload.single('image')
export const uploadMesaggeImage = upload.single('messageImage')

export default uploadImage;