"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user.service");
const handler_1 = require("../utils/handler");
let isAuthenticated = class isAuthenticated {
    constructor(jwt, userService, Handler) {
        this.jwt = jwt;
        this.userService = userService;
        this.Handler = Handler;
    }
    use(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.headers.authorization &&
                    req.headers.authorization.startsWith('Bearer')) {
                    const token = req.headers.authorization.split(' ')[1];
                    const decoded = yield this.jwt.verify(token);
                    const user = yield this.userService.getOne(decoded.email);
                    if (user) {
                        req.user = user;
                        next();
                    }
                    else {
                        return this.Handler.errorException(res, 'Access denied');
                    }
                }
                else {
                    return this.Handler.errorException(res, 'No token found');
                }
            }
            catch (_a) {
                return this.Handler.errorException(res, 'No token found');
            }
        });
    }
};
isAuthenticated = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, user_service_1.UserService, handler_1.Handler])
], isAuthenticated);
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=authentication.middleware.js.map