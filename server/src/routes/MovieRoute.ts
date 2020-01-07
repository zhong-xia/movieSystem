// import Express from "express";
// import { MovieServices } from "../services/MovieService";
// import { ResponseHelper } from "./ResponseHelper";

// const router = Express.Router();

// // 传递参数的两种方式
// // localhost:3000/api/movie/xxxxx params
// // localhost:3000/api/movie?id=xxxx query
// router.get("/:id", async (req, res) => {
//     try{
//         const movieid = req.params.id;
//         // 获取电影对象
//         const movie = await MovieServices.findById(movieid);
//         // 响应：服务器的接口的响应格式，往往是一种标准格式
//         // res.send("get " + movieid);
//         ResponseHelper.sendData(movie, res);
//     }
//    catch {
//        ResponseHelper.sendData(null, res);
//    }
// });

// router.get("/", async (req, res) => {
//     const result = await MovieServices.find(req.query);
//     ResponseHelper.sendPageData(result, res);
// });

// router.post("/", async (req, res) => {
//     const result = await MovieServices.add(req.body);
//     // res.send("post 请求");
//     if (Array.isArray(result)) {
//        ResponseHelper.sendError(result, res);
//    }
//    else{
//        ResponseHelper.sendData(result, res);
//    }
// });

// router.put("/:id", async (req, res) => {
//     // res.send("put 请求");
//     try {
//         const result = await MovieServices.edit(req.params.id, req.body);
//         if (result.length > 0) {
//             ResponseHelper.sendError(result, res);
//         }
//         else {
//             ResponseHelper.sendData(true, res);
//         }
//     }
//     catch {
//         ResponseHelper.sendError("id错误", res);
//     }
// });

// router.delete("/:id", async (req, res) => {
//     // res.send("delete 请求");
//     try {
//         await MovieServices.delete(req.params.id);
//         ResponseHelper.sendData(true, res);
//     }
//     catch {
//         ResponseHelper.sendError("id错误", res);
//     }
// });

// export default router;

import Express from "express";
import { MovieServices } from "../services/MovieService";
import { ResponseHelper } from "./ResponseHelper";
const router = Express.Router();

router.get("/:id", async (req, res) => {
    try {
        const movieid = req.params.id;
        const movie = await MovieServices.findById(movieid);
        // 响应：服务器的接口的响应格式，往往是一种标准格式
        ResponseHelper.sendData(movie, res);
    }
    catch {
        ResponseHelper.sendData(null, res);
    }
});

router.get("/", async (req, res) => {
    const result = await MovieServices.find(req.query);
    ResponseHelper.sendPageData(result, res);
});

router.post("/", async (req, res) => {
    const result = await MovieServices.add(req.body);
    if (Array.isArray(result)) {
        ResponseHelper.sendError(result, res);
    }
    else {
        ResponseHelper.sendData(result, res);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const result = await MovieServices.edit(req.params.id, req.body);
        if (result.length > 0) {
            ResponseHelper.sendError(result, res);
        }
        else {
            ResponseHelper.sendData(true, res);
        }
    } catch {
        ResponseHelper.sendError("id错误", res);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await MovieServices.delete(req.params.id);
        ResponseHelper.sendData(true, res);
    } catch {
        ResponseHelper.sendError("id错误", res);
    }
});

export default router;
