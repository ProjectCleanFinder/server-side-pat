import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class User{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    username: string;
    @Column()
    alias: string;
    @Column()
    password: string;
    @Column()
    email: string;
}