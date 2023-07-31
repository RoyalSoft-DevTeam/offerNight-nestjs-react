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
exports.Handler = void 0;
const common_1 = require("@nestjs/common");
let Handler = class Handler {
    constructor() { }
    success(response, responseData) {
        return __awaiter(this, void 0, void 0, function* () {
            return response.status(common_1.HttpStatus.CREATED).json({
                status: {
                    code: 1000,
                    header: "success",
                    description: "sucess"
                },
                data: responseData
            });
        });
    }
    errorException(response, error) {
        let message = 'something went wrong please try again later';
        if (error && error.code == 11000) {
            message = "Duplicate value";
        }
        if (typeof error === "string") {
            message = error;
        }
        console.log(error);
        return response.status(400).json({
            status: {
                code: (error && error.code) || 1999,
                header: "Invalid request",
                description: message
            },
            data: null
        });
    }
    successResponse(responseData) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                status: {
                    code: 1000,
                    header: "success",
                    description: "sucess"
                },
                data: responseData
            };
        });
    }
    erroresponse(code, responseData) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                status: {
                    code: code || 1999,
                    header: "Invalid request",
                    description: responseData
                },
                data: null
            };
        });
    }
};
Handler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], Handler);
exports.Handler = Handler;
//# sourceMappingURL=handler.js.map