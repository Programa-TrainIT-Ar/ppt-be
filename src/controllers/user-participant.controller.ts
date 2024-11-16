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
  User,
  Participant,
} from '../models';
import {UserRepository} from '../repositories';

export class UserParticipantController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/participants', {
    responses: {
      '200': {
        description: 'Array of User has many Participant',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Participant)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Participant>,
  ): Promise<Participant[]> {
    return this.userRepository.participants(id).find(filter);
  }

  @post('/users/{id}/participants', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Participant)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Participant, {
            title: 'NewParticipantInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) participant: Omit<Participant, 'id'>,
  ): Promise<Participant> {
    return this.userRepository.participants(id).create(participant);
  }

  @patch('/users/{id}/participants', {
    responses: {
      '200': {
        description: 'User.Participant PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Participant, {partial: true}),
        },
      },
    })
    participant: Partial<Participant>,
    @param.query.object('where', getWhereSchemaFor(Participant)) where?: Where<Participant>,
  ): Promise<Count> {
    return this.userRepository.participants(id).patch(participant, where);
  }

  @del('/users/{id}/participants', {
    responses: {
      '200': {
        description: 'User.Participant DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Participant)) where?: Where<Participant>,
  ): Promise<Count> {
    return this.userRepository.participants(id).delete(where);
  }
}
