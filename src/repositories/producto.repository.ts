import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Asesor, Producto, ProductoRelations} from '../models';
import {AsesorRepository} from './asesor.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly asesor: HasOneRepositoryFactory<Asesor, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Producto, dataSource);
    this.asesor = this.createHasOneRepositoryFactoryFor('asesor', asesorRepositoryGetter);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
  }
}
