import {Entity, model, property, hasMany} from '@loopback/repository';
import {Project} from './project.model';

@model()
export class Module extends Entity {
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
  name?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @hasMany(() => Project)
  projects: Project[];

  constructor(data?: Partial<Module>) {
    super(data);
  }
}

export interface ModuleRelations {
  // describe navigational properties here
}

export type ModuleWithRelations = Module & ModuleRelations;
