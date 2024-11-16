import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InMemoryDbDataSource} from '../datasources';
import {Cell, CellRelations} from '../models';

export class CellRepository extends DefaultCrudRepository<
  Cell,
  typeof Cell.prototype.id,
  CellRelations
> {
  constructor(
    @inject('datasources.inMemoryDb') dataSource: InMemoryDbDataSource,
  ) {
    super(Cell, dataSource);
  }
}
