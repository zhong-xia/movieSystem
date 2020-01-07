// // 数据库
// // express
// // 验证：class-validator
// import "reflect-metadata";
// import { Movie } from "./entities/Movie";
// import { validate } from "class-validator";
// import { plainToClass } from "class-transformer";

// // const m = new Movie();
// const m: any = {}; // plain Object  平面对象，没有验证器，只能验证通过，要将其转换为Movie实体对象，使用第三方库转换class-transformer
// m.name = 2323;
// m.types = ["喜剧"];
// m.areas = ["中国大陆"];
// m.isClassic = true;
// // m.timeLong = 2;

// // 将plain Object转换为Movie的对象
// const movie = plainToClass(Movie, m as object);
// // console.log(movie);
// // console.log(movie, typeof movie.name);
// validate(movie).then(errors => {
//     console.log(errors);
// });

// import "reflect-metadata";
// import { MovieModel } from "./db";
// import { Movie } from "./entities/Movie";

// const m = new Movie();
// m.name = "Sdfs";

// m.validateThis().then(err => {
//     console.log(err);
// });

// MovieModel.find().then(ms => {
//     console.log(ms);
// });

import "reflect-metadata";
import { MovieServices } from "./services/MovieService";
import { Movie } from "./entities/Movie";

// 添加
// const m: any = {
//     name: "sdf",
//     poster: "sfsdf",
//     description: "asdjfeo",
//     timeLong: 33,
//     types: ["喜剧"],
//     areas: ["中国大陆"]
// };

// MovieServices.add(m).then(result => {
//     if (Array.isArray(result)) {
//         console.log(result);
//     }
//     else {
//        console.log(result._id);
//     }
// });

// 修改
// const m: any = {
//     name: "流浪地球"
// };

// MovieServices.edit("5e113c73de620953941f8dd3", m).then(result => {
//     console.log(result);
// });

// 删除
// MovieServices.delete("5e113442044db93e385f4b32").then(() => {
//     console.log("删除成功");
// });

// 查询
// MovieServices.findById("5e113b2ab0efdc28bcb96b3a").then(result => {
//     console.log(result);
// });

// 往数据库中加数据
// function getRandom(min: number, max: number) {
//     const dec = max - min;
//     return Math.floor(Math.random() * dec + min);
// }

// for (let i = 0; i < 100; i++){
//     const m = new Movie();
//     m.name = "电影" + (i + 1);
//     m.areas = ["中国大陆", "美国"];
//     m.types = ["喜剧", "动作"];
//     m.isClassic = true;
//     m.timeLong = getRandom(70, 240);
//     MovieServices.add(m);
// }

// const condi: any = {
//     page: 3,
//     limit: 5,
//     key: "10"
// };
// MovieServices.find(condi).then(result => {
//     // console.log(result, result.length);
//     if (result.errors.length > 0) {
//         console.log(result.errors);
//     }
//     else{
//         result.data.forEach(m => {
//             console.log(m.name);
//         });
//         console.log("总数:" + result.count);
//     }
// });

// 书写express
import Express from "express";
import MovieRouter from "./routes/MovieRoute";
import UploadRouter from "./routes/UploadRoute";
import history from "connect-history-api-fallback";

const app = Express();

app.use(history());

app.use("/", Express.static("public/build")); // 请求public上传文件文件夹中的客户端
// 静态资源访问路径
app.use("/upload", Express.static("public/upload")); // 请求public上传文件文件夹中的

// app.use("/api/movie", (req, res) => {
//     res.send("Hello");
// });

app.use(Express.json()); // 配置中间件，用于解析请求消息体中的json格式数据
// 使用postman进行测试
app.use("/api/movie", MovieRouter);

// 文件上传
// 通常情况下，服务器会提供一个统一的api接口，用于处理上传的文件
app.use("/api/upload", UploadRouter);

app.listen(3000);
