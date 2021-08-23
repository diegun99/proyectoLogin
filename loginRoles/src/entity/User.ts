import {Entity, PrimaryGeneratedColumn, Column, Unique,CreateDateColumn, UpdateDateColumn} from "typeorm";
import { MinLength,IsNotEmpty} from "class-validator";

import * as bcrypt from 'bcryptjs';
// todo Is Email
@Entity()
@Unique(['username'])// le pasamos al decorador Unique el campo que queremos que sea unico, en este caso, username
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(3)
    username : string;

    @Column()
    @MinLength(6)
    password : string;

    @Column()
    @IsNotEmpty()
    role: string;

    @Column()
    @CreateDateColumn()
    createAt : Date;// cuando se creó el usuario

    @Column()
    @UpdateDateColumn()
    updateAt : Date;// cuando se modificó


    hashPassword(): void {// encriptar password
        const salt = bcrypt.genSaltSync(10);// genera un salt sincronicamente
        this.password = bcrypt.hashSync(this.password,salt);// genera un pasword encriptado, pasandole el password y un default 10;
    }

    checkPassword(password : string): boolean{
       return  bcrypt.compareSync(password,this.password);
    }

}
