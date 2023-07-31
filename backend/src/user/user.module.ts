import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { Handler } from './utils/handler';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: "sew9939pwpppwpeokdffjfjriru44030423-edmmfvnvdmjrp4l4k",
      signOptions: { expiresIn: '1h' },
    }),
    UserModule
  ],
  controllers: [UserController],
  providers: [UserService, Handler],
})
export class UserModule {
}
