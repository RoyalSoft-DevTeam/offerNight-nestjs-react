import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Handler } from './utils/handler';
import { User, UserDocument } from './schemas/user.schema';
export declare class UserService {
    private userModel;
    private readonly Handler;
    constructor(userModel: Model<UserDocument>, Handler: Handler);
    getOne(email: any): Promise<User>;
    signup(user: User): Promise<User>;
    signin(user: User, jwt: JwtService): Promise<any>;
}
