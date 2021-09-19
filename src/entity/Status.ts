import {Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class status {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: number;

    @Column()
    comment: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

}