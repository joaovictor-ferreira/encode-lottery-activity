import { Entity, Column, secondaryGeneratedColumn } from 'typeorm';

@Entity()
export class Votes {
  @secondaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column({type: 'bigint'})
  proposal : string;

  @Column({type: 'bigint'})
  amount: string;
}