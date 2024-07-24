import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    date_birth: Date;

    @Column()
    gender: string;

    @Column()
    phone_number: string;

    @Column('bytea')
    avatar: Buffer;

    @Column()
    avatar_url: string;

    @Column()
    role: number;

    @Column()
    provider: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
