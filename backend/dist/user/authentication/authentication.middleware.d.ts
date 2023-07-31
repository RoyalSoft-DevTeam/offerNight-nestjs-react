import { JwtService } from '@nestjs/jwt';
import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../user.service';
import { Handler } from "../utils/handler";
interface UserRequest extends Request {
    user: any;
}
export declare class isAuthenticated implements NestMiddleware {
    private readonly jwt;
    private readonly userService;
    private Handler;
    constructor(jwt: JwtService, userService: UserService, Handler: Handler);
    use(req: UserRequest, res: Response, next: NextFunction): Promise<any>;
}
export {};
