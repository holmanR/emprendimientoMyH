let carrito = [];

// Agregar producto tomando nombre y precio reales desde la card
function agregarDesdeCard(btn) {
  // Animación visual
  btn.classList.add("agregado");
  btn.textContent = "Agregado ✓";

  setTimeout(() => {
    btn.classList.remove("agregado");
    btn.textContent = "Agregar";
  }, 900);

  // Lógica del carrito
  const card = btn.closest('.card');
  const nombre = card.querySelector('h3').innerText.trim();
  const precioTexto = card.querySelector('p').innerText;
  const precio = parseInt(precioTexto.replace(/[^0-9]/g, ''));

  agregarAlCarrito(nombre, precio);
}


function agregarAlCarrito(nombre, precio) {
  const item = carrito.find(p => p.nombre === nombre);

  if (item) {
    item.cantidad++;
  } else {
    carrito.push({
      nombre,
      precio,
      cantidad: 1
    });
  }

  renderCarrito();
}

function cambiarCantidad(nombre, delta) {
  const item = carrito.find(p => p.nombre === nombre);
  if (!item) return;

  item.cantidad += delta;

  if (item.cantidad <= 0) {
    carrito = carrito.filter(p => p.nombre !== nombre);
  }

  renderCarrito();
}

function eliminarProducto(nombre) {
  carrito = carrito.filter(p => p.nombre !== nombre);
  renderCarrito();
}

function renderCarrito() {
  const contenedor = document.getElementById("items-carrito");
  const totalEl = document.getElementById("total-carrito");

  contenedor.innerHTML = "";
  let total = 0;

  carrito.forEach(p => {
    const subtotal = p.precio * p.cantidad;
    total += subtotal;

    contenedor.innerHTML += `
      <div class="item-carrito">
        <strong>${p.nombre}</strong><br>
        Cantidad: ${p.cantidad}<br>
        Precio unitario: $${p.precio}<br>
        <b>Subtotal:</b> $${subtotal}
        <div class="controles">
          <button onclick="cambiarCantidad('${p.nombre}', -1)">➖</button>
          <button onclick="cambiarCantidad('${p.nombre}', 1)">➕</button>
          <button onclick="eliminarProducto('${p.nombre}')">❌</button>
        </div>
      </div>
      <hr>
    `;
  });

  totalEl.textContent = "$" + total;

  document.getElementById("contador-carrito").textContent =
  carrito.reduce((acc, p) => acc + p.cantidad, 0);
}

function toggleCarrito() {
  document.getElementById("carrito-panel").classList.toggle("activo");
  document.getElementById("overlay-carrito").classList.toggle("activo");
}

