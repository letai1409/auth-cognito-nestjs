import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: '.dev.env', 
    }),
    BookModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
