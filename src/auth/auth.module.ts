import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AwsCognitoService } from './awsCognito.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AwsCognitoService, JwtStrategy],
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })]
})
export class AuthModule {}
