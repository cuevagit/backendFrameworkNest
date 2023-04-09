import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Products } from './repository/index'
import Productos from './entities/producto.entity'


@Injectable()
export class ProductosService {
async create(createProductoDto: ProductDto) {
    try {
      const product = new Productos(createProductoDto);
      const registroProduct = await Products.grabarProducto(product)
      return registroProduct  
  } catch (error) {
      return error
  }  
}

  async findAll() {
            try {
                const listadoProducts = await Products.listarProducto()
                if(listadoProducts[0]){
                    const products = []
                    listadoProducts.forEach(d => {
                        products.push(d.datos())
                    });
                    return products
                } else
                    return {mensaje: "No hay productos"}
        } catch (error) {
            return error
        }
  }

  async findOne( _id: string ) {
    try {
      const producto = await Products.listarProductoPorId(_id)
      if(producto)
       return producto.datos()
      else 
       return {"mensaje": `No existe el producto con el id: ${_id}`}
  } catch (error) {
      return error
  }  }

 async put(_id: string, updateProductoDto: UpdateProductoDto) {
    try {
      const product = new Productos(updateProductoDto);
      const updateProduct = await Products.actualizarProducto(product)
      if(updateProduct)
       return updateProduct  
      else 
      return {"mensaje": `No existe el producto con el id: ${_id}`}
  } catch (error) {
      return error
  }  
}

 async remove(_id: string) {
    try {
      const deleteProduct = await Products.eliminarProducto(_id)
      return deleteProduct  
  } catch (error) {
      return error
  }  
 }
}
