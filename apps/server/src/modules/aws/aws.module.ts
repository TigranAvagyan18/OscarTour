import { Module } from '@nestjs/common';
import { AWS } from './aws.service';

@Module({
	providers: [AWS],
	exports: [AWS]
})
export class AwsModule {}
