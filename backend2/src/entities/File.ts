import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("files")
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hasBeenProcessed: boolean;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  encoding: string;
}
