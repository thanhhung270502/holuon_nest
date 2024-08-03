import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: true })
    date_birth: Date;

    @Column({ nullable: true })
    gender: string;

    @Column({ nullable: true })
    phone_number: string;

    @Column('bytea')
    avatar: Buffer;

    @Column({ nullable: true })
    avatar_url: string;

    @Column({ nullable: true })
    role: string;

    @Column({ nullable: true })
    provider: string;

    @Column({ nullable: true })
    hashedRt: string;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
}
