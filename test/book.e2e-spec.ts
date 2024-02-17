import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { LoginUserDto } from 'src/auth/dtos/loginUser.dto';

describe('Book (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const loginData: LoginUserDto = {
      email: process.env.TEST_EMAIL,
      password: process.env.TEST_PASSWORD,
    };

    const response: any = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send(loginData);
    
    accessToken = response.body.accessToken;
  }, 20000);

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/books')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect([{"name":"Book 1","category":"Category 1"},{"name":"Book 2","category":"Category 2"},{"name":"Book 3","category":"Category 3"}]);
  });
});
