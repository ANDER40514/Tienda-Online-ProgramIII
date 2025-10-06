// ========== UTILIDADES ==========
const navList = document.getElementById("main-nav");
const galleryContainer = document.querySelector(".gallery");
const footer = document.getElementById("footer");

const SCRIPT_SRC = document.currentScript?.src || window.location.href;
const SCRIPT_BASE = new URL('.', SCRIPT_SRC).href;
const assetUrl = (path) => new URL(path, SCRIPT_BASE).href;

const fetchJSON = (path) =>
	fetch(assetUrl(path)).then((res) => {
		if (!res.ok) throw new Error(`Error ${res.status} en ${path}`);
		return res.json();
	});

// ========== NAVBAR ==========
function mostrarNavbar(menuData) {
	navList.innerHTML = menuData.map(item => `
		<li class="${item.class}">
			<a href="${item.href}" class="links">${item.text}</a>
			${item["sub-module"]?.length ? `
				<ul class="submenu">
					${item["sub-module"].map(sub => `
						<li class="${sub.class || "nav-sub-items"}">
							<a href="${sub.href}">${sub.text}</a>
						</li>`).join("")}
				</ul>` : ""}
		</li>
	`).join("");
}

// ========== CARDS ==========
function mostrarCards(cardsData) {
	galleryContainer.innerHTML = cardsData.map(card => `
		<div class="gallery-item">
			<div class="${card.class || "catalogo-card"}">
				<img src="${card.img}.jpg" alt="img-${card.title.toLowerCase().replace(/\s+/g, "-")}" class="img-card">
				<h2 class="title-card">${card.title}</h2>
				${card.tag?.map(tag => `<span class="tag-card">${tag}</span>`).join("") || ""}
				<p class="description-card">${card.description}</p>
				<span class="price-card cossette-titre-bold">DOP $${card.price.toFixed(2)}</span>
				<a href="${assetUrl('detalleArticulos/detalle.html')}?id=${card.id}" class="btn-card">Ver más</a>
			</div>
		</div>`).join("");
}

// ========== FOOTER ==========
function mostrarFooter(data) {
	footer.innerHTML = `
		<div class="footer-content">
			<div class="titulo titulo-footer cossette-titre-bold">${data.brand.title}</div>
			${data.columns.map(col => `
				<div class="footer foo-links">
					<h4 class="foo-subtitle cosette-titre bold">${col.title}</h4>
					<ul class="foo-ul">
						${col.links.map(link => `<li><a href="${link.href}" class="foo-items links">${link.text}</a></li>`).join("")}
					</ul>
				</div>`).join("")}
			</div>
		<div class="foo-text-copy">${data.copyright}</div>
	`;
}

// ========== CARGA DE DATOS ==========
Promise.all([
	fetchJSON('JSON/navbar.json').then(mostrarNavbar),
	fetchJSON('JSON/gallery-item.json').then(mostrarCards),
	fetchJSON('JSON/footer.json').then(mostrarFooter)
]).catch(err => console.error("Error cargando contenido:", err));


// BUG: Error o fallo en el código
// HACK: Solución temporal o improvisada
// FIXME: Necesita corrección o ajuste
// TODO: Tarea pendiente por implementar
// XXX: Advertencia o área crítica
// [ ]: Tarea pendiente (checklist)
// [x]: Tarea completada (checklist)
// DEPRECATED: Código antiguo/obsoleto que ya no debe usarse
// NOTE: Nota o comentario importante
// REVIEW: Revisión necesaria (code review)
// OPTIMIZE: Código que puede optimizarse
// TEST: Relacionado con pruebas o pendiente de testear
// SECURITY: Posible vulnerabilidad o riesgo de seguridad
// PERF: Posible problema de rendimiento
// DOCS: Recordatorio de documentación
// QUESTION: Duda o punto a aclarar
// WIP: Trabajo en progreso (Work In Progress)
