import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { ResponseObject } from '../response/responseObject';
import { Logger } from '@nestjs/common';
import { ChangePasswordCredentialsDto } from './dto/changePassword-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<ResponseObject> {
        const { email, password, name, avatar } = authCredentialsDto;

        // hash
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.usersRepository.create({
            email,
            password: hashedPassword,
            name,
            avatar,
            role: 1,
            created_at: new Date(),
            updated_at: new Date(),
        });

        try {
            const saveUser = await this.usersRepository.save(user);
            // console.log(saveUser);
            Logger.log(saveUser);
            const payload: JwtPayload = { email };
            const accessToken: string = this.jwtService.sign(payload);
            return new ResponseObject(200, 'Signup successfully', {
                id: saveUser.id,
                email: saveUser.email,
                name: saveUser.name,
                avatar: saveUser.avatar,
                accessToken: accessToken,
            });
        } catch (error) {
            if (error.code === '23505') {
                // duplicate username
                // throw new ConflictException('Username already exists');
                return new ResponseObject(409, 'Username already exists', {});
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async login(userinfo: User): Promise<ResponseObject> {
        const { email, password } = userinfo;

        const user = await this.usersRepository.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            return new ResponseObject(404, 'This username is not exist', {});
        } else if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { email };
            const accessToken: string = this.jwtService.sign(payload);
            return new ResponseObject(200, 'Login successfully', {
                id: user.id,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
                accessToken: accessToken,
            });
        } else {
            // throw new UnauthorizedException('Please check your login credentials');
            return new ResponseObject(401, 'This password is wrong', {});
        }
    }

    async getUserByID(user_id: string): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: {
                id: user_id,
            },
        });

        if (!user) {
            throw new NotFoundException(`User with id ${user_id} not found`);
        }

        return user;
    }

    async getAllUsers(): Promise<User[]> {
        const allUsers = await this.usersRepository.find();

        if (!allUsers) throw new NotFoundException(`Users not found`);

        return allUsers;
    }

    async update(info: User, user_id: string): Promise<ResponseObject> {
        const user = await this.usersRepository.findOne({
            where: {
                id: user_id,
            },
        });

        if (!user) {
            return new ResponseObject(404, `User with id ${user_id} not found`, {});
        }

        const newUser = await this.usersRepository.update(
            { id: user_id },
            {
                avatar: info.avatar,
                name: info.name,
            },
        );

        return new ResponseObject(200, 'Update user successfully', newUser);
    }

    async delete(user_id: string): Promise<ResponseObject> {
        const user = await this.usersRepository.findOne({
            where: {
                id: user_id,
            },
        });
        console.log('user');

        if (!user) {
            return new ResponseObject(404, `User with id ${user_id} not found`, {});
        }

        await this.usersRepository.delete({ id: user_id });
        return new ResponseObject(200, 'Delete user successfully', {});
    }

    async changePassword(user_id: string, body: ChangePasswordCredentialsDto): Promise<ResponseObject> {
        const { oldPassword, password } = body;

        const user = await this.usersRepository.findOne({
            where: {
                id: user_id,
            },
        });

        if (!user) {
            return new ResponseObject(404, `User with id ${user_id} not found`, {});
        } else if (user && (await bcrypt.compare(oldPassword, user.password))) {
            // hash
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await this.usersRepository.update(
                { id: user_id },
                {
                    password: hashedPassword,
                },
            );
            return new ResponseObject(200, 'Change Password successfully', newUser);
        } else {
            // throw new UnauthorizedException('Please check your login credentials');
            return new ResponseObject(401, 'This oldPassword is wrong', {});
        }
    }
}
