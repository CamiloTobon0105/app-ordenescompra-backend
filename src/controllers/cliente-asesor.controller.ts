import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Asesor, Cliente
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteAsesorController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/asesor', {
    responses: {
      '200': {
        description: 'Asesor belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asesor)},
          },
        },
      },
    },
  })
  async getAsesor(
    @param.path.string('id') id: typeof Cliente.prototype.id,
  ): Promise<Asesor> {
    return this.clienteRepository.asesor(id);
  }
}
