import { DataTypes } from "sequelize";
import {
    Model,
    Column,
    Table,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
} from "sequelize-typescript";

interface StatusAttributes {
    file: string;
    text: string;
}

// @Table({ tableName: "statuses" })
@Table
export default class Status
    extends Model<StatusAttributes>
    implements StatusAttributes {
    @Column(DataTypes.STRING)
    file!: string;
    @Column(DataTypes.STRING)
    text!: string;
    @CreatedAt
    createdOn: Date;
    @UpdatedAt
    updateOn: Date;
    @DeletedAt
    deletedOn: Date;
}
