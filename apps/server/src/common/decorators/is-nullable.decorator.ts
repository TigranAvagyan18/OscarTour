import { ValidateIf } from 'class-validator';
export function IsNullable() {
	return ValidateIf((_object, value) => value !== null);
}
