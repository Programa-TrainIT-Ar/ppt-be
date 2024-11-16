import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Module,
  Project,
} from '../models';
import {ModuleRepository} from '../repositories';

export class ModuleProjectController {
  constructor(
    @repository(ModuleRepository) protected moduleRepository: ModuleRepository,
  ) { }

  @get('/modules/{id}/projects', {
    responses: {
      '200': {
        description: 'Array of Module has many Project',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Project)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Project>,
  ): Promise<Project[]> {
    return this.moduleRepository.projects(id).find(filter);
  }

  @post('/modules/{id}/projects', {
    responses: {
      '200': {
        description: 'Module model instance',
        content: {'application/json': {schema: getModelSchemaRef(Project)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Module.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Project, {
            title: 'NewProjectInModule',
            exclude: ['id'],
            optional: ['moduleId']
          }),
        },
      },
    }) project: Omit<Project, 'id'>,
  ): Promise<Project> {
    return this.moduleRepository.projects(id).create(project);
  }

  @patch('/modules/{id}/projects', {
    responses: {
      '200': {
        description: 'Module.Project PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Project, {partial: true}),
        },
      },
    })
    project: Partial<Project>,
    @param.query.object('where', getWhereSchemaFor(Project)) where?: Where<Project>,
  ): Promise<Count> {
    return this.moduleRepository.projects(id).patch(project, where);
  }

  @del('/modules/{id}/projects', {
    responses: {
      '200': {
        description: 'Module.Project DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Project)) where?: Where<Project>,
  ): Promise<Count> {
    return this.moduleRepository.projects(id).delete(where);
  }
}
