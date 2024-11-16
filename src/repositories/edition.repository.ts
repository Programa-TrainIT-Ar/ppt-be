import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InMemoryDbDataSource} from '../datasources';
import {Edition, EditionRelations} from '../models';

export class EditionRepository extends DefaultCrudRepository<
  Edition,
  typeof Edition.prototype.id,
  EditionRelations
> {
  constructor(
    @inject('datasources.inMemoryDb') dataSource: InMemoryDbDataSource,
  ) {
    super(Edition, dataSource);
  }
}
