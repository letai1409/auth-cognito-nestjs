import { Controller, Get } from "@nestjs/common";
import { TestService } from "./test.service";
import { Test } from "./test.interface";

@Controller('api/v1/tests')
export class TestController {
    constructor(private testService: TestService) {}

    @Get()
    listAllTests(): Array<Test> {
        return this.testService.listAllTests();
    }
}
