import {Entity, model, property} from '@loopback/repository';

@model()
export class Cell extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;


  constructor(data?: Partial<Cell>) {
    super(data);
  }
}

export interface CellRelations {
  // describe navigational properties here
}

export type CellWithRelations = Cell & CellRelations;
