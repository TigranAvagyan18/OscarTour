import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import config from 'src/config';

@Injectable()
export class AdminGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();
		const token = this.extractToken(request);

		if (!token) throw new UnauthorizedException();

		const payload = await this.jwtService
			.verifyAsync(token, { secret: config.JWT_SECRET })
			.catch(() => null);

		if (!payload?.isAdmin) throw new UnauthorizedException();

		return true;
	}

	private extractToken(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
