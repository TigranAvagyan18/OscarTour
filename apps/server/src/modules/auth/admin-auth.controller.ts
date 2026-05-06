import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminAuthService } from './admin-auth.service';
import { AdminLoginDto } from './dto/admin-login.dto';

export class AdminLoginResponseDto {
	accessToken: string;
}

@ApiTags('Admin Auth')
@Controller('auth/admin')
export class AdminAuthController {
	constructor(private readonly adminAuthService: AdminAuthService) {}

	@ApiOperation({ operationId: 'adminLogin' })
	@ApiOkResponse({ type: AdminLoginResponseDto })
	@Post('/login')
	async login(@Body() dto: AdminLoginDto): Promise<AdminLoginResponseDto> {
		return this.adminAuthService.login(dto);
	}
}
