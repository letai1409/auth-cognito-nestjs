import { Injectable } from '@nestjs/common';
import { BookResponseDto } from './dtos/bookResponse.dto';

@Injectable()
export class BookService {
    listAllBooks(): Array<BookResponseDto> {
        return [
            {
                name: 'Book 1',
                category: 'Category 1',
            },
            {
                name: 'Book 2',
                category: 'Category 2',
            },
            {
                name: 'Book 3',
                category: 'Category 3',
            },
        ];
    }
}
