import { Injectable } from '@nestjs/common';
import { Test } from './test.interface';

@Injectable()
export class TestService {
    listAllTests(): Array<Test> {
        return [
            {
                name: 'Test 1',
                category: 'Category 1',
            },
            {
                name: 'Test 2',
                category: 'Category 2',
            },
            {
                name: 'Test 3',
                category: 'Category 3',
            },
        ];
    }
}
