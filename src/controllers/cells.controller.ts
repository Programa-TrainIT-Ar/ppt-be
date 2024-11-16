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
import {Cell} from '../models';
import {CellRepository} from '../repositories';

export class CellsController {
  constructor(
    @repository(CellRepository)
    public cellRepository : CellRepository,
  ) {}

  @post('/cells')
  @response(200, {
    description: 'Cell model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cell)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cell, {
            title: 'NewCell',
            exclude: ['id'],
          }),
        },
      },
    })
    cell: Omit<Cell, 'id'>,
  ): Promise<Cell> {
    return this.cellRepository.create(cell);
  }

  @get('/cells/count')
  @response(200, {
    description: 'Cell model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cell) where?: Where<Cell>,
  ): Promise<Count> {
    return this.cellRepository.count(where);
  }

  @get('/cells')
  @response(200, {
    description: 'Array of Cell model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cell, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cell) filter?: Filter<Cell>,
  ): Promise<Cell[]> {
    return this.cellRepository.find(filter);
  }

  @patch('/cells')
  @response(200, {
    description: 'Cell PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cell, {partial: true}),
        },
      },
    })
    cell: Cell,
    @param.where(Cell) where?: Where<Cell>,
  ): Promise<Count> {
    return this.cellRepository.updateAll(cell, where);
  }

  @get('/cells/{id}')
  @response(200, {
    description: 'Cell model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cell, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cell, {exclude: 'where'}) filter?: FilterExcludingWhere<Cell>
  ): Promise<Cell> {
    return this.cellRepository.findById(id, filter);
  }

  @patch('/cells/{id}')
  @response(204, {
    description: 'Cell PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cell, {partial: true}),
        },
      },
    })
    cell: Cell,
  ): Promise<void> {
    await this.cellRepository.updateById(id, cell);
  }

  @put('/cells/{id}')
  @response(204, {
    description: 'Cell PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cell: Cell,
  ): Promise<void> {
    await this.cellRepository.replaceById(id, cell);
  }

  @del('/cells/{id}')
  @response(204, {
    description: 'Cell DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cellRepository.deleteById(id);
  }
}
