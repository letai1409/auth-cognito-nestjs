import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { TestModule } from './test/test.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: '.dev.env', 
    }),
    TestModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
