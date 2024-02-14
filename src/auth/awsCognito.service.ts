import { Injectable } from '@nestjs/common';
import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { LoginUserDto } from './dtos/loginUser.dto';
import { RegisterUserDto } from './dtos/registerUser.dto';

@Injectable()
export class AwsCognitoService {
    private userPool: CognitoUserPool;

    constructor() {
        this.userPool = new CognitoUserPool({
            UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
            ClientId: process.env.AWS_COGNITO_CLIENT_ID,
        });
    }

    async register(registerUserDto: RegisterUserDto) {
        const { name, email, password } = registerUserDto;

        return new Promise((resolve, reject) => {
            this.userPool.signUp(
                email,
                password,
                [
                    new CognitoUserAttribute({
                        Name: 'name',
                        Value: name,
                    }),
                ],
                null,
                (err, result) => {
                    if (!result) {
                        reject(err);
                    } else {
                        resolve(result.user);
                    }
                },
            );
        });
    }

    async authenticate(authLoginUserDto: LoginUserDto) {
        const { email, password } = authLoginUserDto;
        const userData = {
            Username: email,
            Pool: this.userPool,
        };

        const authenticationDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        });

        const userCognito = new CognitoUser(userData);

        return new Promise((resolve, reject) => {
            userCognito.authenticateUser(authenticationDetails, {
                onSuccess: (result) => {
                    resolve({
                        accessToken: result.getAccessToken().getJwtToken(),
                        refreshToken: result.getRefreshToken().getToken(),
                    });
                },
                onFailure: (err) => {
                    reject(err);
                },
            });
        });
    }
}
