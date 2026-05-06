import crypto from 'crypto';

import { customAlphabet } from 'nanoid';
import config from 'src/config';

export const encrypt = (obj: Record<string, any>) => {
	const cipher = crypto.createCipher('aes-128-cbc', config.JWT_SECRET);
	let encrypted = cipher.update(JSON.stringify(obj), 'utf8', 'hex');
	encrypted += cipher.final('hex');
	return encrypted;
};

export const decrypt = (encryptedText: string) => {
	try {
		const decipher = crypto.createDecipher('aes-128-cbc', config.JWT_SECRET);
		let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
		decrypted += decipher.final('utf8');
		return decrypted;
	} catch (error) {
		return '{}';
	}
};

export const uid = (length = 6) =>
	customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', length)();

export const generateOtp = (length = 6) => customAlphabet('0123456789', length)();
