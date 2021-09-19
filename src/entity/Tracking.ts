import {Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import { Status } from "./package.status";
import { Package } from "./Package";

@Entity()
export class TrackingHistory {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    packId: number

    @Column({
        type: "enum",
        enum: Status,
        default: Status.NOT_PROCESSED
    })
    status: Status


    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @ManyToOne(() => Package, pack => pack.trackings)
    pack: Package

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

}