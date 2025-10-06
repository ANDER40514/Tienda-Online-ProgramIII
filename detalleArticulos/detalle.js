// Lee el id de la URL
function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

document.addEventListener('DOMContentLoaded', () => {
    const id = getIdFromUrl();
    if (!id) {
        document.getElementById('detalle-producto').innerHTML = '<p>Producto no encontrado.</p>';
        return;
    }
    fetch('../JSON/gallery-item.json')
        .then(res => res.json())
        .then(data => {
            const producto = data.find(item => String(item.id) === String(id));
            if (!producto) {
                document.getElementById('detalle-producto').innerHTML = '<p>Producto no encontrado.</p>';
                return;
            }
            document.getElementById('detalle-producto').innerHTML = `
                <div class="detalle-container">
                    <img src="${producto.img}.jpg" alt="${producto.title}" class="detalle-img">
                    <div class="detalle-info">
                        <h2 class="detalle-title">${producto.title}</h2>
                        ${(Array.isArray(producto.tag) ? producto.tag.map(tag => `<span class='detalle-tag'>${tag}</span>`).join('') : '')}
                        <p class="detalle-desc">${producto.description}</p>
                        <span class="detalle-price">DOP $${producto.price.toFixed(2)}</span><br>
                        <button class="detalle-btn">Comprar</button>
                    </div>
                </div>
            `;
        })
        .catch(() => {
            document.getElementById('detalle-producto').innerHTML = '<p>Error cargando el producto.</p>';
        });
});