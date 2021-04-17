/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
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
