import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    ManyToOne,
} from "typeorm";
import Job from "./Job";

@Entity({ name: "images" })
export default class Image extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined;
    @Column()
    file: string | undefined;
    @Column()
    text: string | undefined;
    @ManyToOne(() => Job, (job) => job.images)
    job: Job | undefined;
}
