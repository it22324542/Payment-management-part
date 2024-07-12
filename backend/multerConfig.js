import multer from "multer";

const storage = multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,'./public/paymentSlips');
    },
    filename: function (req,file,cb) {
        cb(null,file.originalname);
    },

    createParentPath: true
});

const upload = multer({storage:storage});

export default upload;