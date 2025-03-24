import { AppService } from './app.service';
import { Controller, Get, Param, Redirect, Req } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('r/:path')
  @Redirect()
  async getHello(@Req() request: Request, @Param('path') path: string) {
    return this.appService.redirect(path);
  }
}
