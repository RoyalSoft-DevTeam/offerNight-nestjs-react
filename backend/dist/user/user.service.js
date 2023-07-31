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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const handler_1 = require("./utils/handler");
const user_schema_1 = require("./schemas/user.schema");
let UserService = class UserService {
    constructor(userModel, Handler) {
        this.userModel = userModel;
        this.Handler = Handler;
    }
    getOne(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findOne({ email }).exec();
        });
    }
    signup(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt.genSalt();
            const hash = yield bcrypt.hash(user.password, salt);
            const reqBody = {
                name: user.name,
                email: user.email,
                password: hash,
            };
            const newUser = new this.userModel(reqBody);
            let responseData = yield newUser.save();
            return responseData;
        });
    }
    signin(user, jwt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundUser = yield this.userModel.findOne({ email: user.email }).exec();
                if (foundUser) {
                    const { password } = foundUser;
                    let checkPassword = yield bcrypt.compare(user.password, password);
                    if (checkPassword) {
                        const payload = { email: user.email };
                        let token = jwt.sign(payload);
                        return this.Handler.successResponse({ token });
                    }
                    return this.Handler.erroresponse(common_1.HttpStatus.BAD_REQUEST, 'Incorrect username or password');
                }
                return this.Handler.erroresponse(common_1.HttpStatus.BAD_REQUEST, 'Incorrect username or password');
            }
            catch (error) {
                return this.Handler.erroresponse(common_1.HttpStatus.BAD_REQUEST, 'something went wrong please try again later');
            }
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model, handler_1.Handler])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map