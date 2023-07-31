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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_schema_1 = require("./schemas/user.schema");
const jwt_1 = require("@nestjs/jwt");
const handler_1 = require("./utils/handler");
const parameter_validator_1 = require("parameter-validator");
let UserController = class UserController {
    constructor(userService, jwtService, Handler) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.Handler = Handler;
    }
    signupUser(response, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let param = yield (0, parameter_validator_1.validateAsync)(user, ['name', 'email', 'password']);
                const newUser = yield this.userService.signup(user);
                let result = this.Handler.success(response, newUser);
                return result;
            }
            catch (error) {
                return this.Handler.errorException(response, error);
            }
        });
    }
    signinUser(response, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(user);
                let param = yield (0, parameter_validator_1.validateAsync)(user, ['email', 'password']);
                const result = yield this.userService.signin(user, this.jwtService);
                if (result && result.status && result.status.code === 1000) {
                    return response.status(200).json(result);
                }
                return response.status(401).json(result);
            }
            catch (error) {
                return this.Handler.errorException(response, error);
            }
        });
    }
};
__decorate([
    (0, common_1.Post)('/sign-up'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signupUser", null);
__decorate([
    (0, common_1.Post)('/sign-in'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signinUser", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService, jwt_1.JwtService, handler_1.Handler])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map