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
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let BlogService = class BlogService {
    constructor(postModel) {
        this.postModel = postModel;
    }
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield this.postModel.find().exec();
            return posts;
        });
    }
    getPost(postID) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.postModel
                .findById(postID)
                .exec();
            return post;
        });
    }
    addPost(createPostDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = yield new this.postModel(createPostDTO);
            return newPost.save();
        });
    }
    editPost(postID, createPostDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const editedPost = yield this.postModel
                .findByIdAndUpdate(postID, createPostDTO, { new: true });
            return editedPost;
        });
    }
    deletePost(postID) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedPost = yield this.postModel
                .findByIdAndRemove(postID);
            return deletedPost;
        });
    }
};
BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Post')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], BlogService);
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map