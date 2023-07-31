import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Handler } from './utils/handler';
export declare class UserController {
    private userService;
    private jwtService;
    private Handler;
    constructor(userService: UserService, jwtService: JwtService, Handler: Handler);
    signupUser(response: any, user: User): Promise<any>;
    signinUser(response: any, user: User): Promise<any>;
}
