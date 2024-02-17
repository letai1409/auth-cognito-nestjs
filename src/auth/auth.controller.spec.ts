import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AwsCognitoService } from './awsCognito.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeAll(() => {
    process.env.AWS_COGNITO_USER_POOL_ID = 'us-west-9_7uBye45rY'; // Mock the environment variable
    process.env.AWS_COGNITO_CLIENT_ID = 'mocked value'; // Mock the environment variable
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AwsCognitoService,
          useValue: new AwsCognitoService(process.env.AWS_COGNITO_USER_POOL_ID, process.env.AWS_COGNITO_CLIENT_ID),
        }, ], 
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
