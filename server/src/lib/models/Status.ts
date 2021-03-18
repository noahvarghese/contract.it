import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import Job from "./Job";

interface StatusAttributes {
    file: string;
    text: string;
}

@Entity()
export default class Status implements StatusAttributes {
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column()
    public file!: string;
    @Column()
    public text!: string;
    @CreateDateColumn()
    public readonly createdOn!: Date;
    @UpdateDateColumn()
    public readonly updateOn!: Date;
    @DeleteDateColumn()
    public readonly deletedOn!: Date;
    @OneToMany(() => Job, (job) => job.status)
    public jobs!: Job[];
}
