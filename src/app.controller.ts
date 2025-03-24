import { AppService } from './app.service';
import { Controller, Get, Param, Redirect, Req } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('r/:path')
  @Redirect()
  async redirect(@Req() request: Request, @Param('path') path: string) {
    return { url: await this.appService.redirect(path) };
  }
}
