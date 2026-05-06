import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class ErrorInterceptor implements NestInterceptor {
	async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
		const controllerName = context.getClass().name;
		const request = context.switchToHttp().getRequest();
		request.controllerName = controllerName;

		return next.handle().pipe(
			catchError((error) => {
				return throwError(() => error);
			})
		);
	}
}
