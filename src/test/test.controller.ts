import { Controller, Get, UseGuards } from "@nestjs/common";
import { TestService } from "./test.service";
import { Test } from "./test.interface";
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/tests')
export class TestController {
    constructor(private testService: TestService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    listAllTests(): Array<Test> {
        return this.testService.listAllTests();
    }
}
