import Express from "express";
import multer from "multer";
import path from "path";
import { ResponseHelper } from "./ResponseHelper";

const router = Express.Router();

// 文件保存的配置
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, "../../public/upload"),
    filename(req, file, cb) {
        // 文件名是啥
        const time = new Date().getTime();
        // 后缀名是啥
        const extname = path.extname(file.originalname);
        // 设置文件的全称
        cb(null, `${time}${extname}`);
    }
});

const allowedExtensions = [".jpg", ".png", ".gif", ".bmp", ".jiff"];
const upload = multer ({
    // dest: path.resolve(__dirname, "../../public/upload")
    storage,
    limits: {
        fileSize: 1024 * 1024 // 文件最多1M
    },
    fileFilter(req, file, cb) {
        const ext = path.extname(file.originalname);
        if (allowedExtensions.includes(ext)) {
            cb(null, true);
        }
        else {
            cb(new Error("文件类型不正确"), false);
        }
    }
 }).single("imgfile"); // 文件保存路径

// router.post("/", upload.single("imgfile"), (req, res) => {
//     res.send("上传文件成功");
// });

// 当发生错误时，如何响应给客户端；正确时，如何响应
router.post("/", (req, res) => {
    upload(req, res, err => {
        if (err) {
            ResponseHelper.sendError(err.message, res);
        }
        else{
            // 一切都好
            const url = `/upload/${req.file.filename}`; // 输出文件路径
            ResponseHelper.sendData(url, res);
        }
    });
});

export default router;
