import { IsNotEmpty, ArrayMinSize, IsInt, Min, Max, IsArray, validate } from "class-validator";
import { Type, plainToClass } from "class-transformer";
import { BaseEntity } from "./BaseEntity";
// 实体类，添加验证
// export class Movie {
export class Movie extends BaseEntity{
    @IsNotEmpty({ message: "电影名称不可以为空" })
    @Type(() => String)
    public name: string;

    @IsNotEmpty({ message: "电影类型不可以为空"})
    @ArrayMinSize(1, { message: "电影类型至少有一个" })
    @IsArray({ message: "电影类型必须是数组" })
    @Type(() => String)
    public types: string[];

    @IsNotEmpty({ message: "上映地区不可以为空"})
    @ArrayMinSize(1, { message: "上映地区至少有一个" })
    @IsArray({ message: "上映地区必须是数组" })
    @Type(() => String)
    public areas: string[];

    @IsNotEmpty({ message: "时长不可以为空"})
    @IsInt({ message: "时长必须是整数" })
    @Min(1, { message: "时长最小1分钟"})
    @Max(999999, { message: "时长过长"})
    @Type(() => Number)
    public timeLong: number;

    @IsNotEmpty({ message: "是否热映不可以为空"})
    @Type(() => Boolean)
    public isHot: boolean = false;

    @IsNotEmpty({ message: "是否即将上映不可以为空"})
    @Type(() => Boolean)
    public isComing: boolean = false;

    @IsNotEmpty({ message: "是否经典影片不可以为空"})
    @Type(() => Boolean)
    public isClassic: boolean = false;

    @Type(() => String)
    public description?: string;

    @Type(() => String)
    public poster?: string;
    key: string | RegExp;
    page: number;
    limit: number;

    // 验证当前电影对象
    // public async validateThis(skipMissing = false): Promise<string[]> {
    //     // validate(this)
    //     const errors = await validate(this, {
    //         skipMissingProperties: skipMissing // 设置要改的地方进行验证，不改的不验证跳过，有的操作需要有的不需要，通过传递的参数判断
    //     });
    //     const temp = errors.map(e => Object.values(e.constraints));
    //     const result: string[] = [];
    //     temp.forEach(t => {
    //         result.push(...t);
    //     });
    //     return result;
    // }

    /**
     * 将一个平面对象转换为Movie类的对象
     * @param plainObject 平面对象
     */
    public static transform(plainObject: object): Movie {
        // if (plainObject instanceof Movie) {
        //    return plainObject;
        // }
        // return plainToClass(Movie, plainObject);
        return super.baseTransform(Movie, plainObject); // 调用父类的方法，因为这里已经把重复代码提出，就可以调用父类中的方法
    }
}
