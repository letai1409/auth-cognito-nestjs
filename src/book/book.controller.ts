import { Controller, Get, UseGuards } from "@nestjs/common";
import { BookService } from "./book.service";
import { BookResponseDto } from "./dtos/bookResponse.dto";
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api/v1/books')
@ApiTags('Books')
export class BookController {
    constructor(private bookService: BookService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @ApiOperation({ summary: 'Get all books' })
    @ApiResponse({ status: 200, description: 'Returns an array of books', type: [BookResponseDto] })
    listAllBooks(): Array<BookResponseDto> {
        return this.bookService.listAllBooks();
    }
}
