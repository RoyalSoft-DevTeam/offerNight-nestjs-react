import { Injectable, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Handler } from './utils/handler';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private readonly Handler: Handler, private readonly jwtService: JwtService) { }

  // async getPosts(): Promise<User[]> {
  //   const posts = await this.userModel.find().exec();
  //   return posts;
  // }

  // async getPost(postID): Promise<User> {
  //   const post = await this.userModel
  //     .findById(postID)
  //     .exec();
  //   return post;
  // }

  async getOne(email): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
}

  async signup(user: User): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    const reqBody = {
        name: user.name,
        email: user.email,
        password: hash,
    }
    const newUser = new this.userModel(reqBody);
    let responseData = await newUser.save();
    return responseData
  }

  async signin(user: User): Promise<any> {
      try {
          const foundUser = await this.userModel.findOne({ email: user.email }).exec();
          if (foundUser) {
              const { password } = foundUser;
              let checkPassword = await bcrypt.compare(user.password, password);
              if (checkPassword) {
                
                  const payload = { email: user.email };
                  
                  let token = this.jwtService.sign(payload);
                  return this.Handler.successResponse({ token })
              }
              return this.Handler.erroresponse(HttpStatus.BAD_REQUEST, 'Incorrect username or password');
          }
          return this.Handler.erroresponse(HttpStatus.BAD_REQUEST, 'Incorrect username or password');
      } catch (error) {
          return this.Handler.erroresponse(HttpStatus.BAD_REQUEST, 'something went wrong please try again later');
      }
  }

  // async editPost(postID, createPostDTO: CreateUserDTO): Promise<User> {
  //   const editedPost = await this.userModel
  //     .findByIdAndUpdate(postID, createPostDTO, { new: true });
  //   return editedPost;
  // }

  // async deletePost(postID): Promise<any> {
  //   const deletedPost = await this.userModel
  //     .findByIdAndRemove(postID);
  //   return deletedPost;
  // }

}
