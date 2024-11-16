import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {InMemoryDbDataSource} from '../datasources';
import {Module, ModuleRelations, Project} from '../models';
import {ProjectRepository} from './project.repository';

export class ModuleRepository extends DefaultCrudRepository<
  Module,
  typeof Module.prototype.id,
  ModuleRelations
> {

  public readonly projects: HasManyRepositoryFactory<Project, typeof Module.prototype.id>;

  constructor(
    @inject('datasources.inMemoryDb') dataSource: InMemoryDbDataSource, @repository.getter('ProjectRepository') protected projectRepositoryGetter: Getter<ProjectRepository>,
  ) {
    super(Module, dataSource);
    this.projects = this.createHasManyRepositoryFactoryFor('projects', projectRepositoryGetter,);
    this.registerInclusionResolver('projects', this.projects.inclusionResolver);
  }
}
