import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import config from 'src/config';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
	constructor(
		private readonly jwtService: JwtService,
		private readonly userService: UserService
	) {}

	async use(request: Request, response: Response, next: NextFunction) {
		const token = this.extractToken(request);
		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: config.JWT_SECRET
			});
			const user = await this.userService.getById(payload.id);
			//@ts-ignore
			request.currentUser = user;
			request.token = token;
		} catch (error) {
			// request.currentUser = null;
			// request.token = null;
			// response.cookie('token', '', {
			// 	expires: new Date(0),
			// 	sameSite: 'none',
			// 	secure: true,
			// 	domain: config.APP_ENV === 'production' ? '.FlowerFinder.be' : undefined
			// });
		}

		return next();
	}

	private extractToken(request: Request) {
		const token = request.headers['authorization']?.split(' ')[1] || request.cookies['token'];
		if (!token) {
			return null;
		}
		return token;
	}
}
