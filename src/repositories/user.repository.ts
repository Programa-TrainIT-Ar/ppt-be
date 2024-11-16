import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {InMemoryDbDataSource} from '../datasources';
import {User, UserRelations, Participant} from '../models';
import {ParticipantRepository} from './participant.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly participants: HasManyRepositoryFactory<Participant, typeof User.prototype.id>;

  constructor(
    @inject('datasources.inMemoryDb') dataSource: InMemoryDbDataSource, @repository.getter('ParticipantRepository') protected participantRepositoryGetter: Getter<ParticipantRepository>,
  ) {
    super(User, dataSource);
    this.participants = this.createHasManyRepositoryFactoryFor('participants', participantRepositoryGetter,);
    this.registerInclusionResolver('participants', this.participants.inclusionResolver);
  }
}
