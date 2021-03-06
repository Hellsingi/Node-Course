import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BoardDB } from './Board';

@Entity({ name: 'column' })
export class ColumnDB {

  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column('varchar', { length: 25 })
  title: string;

  @Column('integer')
  order: number;

  @ManyToOne(() => BoardDB, board => board.id)
  boardId: string;
}