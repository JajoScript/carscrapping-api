import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SigninDTO {
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'Debe ser un email valido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @Length(8, 20, {
    message: 'La contraseña debe tener entre 8 y 20 caracteres',
  })
  password: string;
}
