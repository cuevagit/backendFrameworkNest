import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import {randomUUID}  from 'crypto';


@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  create(@Body() createProductoDto: ProductDto) {
    createProductoDto._id = randomUUID();
    return this.productosService.create(createProductoDto);
  }

  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string ) {
    return this.productosService.findOne(_id);
  }

  @Put(':_id')
  update(@Param('_id') _id: string, @Body() updateProductoDto: UpdateProductoDto) {
    updateProductoDto._id = _id
    return this.productosService.put(_id, updateProductoDto);
  }

  @Patch(':_id')
  async patch(@Param('_id') _id: string, @Body() updateProductoDto: UpdateProductoDto) {
    const productoPrevio = await this.productosService.findOne(_id);
    let Product = {
      ...productoPrevio,
      ...updateProductoDto
    }
    return this.productosService.put(_id, Product);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.productosService.remove(_id);
  }
}
