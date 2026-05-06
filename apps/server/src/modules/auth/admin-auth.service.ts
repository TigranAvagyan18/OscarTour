import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import config from 'src/config';
import { AdminLoginDto } from './dto/admin-login.dto';

@Injectable()
export class AdminAuthService {
	constructor(private readonly jwtService: JwtService) {}

	async login(dto: AdminLoginDto): Promise<{ accessToken: string }> {
		const validUsername = dto.username === config.ADMIN_USERNAME;
		const validPassword = dto.password === config.ADMIN_PASSWORD;

		if (!validUsername || !validPassword) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const accessToken = await this.jwtService.signAsync(
			{ isAdmin: true },
			{ expiresIn: '7d' }
		);

		return { accessToken };
	}
}
