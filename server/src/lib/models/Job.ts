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
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    country: string;
}

@Entity()
export default class Job implements JobAttributes {
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column()
    public firstName!: string;
    @Column()
    public lastName!: string;
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
    @ManyToOne(() => Status, (status) => status.jobs)
    public status!: Status;
    @OneToMany(() => Image, (image) => image.job)
    public images!: Image[];
}
