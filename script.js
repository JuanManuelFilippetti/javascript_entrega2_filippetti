let productos = [
    { id: 1, nombre: "arcoiris", categoria: "didactico", precio: 8000, stock: 5, imgUrl: "./img/arcoiris.jpg" },
    { id: 2, nombre: "autito", categoria: "juguete", precio: 2000, stock: 6, imgUrl: "./img/autito.jpg" },
    { id: 3, nombre: "avion", categoria: "juguete", precio: 4000, stock: 9, imgUrl: "./img/avion.jpg" },
    { id: 4, nombre: "bloques", categoria: "juguete", precio: 5000, stock: 4, imgUrl: "./img/bloques.jpg" },
    { id: 5, nombre: "tren", categoria: "didactico", precio: 4500, stock: 3, imgUrl: "./img/tren.jpg" },
  ]
  let carrito = []
  
  let contenedorProductos = document.getElementById("contenedorProductos")
  let contenedorCarrito = document.getElementById("contenedorCarrito")
  let buscador = document.getElementById("buscador")
  let buscar = document.getElementById("buscar")
  buscar.onclick = filtrar
  
  let inputMin = document.getElementById("min")
  let inputMax = document.getElementById("max")
  
  renderizarProductos(productos)
  
  function filtrar() {
    let productosFiltrados
    if (buscador.value) {
      productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()) || producto.categoria.toLowerCase().includes(buscador.value.toLowerCase()))
    } else if (inputMin.value && inputMax.value) {
      productosFiltrados = productos.filter(producto => producto.precio >= Number(inputMin.value) && producto.precio <= Number(inputMax.value))
    }
    renderizarProductos(productosFiltrados)
  }
  
  function renderizarProductos(arrayDeProductos) {
    contenedorProductos.innerHTML = ""
    arrayDeProductos.forEach(producto => {
      let tarjetaProducto = document.createElement("div")
      tarjetaProducto.classList.add("producto")
      tarjetaProducto.id = `tarjeta${producto.id}`
  
      tarjetaProducto.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <img src=${producto.imgUrl} />
        <button id=${producto.id}>Agregar al carrito</button>
      `
      if (producto.stock < 10) {
        tarjetaProducto.classList.add("pocoStock")
        let pocasUnidades = document.createElement('p')
        pocasUnidades.innerText = "Quedan pocas unidades"
        tarjetaProducto.appendChild(pocasUnidades)
      }
  
      contenedorProductos.append(tarjetaProducto)
  
      let boton = document.getElementById(producto.id)
      boton.onclick = agregarAlCarrito
    })
  }
  
  function agregarAlCarrito(e) {
    let id = e.target.id
    let productoBuscado = productos.find(producto => producto.id == id)
    let productoEnCarrito = carrito.find(producto => producto.id == productoBuscado.id)
  
    if (productoEnCarrito) {
      let posicionProducto = carrito.findIndex(producto => producto == productoEnCarrito)
      carrito[posicionProducto].unidades++
      carrito[posicionProducto].subtotal = carrito[posicionProducto].precio * carrito[posicionProducto].unidades
    } else {
      
      productoBuscado.unidades = 1
      productoBuscado.subtotal = productoBuscado.precio
      carrito.push(productoBuscado)
    }
  
    renderizarCarrito(carrito)
  }
  
  function renderizarCarrito(productosEnCarrito) {
    contenedorCarrito.innerText = ""
    productosEnCarrito.forEach(producto => {
      let tarjetaProducto = document.createElement("div")
      tarjetaProducto.classList.add("itemCarrito")
      tarjetaProducto.innerHTML += `
        <h3>${producto.nombre}</h3>
        <p>${producto.unidades}</p>
        <p>${producto.subtotal}</p>
      `
      contenedorCarrito.appendChild(tarjetaProducto)
    })
  }
  
 
  function filtrarPorCategoria(e) {
    let productosFiltrados = productos.filter(producto => producto.categoria === e.target.id)
    renderizarProductos(productosFiltrados)
  }
