import {PERSISTENCIA} from '../../config/config'
import {BDRELACIONAL} from '../../config/config'
import { product } from './product.js'
import {Container} from '../../daos/container/containerArchivo' 
import {ContainerMongodb} from '../../daos/container/containerMongodb'
import {Contenedor} from '../../daos/container/container'
import { clienteSql } from '../../daos/db/clienteSql.js'
import { clienteSqlLite3 } from '../../daos/db/clienteSql.js'


let Products

switch (PERSISTENCIA) {
    case 'fs':
        const dao_fs = new Container('productos.txt')
        Products = new product(dao_fs)
        break
    case 'mongodb':
        const dao_mongodb = new ContainerMongodb('productos');
        Products = new product(dao_mongodb)
        break  
    case 'relacional':
        let dao_relacional
        if(BDRELACIONAL == 'mysql'){
            dao_relacional = new Contenedor(clienteSql, 'productos');
        } else {
            dao_relacional = new Contenedor(clienteSqlLite3, 'productos');
        }
        Products = new product(dao_relacional)
        break  
}


export { Products } 