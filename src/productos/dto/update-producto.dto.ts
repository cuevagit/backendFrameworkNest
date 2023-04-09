import { PartialType } from '@nestjs/mapped-types';
import { ProductDto } from './create-producto.dto';

export class UpdateProductoDto extends PartialType(ProductDto) {
    _id: string
    title: string
    price: number
    thumbnail: string
}
