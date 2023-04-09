import Productos from '../../productos/entities/producto.entity'


export class product {

    #dao
    constructor(dao) {
        this.#dao = dao
    }

    
    async grabarProducto(producto: { datos: () => Function }) {
        try {
            const resul = await this.#dao.save(producto.datos())
            return resul
        } catch(error) {
            return error
        }
    }

    async listarProducto() {

        try {
            const dtos = await this.#dao.getAll()

          if(dtos){
            const datos = dtos.map((dto: { _id: string; title: string; price: number; thumbnail: string }) => new Productos(dto))
            return datos
          } else 
            return null

        } catch (error) {
            return error
        }
    }



    async actualizarProducto(producto: { datos: () => Function }) {
        try {
            const resul = await this.#dao.update(producto.datos())
            return resul
        } catch(error) {
            return error
        }
    }


    async eliminarProducto(_id) {
        try {
            const resul = await this.#dao.deleteById({_id})
            return resul
        } catch(error) {
            return error
        }
    }


    async listarProductoPorId( _id: string ) {
        try {
            const dtos = await this.#dao.getById(_id)
         if(dtos){
            const datos = new Productos(dtos)
            return datos
          } else 
            return null

        } catch (error) {
            return error
        }
    }

}

