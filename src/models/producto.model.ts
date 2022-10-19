import {Entity, hasOne, model, property} from '@loopback/repository';
import {Asesor} from './asesor.model';

@model()
export class Producto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
    required: true,
  })
  serie: string;

  @hasOne(() => Asesor)
  asesor: Asesor;

  @property({
    type: 'string',
  })
  pedidoId?: string;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
