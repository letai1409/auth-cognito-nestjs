import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AwsCognitoService } from './awsCognito.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [
    {
      provide: AwsCognitoService,
      useValue: new AwsCognitoService(process.env.AWS_COGNITO_USER_POOL_ID, process.env.AWS_COGNITO_CLIENT_ID),
    },
    JwtStrategy,
  ],
})
export class AuthModule {}
