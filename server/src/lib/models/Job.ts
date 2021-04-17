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
    OneToMany,
    ManyToOne,
} from "typeorm";
import Image from "./Image";

import Status from "./Status";

interface JobAttributes {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    country: string;
    statusId: number;
}

@Entity()
export default class Job implements JobAttributes {
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column()
    public name!: string;
    @Column()
    public email!: string;
    @Column()
    public phone!: string;
    @Column()
    public address!: string;
    @Column()
    public city!: string;
    @Column()
    public province!: string;
    @Column()
    public country!: string;
    @CreateDateColumn()
    public readonly createdOn!: Date;
    @UpdateDateColumn()
    public readonly updatedOn!: Date;
    @DeleteDateColumn()
    public readonly deletedOn!: Date;
    @Column()
    public statusId!: number;
    @ManyToOne(() => Status, (status) => status.jobs)
    public status!: Status;
    @OneToMany(() => Image, (image) => image.job)
    public images!: Image[];
}
