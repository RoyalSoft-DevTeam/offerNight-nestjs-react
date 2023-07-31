import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import { JwtService } from '@nestjs/jwt';
import { Handler } from './utils/handler';
import { validateAsync} from 'parameter-validator';


@Controller('user')
export class UserController {

  constructor(private userService: UserService, private jwtService: JwtService, private Handler: Handler) { }

  // Sign-up a user
  @Post('/sign-up')
  async signupUser(@Res() response, @Body() user: User) {
    try {
      /**
       * validate missing params
       */
      let param = await validateAsync(user, ['name', 'email', 'password']);
      /**
       * saving user record
       */
      const newUser = await this.userService.signup(user);
      let result = this.Handler.success(response, newUser);
      return result
    }
    catch (error) {
        return this.Handler.errorException(response, error);
    }
  }

  // Sign-in a user
  @Post('/sign-in')
  async signinUser(@Res() response, @Body() user: User) {
    try {
      /**
       * validate user input
       */

      let param = await validateAsync(user, ['email', 'password']);
      const result = await this.userService.signin(user);
      if (result && result.status && result.status.code === 1000) {
          return response.status(200).json(result);
      }
      return response.status(401).json(result);
    }
    catch (error) {
        return this.Handler.errorException(response, error);
    }
  }

  // // Fetch all posts
  // @Get('sign-in')
  // async getPosts(@Res() res) {
  //   console.log("sign-in")
  //   const posts = await this.userService.getPosts();
  //   return res.status(HttpStatus.OK).json(posts);
  // }

  // // Fetch a particular post using ID
  // @Get('post/:postID')
  // async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
  //   const post = await this.userService.getPost(postID);
  //   if (!post) throw new NotFoundException('Post does not exist!');
  //   return res.status(HttpStatus.OK).json(post);

  // }

  // // Edit a particular post using ID
  // @Put('/edit')
  // async editPost(
  //   @Res() res,
  //   @Query('postID', new ValidateObjectId()) postID,
  //   @Body() createUserDTO: CreateUserDTO
  // ) {
  //   const editedPost = await this.userService.editPost(postID, createUserDTO);
  //   if (!editedPost) throw new NotFoundException('Post does not exist!');
  //   return res.status(HttpStatus.OK).json({
  //     message: 'Post has been successfully updated',
  //     post: editedPost
  //   })
  // }

  // // Delete a post using ID
  // @Delete('/delete')
  // async deletePost(@Res() res, @Query('postID', new ValidateObjectId()) postID) {
  //   const deletedPost = await this.userService.deletePost(postID);
  //   if (!deletedPost) throw new NotFoundException('Post does not exist!');
  //   return res.status(HttpStatus.OK).json({
  //     message: 'Post has been deleted!',
  //     post: deletedPost
  //   })
  // }
}
