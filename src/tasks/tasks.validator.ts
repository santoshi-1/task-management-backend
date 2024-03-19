import { body, ValidationChain } from 'express-validator';
import { Priority } from '../enums/priority';
import { Status } from '../enums/status';
export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('The task title is mandatory')
    .trim()
    .isString()
    .withMessage('Title needs to be in text format'),

  body('date')
    .not()
    .isEmpty()
    .withMessage('task Date is mandatory')
    .isString()
    .withMessage('Date needs to be a valid date format'),

  body('description')
    .trim()
    .isString()
    .withMessage('Description needs to be in text format'),

  body('priority')
    .trim()
    .isIn([Priority.high, Priority.low, Priority.normal])
    .withMessage(
      'Priority can only be normal, high or low',
    ),

  body('status')
    .trim()
    .isIn([
      Status.completed,
      Status.inProgress,
      Status.todo,
    ])
    .withMessage(
      'Status can only be todo, inProgress or completed',
    ),
];

export const updateValidator: ValidationChain[] = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('Task Id is mandatory')
    .trim()
    .isString()
    .withMessage('ID needs to be in valid uuid format'),

  body('status')
    .trim()
    .isIn([
      Status.completed,
      Status.inProgress,
      Status.todo,
    ])
    .withMessage(
      'Status can only be todo, inProgress or completed',
    ),
];
