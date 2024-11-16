import {Entity, model, property} from '@loopback/repository';

@model()
export class Participant extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

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
  position?: string;

  @property({
    type: 'string',
  })
  userId?: string;

  constructor(data?: Partial<Participant>) {
    super(data);
  }
}

export interface ParticipantRelations {
  // describe navigational properties here
}

export type ParticipantWithRelations = Participant & ParticipantRelations;
