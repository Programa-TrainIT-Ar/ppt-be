import {Entity, model, property} from '@loopback/repository';

@model()
export class Edition extends Entity {
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
    type: 'date',
  })
  startDate?: string;

  @property({
    type: 'date',
  })
  endDate?: string;

  @property({
    type: 'string',
  })
  projectId?: string;

  constructor(data?: Partial<Edition>) {
    super(data);
  }
}

export interface EditionRelations {
  // describe navigational properties here
}

export type EditionWithRelations = Edition & EditionRelations;
