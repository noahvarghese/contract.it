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
    image: string;
    label: string;
}

@Entity()
export default class Status implements StatusAttributes {
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column()
    public image!: string;
    @Column()
    public label!: string;
    @CreateDateColumn()
    public readonly createdOn!: Date;
    @UpdateDateColumn()
    public readonly updatedOn!: Date;
    @DeleteDateColumn()
    public readonly deletedOn!: Date;
    @OneToMany(() => Job, (job) => job.status)
    public jobs!: Job[];
}
