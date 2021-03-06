import { v4 as uuid } from 'uuid';
import { ITaskProps } from './task.types';

export class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  constructor({
    id = uuid(),
    title = 'task',
    order = 1,
    description = 'play',
    userId = null,
    boardId = null,
    columnId = null,
  }: ITaskProps) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
