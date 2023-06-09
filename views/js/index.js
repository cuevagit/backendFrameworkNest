  mostrar_productos()

   document.getElementById("modificar").style.display = 'none'


  async function mostrar_productos(){


  await fetch('http://localhost:8080/api/productos', {method:'GET'})
  .then(response => response.json())
  .then(data =>    {
    document.getElementById('tablaproductos').insertAdjacentHTML('beforeend', `<div id="tablaproductos"><strong>PRODUCTOS</strong></div>`);
    document.getElementById('tablaproductos').insertAdjacentHTML('beforeend', `<td><b>Nombre:</b></td> <td><b>Precio: </b> </td> <td><b>Imágen</b></td>`);



     data.forEach(data => {
      let id2 = data._id + '2'

        document.getElementById('tablaproductos').insertAdjacentHTML('beforeend', `<td> ${data.title}</td> <td width="100px"> $ ${data.price}</td> <td><img width="70px" src=" ${data.thumbnail}"></td> <td><Button id=${data._id} className="botoneliminar">Eliminar</Button></td> <td><Button id=${id2} className="botoneditar">Editar</Button></td>`);

      let botoneliminar = document.getElementById(data._id)
      botoneliminar.addEventListener('click', async(e) => {
        e.preventDefault();
        await fetch(`http://localhost:8080/api/productos/${data._id}`, {
          method: "DELETE",
          body: JSON.stringify(data),
          headers: {"Content-type": "application/json; charset=UTF-8", "Access-Control-Allow-Origin": "*"}
        })
        location.reload();

      })


      let botoneditar = document.getElementById(id2)
      botoneditar.addEventListener('click', async(e) => {
        document.getElementById("modificar").style.display = ''

        e.preventDefault();

        await fetch(`http://localhost:8080/api/productos/${data._id}`, {method: "GET"})
        .then(response => response.json())
        .then(data =>    {
          elementoelegido = data._id,
          document.getElementById('title').value = data.title,
          document.getElementById('price').value = data.price,
          document.getElementById('miArchivo').value = data.thumbnail
      })

      location.reload();

     });
    });
   }
  )
}

    let botonmodificar = document.getElementById("modificar")
    botonmodificar.addEventListener('click', async(e) => {
      e.preventDefault();

      let thumbnail = document.getElementById('miArchivo').value
      thumbnail = thumbnail.replace("C:\\fakepath\\", "../uploads/")

      const objeto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: thumbnail
      }

      await fetch(`http://localhost:8080/api/productos/${elementoelegido}`, {
        method: "PUT",
        body: JSON.stringify(objeto),
        headers: {"Content-type": "application/json; charset=UTF-8", "Access-Control-Allow-Origin": "*"}
      })

      location.reload();

    })





const form = document.getElementById('formulario');
const boton = document.getElementById("enviar")

boton.onclick = async(e) => {
  e.preventDefault();

  const title = document.getElementById('title').value
  const price = document.getElementById('price').value
  let thumbnail = document.getElementById('miArchivo').value
  thumbnail = thumbnail.replace("C:\\fakepath\\", "../uploads/")

  const producto = {
    title: title,
    price: price,
    thumbnail: thumbnail
  }


  await fetch('http://localhost:8080/api/productos', {
    method: "POST",
    body: JSON.stringify(producto),
    headers: {"Content-type": "application/json; charset=UTF-8", "Access-Control-Allow-Origin": "*"}
  })
  location.reload();
};


const input = document.getElementById('miArchivo')


input.addEventListener('change', () => {
  uploadFile(input.files[0])
})


const uploadFile = file => {
  const fd = new FormData()
  fd.append('miArchivo', file)


  fetch('http://localhost:8080/api/productos/imagenes', {
    method: 'POST',
    body: fd
  })
}


form.reset



