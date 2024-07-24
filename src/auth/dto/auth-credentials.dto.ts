import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(100)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password is too weak',
    })
    password: string;

    @IsString()
    name: string;

    @IsString()
    avatar: string;

    role: number;

    created_at: Date;
    updated_at: Date;
}
