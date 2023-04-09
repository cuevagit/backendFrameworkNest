import { ProductDto } from "../dto/create-producto.dto"


class Productos{

    #id: string
    #title: string
    #price: number
    #thumbnail: string

    constructor({ _id, title, price, thumbnail }) {
        this.#id = _id
        this.#title = title
        this.#price = price
        this.#thumbnail = thumbnail
    }

    get id() { return this.#id }

    get title() { return this.#title }

    get price() { return this.#price }

    get thumbnail() { return this.#thumbnail }


       datos() {
        return new ProductDto({
            _id: this.#id,  
            title: this.#title,  
            price: this.#price,  
            thumbnail: this.#thumbnail      
        })
      }

    }

  

 export default Productos;