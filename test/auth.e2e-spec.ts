import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('POST /auth/login', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('should login an existing user', async () => {
        const response = await request(app.getHttpServer())
            .post('/api/v1/auth/login')
            .send({
                email: process.env.TEST_EMAIL,
                password: process.env.TEST_PASSWORD,
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('accessToken');
        expect(response.body).toHaveProperty('refreshToken');
    }, 20000);

    it('should return an error for invalid credentials', async () => {
        const response = await request(app.getHttpServer())
            .post('/api/v1/auth/login')
            .send({
                username: 'testuser',
                password: 'wrongpassword',
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', [ 'email must be an email', 'invalid password' ]);
    });
});

