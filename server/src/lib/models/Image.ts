import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
} from "typeorm";
import Job from "./Job";

export interface ImageAttributes {
    file: string;
    text: string;
}

@Entity()
export default class Image implements ImageAttributes {
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column()
    public file!: string;
    @Column()
    public text!: string;
    @CreateDateColumn()
    public readonly createdOn!: Date;
    @UpdateDateColumn()
    public readonly updatedOn!: Date;
    @DeleteDateColumn()
    public readonly deletedOn!: Date;
    @ManyToOne(() => Job, (job) => job.images)
    public job!: Job;
}
