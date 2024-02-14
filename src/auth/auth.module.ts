import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AwsCognitoService } from './awsCognito.service';

@Module({
  controllers: [AuthController],
  providers: [AwsCognitoService]
})
export class AuthModule {}
