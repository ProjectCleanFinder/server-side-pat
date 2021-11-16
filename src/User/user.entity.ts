import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class User{
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    username: string;
    @Column()
    name: string;
    @Column()
    password: string;
    @Column()
    email: string;
}