import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    ManyToOne,
} from "typeorm";
import Status from "./Status";
import Image from "./Image";

@Entity({ name: "jobs" })
export default class Job extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined;
    @Column()
    first_name: string | undefined;
    @Column()
    last_name: string | undefined;
    @Column()
    email: string | undefined;
    @Column()
    phone: string | undefined;
    @Column()
    address: string | undefined;
    @Column()
    city: string | undefined;
    @Column()
    province: string | undefined;
    @Column()
    country: string | undefined;
    @Column()
    created_on: Date | undefined;
    @Column()
    updated_on: Date | undefined;
    @ManyToOne(() => Status, (status) => status.jobs)
    status: Status | undefined;
    @OneToMany(() => Image, (image) => image.job)
    images: Image[] | undefined;
}
