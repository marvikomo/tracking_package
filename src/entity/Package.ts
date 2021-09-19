import {Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import {Status} from "./package.status"
import { TrackingHistory } from "./Tracking";
@Entity()
export class Package {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tracking_id: string;

    @Column({
        type: "enum",
        enum: Status,
        default: Status.NOT_PROCESSED
    })
    status: Status

    @OneToMany(() => TrackingHistory, tracking => tracking.pack)
    trackings: TrackingHistory[];

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

}