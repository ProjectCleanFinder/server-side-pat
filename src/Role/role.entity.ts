import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Role{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    puntutation: number;

    @Column()
    description: string;

    @Column()
    imageURL:    string;

    @Column("uuid")
    userId: string;

    @Column()
    type: string;

    @Column()
    creationDate: string;

    @Column()
    updateDate: string;
}