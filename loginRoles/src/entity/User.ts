import {Entity, PrimaryGeneratedColumn, Column, Unique,CreateDateColumn, UpdateDateColumn} from "typeorm";
import { MinLength,IsNotEmpty} from "class-validator";

@Entity()
@Unique(['username'])// le pasamos al decorador Unique el campo que queremos que sea unico, en este caso, username
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(14)
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

}
