import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Feedback extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	userId: number;

	@Column()
	message: string;

	@CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
	createdAt: Date;
}
