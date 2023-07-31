import { Model } from 'mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/create-post.dto';
export declare class BlogService {
    private readonly postModel;
    constructor(postModel: Model<Post>);
    getPosts(): Promise<Post[]>;
    getPost(postID: any): Promise<Post>;
    addPost(createPostDTO: CreatePostDTO): Promise<Post>;
    editPost(postID: any, createPostDTO: CreatePostDTO): Promise<Post>;
    deletePost(postID: any): Promise<any>;
}
