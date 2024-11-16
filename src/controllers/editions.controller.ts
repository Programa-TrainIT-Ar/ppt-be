import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Edition} from '../models';
import {EditionRepository} from '../repositories';

export class EditionsController {
  constructor(
    @repository(EditionRepository)
    public editionRepository : EditionRepository,
  ) {}

  @post('/editions')
  @response(200, {
    description: 'Edition model instance',
    content: {'application/json': {schema: getModelSchemaRef(Edition)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Edition, {
            title: 'NewEdition',
            exclude: ['id'],
          }),
        },
      },
    })
    edition: Omit<Edition, 'id'>,
  ): Promise<Edition> {
    return this.editionRepository.create(edition);
  }

  @get('/editions/count')
  @response(200, {
    description: 'Edition model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Edition) where?: Where<Edition>,
  ): Promise<Count> {
    return this.editionRepository.count(where);
  }

  @get('/editions')
  @response(200, {
    description: 'Array of Edition model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Edition, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Edition) filter?: Filter<Edition>,
  ): Promise<Edition[]> {
    return this.editionRepository.find(filter);
  }

  @patch('/editions')
  @response(200, {
    description: 'Edition PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Edition, {partial: true}),
        },
      },
    })
    edition: Edition,
    @param.where(Edition) where?: Where<Edition>,
  ): Promise<Count> {
    return this.editionRepository.updateAll(edition, where);
  }

  @get('/editions/{id}')
  @response(200, {
    description: 'Edition model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Edition, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Edition, {exclude: 'where'}) filter?: FilterExcludingWhere<Edition>
  ): Promise<Edition> {
    return this.editionRepository.findById(id, filter);
  }

  @patch('/editions/{id}')
  @response(204, {
    description: 'Edition PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Edition, {partial: true}),
        },
      },
    })
    edition: Edition,
  ): Promise<void> {
    await this.editionRepository.updateById(id, edition);
  }

  @put('/editions/{id}')
  @response(204, {
    description: 'Edition PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() edition: Edition,
  ): Promise<void> {
    await this.editionRepository.replaceById(id, edition);
  }

  @del('/editions/{id}')
  @response(204, {
    description: 'Edition DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.editionRepository.deleteById(id);
  }
}
