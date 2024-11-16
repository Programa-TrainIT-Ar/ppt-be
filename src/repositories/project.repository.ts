import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {InMemoryDbDataSource} from '../datasources';
import {Project, ProjectRelations, Edition} from '../models';
import {EditionRepository} from './edition.repository';

export class ProjectRepository extends DefaultCrudRepository<
  Project,
  typeof Project.prototype.id,
  ProjectRelations
> {

  public readonly editions: HasManyRepositoryFactory<Edition, typeof Project.prototype.id>;

  constructor(
    @inject('datasources.inMemoryDb') dataSource: InMemoryDbDataSource, @repository.getter('EditionRepository') protected editionRepositoryGetter: Getter<EditionRepository>,
  ) {
    super(Project, dataSource);
    this.editions = this.createHasManyRepositoryFactoryFor('editions', editionRepositoryGetter,);
    this.registerInclusionResolver('editions', this.editions.inclusionResolver);
  }
}
