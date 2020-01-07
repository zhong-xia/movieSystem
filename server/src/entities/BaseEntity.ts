import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";

export class BaseEntity {
    // 验证当前电影对象
    public async validateThis(skipMissing = false): Promise<string[]> {
        // validate(this)
        const errors = await validate(this, {
            skipMissingProperties: skipMissing // 设置要改的地方进行验证，不改的不验证跳过，有的操作需要有的不需要，通过传递的参数判断
        });
        const temp = errors.map(e => Object.values(e.constraints));
        const result: string[] = [];
        temp.forEach(t => {
            result.push(...t);
        });
        return result;
    }

     /**
     *  将一个平面对象转换为Movie类的对象
     * @param plainObject 平面对象
     */
    protected static baseTransform<T>(cls: ClassType<T>, plainObject: object): T {
        if (plainObject instanceof cls) {
           return plainObject;
        }
        return plainToClass(cls, plainObject);
    }
}
