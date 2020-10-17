import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  memberName: string;

  @Column()
  blogTitle: string;

  @Column()
  url: string;

  @Column()
  postedAt: Date;
}
