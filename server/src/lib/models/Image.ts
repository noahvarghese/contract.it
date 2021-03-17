import { DataTypes, Optional } from "sequelize";
import {
    Model,
    Table,
    Column,
    AutoIncrement,
    HasOne,
    PrimaryKey,
    ForeignKey,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    BelongsTo,
} from "sequelize-typescript";
import Job from "./Job";

interface ImageAttributes {
    file: string;
    text: string;
}

// @Table({ tableName: "images" })
@Table
export default class Image
    extends Model<ImageAttributes>
    implements ImageAttributes {
    @Column(DataTypes.STRING)
    file: string;
    @Column(DataTypes.STRING)
    text: string;
    @ForeignKey(() => Job)
    job_id: number;
    @CreatedAt
    createdOn: Date;
    @UpdatedAt
    updateOn: Date;
    @DeletedAt
    deletedOn: Date;
    @BelongsTo(() => Job)
    job: Job;
}
