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
  Project,
  Edition,
} from '../models';
import {ProjectRepository} from '../repositories';

export class ProjectEditionController {
  constructor(
    @repository(ProjectRepository) protected projectRepository: ProjectRepository,
  ) { }

  @get('/projects/{id}/editions', {
    responses: {
      '200': {
        description: 'Array of Project has many Edition',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Edition)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Edition>,
  ): Promise<Edition[]> {
    return this.projectRepository.editions(id).find(filter);
  }

  @post('/projects/{id}/editions', {
    responses: {
      '200': {
        description: 'Project model instance',
        content: {'application/json': {schema: getModelSchemaRef(Edition)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Project.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Edition, {
            title: 'NewEditionInProject',
            exclude: ['id'],
            optional: ['projectId']
          }),
        },
      },
    }) edition: Omit<Edition, 'id'>,
  ): Promise<Edition> {
    return this.projectRepository.editions(id).create(edition);
  }

  @patch('/projects/{id}/editions', {
    responses: {
      '200': {
        description: 'Project.Edition PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Edition, {partial: true}),
        },
      },
    })
    edition: Partial<Edition>,
    @param.query.object('where', getWhereSchemaFor(Edition)) where?: Where<Edition>,
  ): Promise<Count> {
    return this.projectRepository.editions(id).patch(edition, where);
  }

  @del('/projects/{id}/editions', {
    responses: {
      '200': {
        description: 'Project.Edition DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Edition)) where?: Where<Edition>,
  ): Promise<Count> {
    return this.projectRepository.editions(id).delete(where);
  }
}
