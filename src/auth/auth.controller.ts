import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { ResponseObject } from '../response/responseObject';
import { ChangePasswordCredentialsDto } from './dto/changePassword-credentials.dto';
import { AtGuard } from 'src/guards/at.guard';
import { GetCurrentUserId } from 'src/decorators';
import { RtGuard } from 'src/guards';
import { GetRefreshToken } from 'src/decorators/get-refresh-token.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/')
  signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<ResponseObject> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/login')
  login(@Body() userInfo: User): Promise<ResponseObject> {
    return this.authService.login(userInfo);
  }

  @UseGuards(AtGuard)
  @Post('/logout')
  logout(@GetCurrentUserId() id: string): Promise<ResponseObject> {
    return this.authService.logout(id);
  }

  @UseGuards(RtGuard)
  @Post('/refresh-token')
  refreshToken(
    @GetCurrentUserId() id: string,
    @GetRefreshToken() rt: string,
  ): Promise<ResponseObject> {
    return this.authService.refreshToken(id, rt);
  }

  @UseGuards(AtGuard)
  @Post('/:id/changePassword')
  changePassword(
    @Param('id') id: string,
    @Body() body: ChangePasswordCredentialsDto,
  ): Promise<ResponseObject> {
    return this.authService.changePassword(id, body);
  }

  @Put('/:id')
  update(@Body() info: User, @Param('id') id: string): Promise<ResponseObject> {
    return this.authService.update(info, id);
  }

  @UseGuards(AtGuard)
  @Put('/update/profile')
  updateProfile(
    @GetCurrentUserId() id: string,
    @Body() info: User,
  ): Promise<ResponseObject> {
    return this.authService.updateProfile(info, id);
  }

  @UseGuards(AtGuard)
  @Get('/me')
  getUserByID(@GetCurrentUserId() id: string): Promise<User> {
    return this.authService.getUserByID(id);
  }

  @Delete('/destroy')
  delete(@GetCurrentUserId() id: string): Promise<ResponseObject> {
    return this.authService.delete(id);
  }

  @Get('/')
  getAllUsers(): Promise<User[]> {
    return this.authService.getAllUsers();
  }
}
