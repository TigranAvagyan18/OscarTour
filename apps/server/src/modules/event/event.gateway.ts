import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import config from 'src/config';
import { UserService } from '../user/user.service';

@WebSocketGateway({
	transports: ['websocket', 'polling'],
	cors: { origin: config.APP_URL, credentials: true }
})
export class EventGateway implements OnGatewayConnection {
	private readonly logger = new Logger(EventGateway.name);

	@WebSocketServer()
	server: Server;

	constructor(
		private readonly jwtService: JwtService,
		private readonly userService: UserService
	) {}

	afterInit(server: Server) {
		server.use(async (socket, next) => {
			try {
				const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];

				if (!token) {
					this.logger.warn(`Connection rejected: No token provided from ${socket.handshake.address}`);
					return next(new Error('Authentication token required'));
				}

				const payload = await this.jwtService.verifyAsync(token, {
					secret: config.JWT_SECRET
				});

				const user = await this.userService.getById(payload.id);

				if (!user) {
					this.logger.warn(`Connection rejected: User not found for token`);
					return next(new Error('User not found'));
				}

				socket.data.userId = user.id;
				socket.data.userRole = user.role;
				socket.data.userEmail = user.mail;

				this.logger.log(`Socket authenticated during handshake - User: ${user.id} (${user.role})`);
				next();
			} catch (error) {
				this.logger.error(`Authentication failed during handshake: ${error.message}`);
				next(new Error('Authentication failed'));
			}
		});
	}

	handleConnection(client: Socket) {
		this.logger.log(`Client connected: ${client.id} - User: ${client.data.userId} (${client.data.userRole})`);
	}

	async emit(event: string, to: string | number, data: any) {
		this.server.to(to.toString()).emit(event, data);
		this.logger.debug(`Event '${event}' emitted to room '${to}' across all instances`);
	}

	async emitToUser(event: string, userId: number, data: any) {
		const sockets = await this.server.fetchSockets();
		const userSockets = sockets.filter((socket) => socket.data.userId === userId);

		if (userSockets.length === 0) {
			this.logger.warn(`User ${userId} has no connected sockets`);
			return false;
		}

		userSockets.forEach((socket) => {
			socket.emit(event, data);
		});

		this.logger.debug(`Event '${event}' emitted to user ${userId} (${userSockets.length} socket(s))`);
		return true;
	}

	async getConnectedSockets() {
		const sockets = await this.server.fetchSockets();
		const connectedClients = [];

		sockets.forEach((socket) => {
			connectedClients.push({
				socketId: socket.id,
				userId: socket.data.userId || null,
				userRole: socket.data.userRole || null,
				userEmail: socket.data.userEmail || null,
				connected: true,
				rooms: Array.from(socket.rooms).filter((room) => room !== socket.id)
			});
		});

		return {
			total: connectedClients.length,
			authenticated: connectedClients.filter((c) => c.userId).length,
			clients: connectedClients
		};
	}

	async getUserSockets(userId: number) {
		const sockets = await this.server.fetchSockets();
		const userSockets = sockets.filter((socket) => socket.data.userId === userId);

		return {
			userId,
			socketCount: userSockets.length,
			sockets: userSockets.map((socket) => ({
				socketId: socket.id,
				connected: true,
				rooms: Array.from(socket.rooms).filter((room) => room !== socket.id)
			}))
		};
	}

	@SubscribeMessage('join-room')
	joinRoom(@MessageBody() roomId: string, @ConnectedSocket() client: Socket) {
		client.join(roomId);
		this.logger.log(`Socket ${client.id} (User: ${client.data.userId || 'unknown'}) joined room: ${roomId}`);
	}

	// @SubscribeMessage('leave-chat')
	// leaveChat(@MessageBody() chatId: string, @ConnectedSocket() client: Socket) {
	// 	client.leave(chatId);
	// }

	// @SubscribeMessage('join-admin')
	// joinAdmin(@ConnectedSocket() client: Socket) {
	// 	client.join('admin');
	// }
}
