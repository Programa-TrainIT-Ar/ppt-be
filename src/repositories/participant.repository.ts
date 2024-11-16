import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InMemoryDbDataSource} from '../datasources';
import {Participant, ParticipantRelations} from '../models';

export class ParticipantRepository extends DefaultCrudRepository<
  Participant,
  typeof Participant.prototype.id,
  ParticipantRelations
> {
  constructor(
    @inject('datasources.inMemoryDb') dataSource: InMemoryDbDataSource,
  ) {
    super(Participant, dataSource);
  }
}
