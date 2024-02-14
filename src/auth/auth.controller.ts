import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AwsCognitoService } from './awsCognito.service';
import { LoginUserDto } from './dtos/loginUser.dto';
import { RegisterUserDto } from './dtos/registerUser.dto';

@Controller('api/v1/auth')
export class AuthController {
    constructor(private awsCognitoService: AwsCognitoService) { }

    @Post('/register')
    @UsePipes(ValidationPipe)
    async register(@Body() authRegisterUserDto: RegisterUserDto) {
        return await this.awsCognitoService.register(authRegisterUserDto);
    }

    @Post('/login')
    @UsePipes(ValidationPipe)
    async login(@Body() authLoginUserDto: LoginUserDto) {
        return await this.awsCognitoService.authenticate(authLoginUserDto);
    }
}
