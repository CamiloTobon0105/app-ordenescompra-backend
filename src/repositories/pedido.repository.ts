import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pedido, PedidoRelations, Cliente, Producto} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ProductoRepository} from './producto.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.id,
  PedidoRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Pedido.prototype.id>;

  public readonly producto: HasOneRepositoryFactory<Producto, typeof Pedido.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Pedido, dataSource);
    this.producto = this.createHasOneRepositoryFactoryFor('producto', productoRepositoryGetter);
    this.registerInclusionResolver('producto', this.producto.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
