import { Stats } from "fs";
import { DataTypes, Optional } from "sequelize";
import {
    BelongsTo,
    Column,
    CreatedAt,
    DeletedAt,
    ForeignKey,
    HasOne,
    Model,
    Table,
    UpdatedAt,
} from "sequelize-typescript";
import Status from "./Status";

interface JobAttributes {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    country: string;
    createdOn: Date;
    updateOn: Date;
    deletedOn: Date;
}

@Table
export default class Job extends Model<JobAttributes> implements JobAttributes {
    @Column(DataTypes.STRING)
    first_name!: string;
    @Column(DataTypes.STRING)
    last_name!: string;
    @Column(DataTypes.STRING)
    email!: string;
    @Column(DataTypes.STRING)
    phone!: string;
    @Column(DataTypes.STRING)
    address!: string;
    @Column(DataTypes.STRING)
    city!: string;
    @Column(DataTypes.STRING)
    province!: string;
    @Column(DataTypes.STRING)
    country!: string;
    @CreatedAt
    createdOn: Date;
    @UpdatedAt
    updateOn: Date;
    @DeletedAt
    deletedOn: Date;
    @ForeignKey(() => Status)
    status_id: number;
    @BelongsTo(() => Status)
    status: Status;
}
