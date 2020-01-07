import { Movie } from "../entities/Movie";
import { IMovie } from "../db/MovieSchema";
import { validate } from "class-validator";
import { MovieModel } from "../db";
import { SearchCondition } from "../entities/SearchCondition";
import { ISearchReult } from "../entities/CommonTypes";

export class MovieServices {
    public static async add(movie: Movie): Promise<IMovie | string[]> {
        // 转换类型
        // movie = Movie.transform(movie);
        movie = Movie.transform(movie);
        // 数据验证
        const errors = await movie.validateThis();
        if (errors.length > 0) {
           return errors;
       }
        // 添加到数据库
        return await MovieModel.create(movie);
    }

    public static async edit(id: string, movie: Movie): Promise<string[]> {
         // 转换类型
        const movieObj = Movie.transform(movie);
         // 数据验证
        const errors = await movieObj.validateThis(true);
        if (errors.length > 0) {
            return errors;
        }
        // 修改数据库
        await MovieModel.updateOne({ _id: id }, movie);
        return errors;
    }

    // 删除
    public static async delete(id: string): Promise<void> {
     await MovieModel.deleteOne({ _id: id });
    }

    // 根据id查询
    public static async findById(id: string): Promise<IMovie | null> {
        return await MovieModel.findById(id);
    }

    // 根据条件查询,查询电影
    public static async find(condition: SearchCondition): Promise<ISearchReult<IMovie>> {
          // 转换类型
        // movie = Movie.transform(movie);
       const conObj = SearchCondition.transform(condition);
        // 数据验证
       const errors = await conObj.validateThis(true);
       if (errors.length > 0) {
           return {
               count: 0,
               data: [],
               errors
           };
       }
    //    没有出错的话，查询
       const movies = await MovieModel.find({
           name: { $regex: new RegExp(conObj.key) } // 条件
       }).skip((conObj.page - 1) * conObj.limit).limit(conObj.limit); // 分页，跳过多少条，取多少条
    //   先找到总电影，和数量
       const count = await MovieModel.find({
           name: { $regex: new RegExp(conObj.key) }
       }).countDocuments();
       return {
           count,
           data: movies,
           errors: []
       };
    }
}
