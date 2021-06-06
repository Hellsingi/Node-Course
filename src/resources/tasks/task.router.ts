import { Request, Response, Router, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Task } from './task.model';
import * as tasksService from './task.service';
import { ExtendedError } from '../../logger/logger';
import { taskValidation } from '../../middleware/errorHandler';

const router = Router({ mergeParams: true });
// const router = require('express').Router({ mergeParams: true });

router.get('/', async (_req: Request, res: Response) => {
  const tasks = await tasksService.getAll();
  res.json(tasks);
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    taskValidation(req);

    const { boardId } = req.params;

    const task = await new Task({
      ...req.body,
      boardId,
    });
    tasksService.create(task);
    res.status(StatusCodes.CREATED).json(task);
  } catch (err) {
    next(err);
  }

});

router.get('/:taskId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params;
    const task = await tasksService.getById(taskId as string);

    if (!task) {
      throw new ExtendedError(StatusCodes.NOT_FOUND, "Task not found.");
    } else {
      res.status(StatusCodes.OK).json(task);
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:taskId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    taskValidation(req);
    const { taskId } = req.params;
    const task = await tasksService.getById(taskId as string);
    if (!task) {
      throw new ExtendedError(StatusCodes.NOT_FOUND, "Task not found.");
    }
    const updateTask = await tasksService.update(task, req.body);
    res.json(updateTask);
  } catch (err) {
    next(err);
  }
});

router.delete('/:taskId', async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const del = await tasksService.deleteTask(taskId as string);
  if (del) {
    res.status(StatusCodes.NO_CONTENT).end();
  } else {
    res.status(StatusCodes.NOT_FOUND).end();
  }
});

export default router;
