import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Entry{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    direction: string;

    @Column()
    reference: string;

    @Column()
    userCreatorId: string;

    @Column({nullable: true})
    userInterestedId: string;

    @Column()
    creationDate: string;

    @Column()
    updateDate: string;

    @Column()
    status: string;

    @Column()
    outdated: boolean;
    
}