import { IsBoolean, IsEmail, IsString, IsOptional } from 'class-validator';

export class CreateUserDTO {
	@IsOptional()
	@IsString()
	public readonly name: string | undefined;

	@IsOptional()
	@IsString()
	@IsEmail()
	public readonly email: string | undefined;

	@IsOptional()
	@IsBoolean()
	public readonly password: string | undefined;
}