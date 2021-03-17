import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
} from "typeorm";
import Job from "./Job";

@Entity({ name: "statuses" })
export default class Status extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined;
    @Column()
    file: string | undefined;
    @Column()
    text: string | undefined;
    @OneToMany(() => Job, (job) => job.status)
    jobs: Job[] | undefined;
}
