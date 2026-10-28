const state = {
  role: "Usuario",
  user: "Usuario Demo",
  current: "dashboard",
  highContrast: false
};

const books = [
  {id:1, title:"Cien años de soledad", author:"Gabriel García Márquez", category:"Literatura", publisher:"Editorial Sudamericana", available:true},
  {id:2, title:"El principito", author:"Antoine de Saint-Exupéry", category:"Literatura", publisher:"Reynal & Hitchcock", available:true},
  {id:3, title:"Clean Code", author:"Robert C. Martin", category:"Tecnología", publisher:"Prentice Hall", available:false},
  {id:4, title:"Don Quijote de la Mancha", author:"Miguel de Cervantes", category:"Clásicos", publisher:"Francisco de Robles", available:true},
  {id:5, title:"Introducción a la programación", author:"Equipo Académico", category:"Tecnología", publisher:"SENA", available:true},
  {id:6, title:"El arte de la guerra", author:"Sun Tzu", category:"Historia", publisher:"Clásicos Orientales", available:false}
];

const loans = [
  {id:"PR-001", user:"Neal Torres", book:"Clean Code", date:"2026-08-01", due:"2026-08-15", status:"Pendiente"},
  {id:"PR-002", user:"Carlos Gómez", book:"Cien años de soledad", date:"2026-07-29", due:"2026-08-12", status:"Vencido"},
  {id:"PR-003", user:"Ana Torres", book:"El principito", date:"2026-08-05", due:"2026-08-19", status:"Activo"}
];

const users = [
  {id:"U-001", name:"Luisa Camargo", email:"lucamargo@correo.com", role:"Usuario", status:"Activo"},
  {id:"U-002", name:"Carlos Gómez", email:"Nealtorres@correo.com", role:"Bibliotecario", status:"Activo"},
  {id:"U-003", name:"Rick PRT", email:"Rick@correo.com", role:"Usuario", status:"Activo"},
  {id:"U-004", name:"Administrador", email:"admin@biblioteca.com", role:"Administrador", status:"Activo"}
];

const navByRole = {
  Administrador: [
    ["dashboard","⌂","Panel principal"],["catalog","▦","Catálogo de libros"],["search","⌕","Búsqueda"],["loans","↔","Préstamos"],["returns","↩","Devoluciones"],["users","♙","Gestión de usuarios"],["books","▤","Gestión de libros"]
  ],
  Bibliotecario: [
    ["dashboard","⌂","Panel principal"],["catalog","▦","Catálogo de libros"],["search","⌕","Búsqueda"],["loans","↔","Préstamos"],["returns","↩","Devoluciones"]
  ],
  Usuario: [
    ["dashboard","⌂","Panel principal"],["catalog","▦","Catálogo de libros"],["search","⌕","Búsqueda"],["loans","↔","Mis préstamos"]
  ]
};

const titles = {
  dashboard:"Panel principal", catalog:"Catálogo de libros", search:"Búsqueda de libros",
  detail:"Detalle del libro", reserve:"Reserva de libro", loans:"Gestión de préstamos",
  returns:"Devoluciones", users:"Gestión de usuarios", books:"Gestión de libros"
};

function esc(v){ return String(v).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])); }
function initials(name){ return name.split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase(); }

function showToast(msg){
  const t=document.getElementById("toast"); t.textContent=msg; t.classList.add("show");
  clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>t.classList.remove("show"),2500);
}

function buildNav(){
  const nav=document.getElementById("main-nav");
  nav.innerHTML=(navByRole[state.role]||navByRole.Usuario).map(([id,icon,label])=>
    `<button class="nav-item ${state.current===id?'active':''}" data-route="${id}"><span aria-hidden="true">${icon}</span> &nbsp;${label}</button>`
  ).join("");
  nav.querySelectorAll("[data-route]").forEach(b=>b.addEventListener("click",()=>{navigate(b.dataset.route); document.getElementById("sidebar").classList.remove("open");}));
}

function setupShell(){
  document.getElementById("sidebar-user").textContent=state.user;
  document.getElementById("sidebar-role").textContent=state.role;
  document.getElementById("user-avatar").textContent=initials(state.user);
  document.getElementById("role-badge").textContent=state.role;
  buildNav();
}

function stat(label,value,note){ return `<article class="stat-card"><span class="label">${label}</span><strong>${value}</strong><small>${note}</small></article>`; }

function dashboard(){
  const admin = state.role==="Administrador", staff=admin||state.role==="Bibliotecario";
  return `
    <div class="page-head"><div><h3>Resumen general</h3><p>Accede rápidamente a las funciones disponibles según tu rol.</p></div></div>
    <section class="stats">
      ${stat("Libros registrados","1.248","Catálogo bibliográfico")}
      ${stat("Disponibles","934","Recursos disponibles")}
      ${stat(staff?"Préstamos activos":"Mis préstamos","86",staff?"Registros vigentes":"Consulta tus préstamos")}
      ${stat(admin?"Usuarios":"Reservas","156",admin?"Usuarios registrados":"Reservas pendientes")}
    </section>
    <div class="grid-2">
      <section class="panel">
        <div class="panel-title"><h3>Acciones rápidas</h3><span>Acceso directo</span></div>
        <div class="quick-actions">
          <button class="quick-action" data-route="catalog"><strong>Consultar catálogo</strong><span>Ver libros y disponibilidad</span></button>
          <button class="quick-action" data-route="search"><strong>Buscar un libro</strong><span>Por título, autor o categoría</span></button>
          ${staff?'<button class="quick-action" data-route="loans"><strong>Gestionar préstamos</strong><span>Registrar y consultar préstamos</span></button>':''}
          ${admin?'<button class="quick-action" data-route="users"><strong>Gestionar usuarios</strong><span>Roles, estados y registros</span></button>':''}
          ${admin?'<button class="quick-action" data-route="books"><strong>Gestionar libros</strong><span>Registrar y modificar catálogo</span></button>':''}
        </div>
      </section>
      <section class="panel">
        <div class="panel-title"><h3>Actividad reciente</h3><span>Últimos movimientos</span></div>
        <div class="table-wrap"><table><thead><tr><th>Actividad</th><th>Estado</th></tr></thead><tbody>
          <tr><td><strong>Reserva de El principito</strong><br><small>Hace 15 min</small></td><td><span class="status pending">Pendiente</span></td></tr>
          <tr><td><strong>Devolución registrada</strong><br><small>Hace 1 hora</small></td><td><span class="status available">Completada</span></td></tr>
          <tr><td><strong>Nuevo libro registrado</strong><br><small>Hace 2 horas</small></td><td><span class="status available">Disponible</span></td></tr>
        </tbody></table></div>
      </section>
    </div>
  `;
}

function catalog(){
  return `
    <div class="page-head"><div><h3>Catálogo de libros</h3><p>P-03 · Consulta título, autor, categoría y disponibilidad.</p></div><div class="actions"><button class="btn btn-secondary" data-route="search">Buscar libros</button></div></div>
    <div class="book-grid">${books.map(b=>bookCard(b)).join("")}</div>
  `;
}

function bookCard(b){
  return `<article class="book-card">
    <div class="book-cover" aria-label="Portada representativa">${esc(b.title.charAt(0))}</div>
    <div class="book-body">
      <h4>${esc(b.title)}</h4><p>${esc(b.author)}</p><p>${esc(b.category)}</p>
      <span class="status ${b.available?'available':'loan'}">${b.available?'Disponible':'Prestado'}</span>
      <div class="actions" style="margin-top:10px"><button class="btn btn-secondary small-btn" data-detail="${b.id}">Ver detalle</button></div>
    </div>
  </article>`;
}

function searchPage(){
  return `
    <div class="page-head"><div><h3>Búsqueda de libros</h3><p>P-04 · Localiza recursos por título, autor o categoría.</p></div></div>
    <section class="panel">
      <div class="search-bar">
        <input id="book-query" type="search" placeholder="Escribe título, autor o palabra clave" aria-label="Buscar libros">
        <select id="book-filter"><option value="all">Todos los criterios</option><option value="title">Título</option><option value="author">Autor</option><option value="category">Categoría</option></select>
        <button id="search-btn" class="btn btn-primary">Buscar</button>
      </div>
      <div id="search-results" class="book-grid">${books.map(b=>bookCard(b)).join("")}</div>
    </section>
  `;
}

function detailPage(id=1){
  const b=books.find(x=>x.id===Number(id))||books[0];
  return `
    <div class="page-head"><div><h3>Detalle del libro</h3><p>P-05 · Información detallada del recurso seleccionado.</p></div></div>
    <section class="panel detail-layout">
      <div class="detail-cover">${esc(b.title.charAt(0))}</div>
      <div class="detail-info">
        <h3>${esc(b.title)}</h3><p>Autor: <strong>${esc(b.author)}</strong></p>
        <p>Este espacio presenta la información bibliográfica del recurso, su descripción y el estado actual de disponibilidad.</p>
        <div class="meta-grid">
          <div class="meta"><span>Autor</span><strong>${esc(b.author)}</strong></div>
          <div class="meta"><span>Categoría</span><strong>${esc(b.category)}</strong></div>
          <div class="meta"><span>Editorial</span><strong>${esc(b.publisher)}</strong></div>
          <div class="meta"><span>Disponibilidad</span><strong>${b.available?'Disponible':'Prestado'}</strong></div>
        </div>
        <div class="actions">
          ${b.available?'<button class="btn btn-primary" data-reserve="'+b.id+'">Reservar libro</button>':''}
          <button class="btn btn-secondary" data-route="catalog">Volver al catálogo</button>
        </div>
      </div>
    </section>
  `;
}

function reservePage(id=1){
  const b=books.find(x=>x.id===Number(id))||books[0];
  return `
    <div class="page-head"><div><h3>Reserva de libro</h3><p>P-06 · Solicita y confirma la reserva del ejemplar.</p></div></div>
    <section class="panel form-card">
      <div class="meta-grid">
        <div class="meta"><span>Libro seleccionado</span><strong>${esc(b.title)}</strong></div>
        <div class="meta"><span>Estado</span><strong>${b.available?'Disponible':'No disponible'}</strong></div>
      </div>
      <form id="reserve-form" class="form-2">
        <label>Fecha de reserva<input type="date" required value="2026-08-12"></label>
        <label>Fecha de recogida<input type="date" required value="2026-08-13"></label>
        <div class="form-actions" style="grid-column:1/-1"><button type="button" class="btn btn-secondary" data-route="detail" data-id="${b.id}">Cancelar</button><button class="btn btn-primary">Confirmar reserva</button></div>
      </form>
    </section>
  `;
}

function loansPage(){
  const mine=state.role==="Usuario";
  const rows=mine?loans.filter(x=>x.user==="Laura Pérez"||x.status==="Activo"):loans;
  return `
    <div class="page-head"><div><h3>${mine?'Mis préstamos':'Gestión de préstamos'}</h3><p>P-07 · ${mine?'Consulta tus préstamos y fechas.':'Registra, consulta e identifica préstamos pendientes.'}</p></div>
    ${!mine?'<button class="btn btn-primary" data-action="new-loan">Registrar préstamo</button>':''}</div>
    <section class="panel"><div class="table-wrap"><table>
      <thead><tr><th>Préstamo</th><th>Usuario</th><th>Libro</th><th>Fecha</th><th>Vencimiento</th><th>Estado</th><th>Acciones</th></tr></thead>
      <tbody>${rows.map(l=>`<tr><td><strong>${l.id}</strong></td><td>${esc(l.user)}</td><td>${esc(l.book)}</td><td>${l.date}</td><td>${l.due}</td><td><span class="status ${l.status==='Vencido'?'expired':l.status==='Pendiente'?'pending':'available'}">${l.status}</span></td><td>${mine?'<button class="btn btn-secondary small-btn" data-action="view-loan">Consultar</button>':'<button class="btn btn-secondary small-btn" data-action="view-loan">Consultar</button>'}</td></tr>`).join("")}</tbody>
    </table></div></section>
  `;
}

function returnsPage(){
  return `
    <div class="page-head"><div><h3>Devoluciones</h3><p>P-08 · Registra la devolución y actualiza la disponibilidad.</p></div></div>
    <section class="panel form-card">
      <form id="return-form" class="form-grid">
        <label>Préstamo<input required placeholder="PR-001" value="PR-001"></label>
        <label>Usuario<input required placeholder="Nombre del usuario" value="Laura Pérez"></label>
        <label>Libro<input required placeholder="Libro devuelto" value="Clean Code"></label>
        <label>Fecha de devolución<input required type="date" value="2026-08-12"></label>
        <label>Observaciones<textarea rows="4" placeholder="Observaciones sobre el estado del ejemplar"></textarea></label>
        <div class="form-actions"><button class="btn btn-primary">Registrar devolución</button></div>
      </form>
    </section>
  `;
}

function usersPage(){
  return `
    <div class="page-head"><div><h3>Gestión de usuarios</h3><p>P-09 · Registrar, consultar, modificar y asignar roles.</p></div><button class="btn btn-primary" data-action="new-user">Nuevo usuario</button></div>
    <section class="panel"><div class="table-wrap"><table>
      <thead><tr><th>ID</th><th>Nombre</th><th>Correo</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr></thead>
      <tbody>${users.map(u=>`<tr><td>${u.id}</td><td><strong>${esc(u.name)}</strong></td><td>${esc(u.email)}</td><td>${u.role}</td><td><span class="status available">${u.status}</span></td><td class="row-actions"><button class="btn btn-secondary small-btn" data-action="edit-user">Editar</button><button class="btn btn-danger small-btn" data-action="disable-user">Desactivar</button></td></tr>`).join("")}</tbody>
    </table></div></section>
  `;
}

function booksPage(){
  return `
    <div class="page-head"><div><h3>Gestión de libros</h3><p>P-10 · Registra, modifica, consulta y organiza el catálogo.</p></div><button class="btn btn-primary" data-action="new-book">Registrar libro</button></div>
    <section class="panel"><div class="table-wrap"><table>
      <thead><tr><th>ID</th><th>Título</th><th>Autor</th><th>Categoría</th><th>Editorial</th><th>Disponibilidad</th><th>Acciones</th></tr></thead>
      <tbody>${books.map(b=>`<tr><td>LB-${String(b.id).padStart(3,'0')}</td><td><strong>${esc(b.title)}</strong></td><td>${esc(b.author)}</td><td>${esc(b.category)}</td><td>${esc(b.publisher)}</td><td><span class="status ${b.available?'available':'loan'}">${b.available?'Disponible':'Prestado'}</span></td><td class="row-actions"><button class="btn btn-secondary small-btn" data-action="edit-book">Editar</button><button class="btn btn-danger small-btn" data-action="disable-book">Desactivar</button></td></tr>`).join("")}</tbody>
    </table></div></section>
  `;
}

function render(){
  const content=document.getElementById("page-content");
  const pages={dashboard, catalog, search:searchPage, detail:()=>detailPage(state.detailId), reserve:()=>reservePage(state.detailId), loans:loansPage, returns:returnsPage, users:usersPage, books:booksPage};
  content.innerHTML=(pages[state.current]||dashboard)();
  document.getElementById("page-title").textContent=titles[state.current]||"Panel principal";
  buildNav();
  bindPageEvents();
}

function navigate(route, id){
  if(["users","books","returns"].includes(route) && state.role==="Usuario"){ showToast("Esta función no está disponible para tu rol."); return; }
  if(route==="loans" && state.role==="Usuario") state.current="loans"; else state.current=route;
  if(id) state.detailId=id;
  render();
  window.scrollTo({top:0,behavior:"smooth"});
}

function bindPageEvents(){
  document.querySelectorAll("[data-route]").forEach(el=>el.addEventListener("click",()=>navigate(el.dataset.route,el.dataset.id)));
  document.querySelectorAll("[data-detail]").forEach(el=>el.addEventListener("click",()=>navigate("detail",el.dataset.detail)));
  document.querySelectorAll("[data-reserve]").forEach(el=>el.addEventListener("click",()=>navigate("reserve",el.dataset.reserve)));

  const searchBtn=document.getElementById("search-btn");
  if(searchBtn) searchBtn.addEventListener("click", runSearch);
  const query=document.getElementById("book-query");
  if(query) query.addEventListener("keydown",e=>{if(e.key==="Enter") runSearch();});

  const reserve=document.getElementById("reserve-form");
  if(reserve) reserve.addEventListener("submit",e=>{e.preventDefault(); showToast("Reserva registrada correctamente."); navigate("catalog");});

  const ret=document.getElementById("return-form");
  if(ret) ret.addEventListener("submit",e=>{e.preventDefault(); showToast("Devolución registrada y disponibilidad actualizada."); navigate("loans");});

  document.querySelectorAll("[data-action]").forEach(el=>el.addEventListener("click",()=>showToast(actionMessage(el.dataset.action))));
}

function actionMessage(action){
  return ({'new-loan':"Formulario de nuevo préstamo listo para implementar.",'view-loan':"Consulta del préstamo seleccionada.",'new-user':"Formulario de nuevo usuario listo para implementar.",'edit-user':"Modo edición de usuario seleccionado.",'disable-user':"Usuario marcado para desactivación.",'new-book':"Formulario de nuevo libro listo para implementar.",'edit-book':"Modo edición de libro seleccionado.",'disable-book':"Libro marcado para desactivación."})[action]||"Acción ejecutada.";
}

function runSearch(){
  const q=(document.getElementById("book-query").value||"").toLowerCase().trim();
  const filter=document.getElementById("book-filter").value;
  const results=books.filter(b=>{
    if(!q) return true;
    const value=filter==="title"?b.title:filter==="author"?b.author:filter==="category"?b.category:`${b.title} ${b.author} ${b.category}`;
    return value.toLowerCase().includes(q);
  });
  const box=document.getElementById("search-results");
  box.innerHTML=results.length?results.map(bookCard).join(""):`<div class="empty" style="grid-column:1/-1">No se encontraron resultados para los criterios ingresados.</div>`;
  box.querySelectorAll("[data-detail]").forEach(el=>el.addEventListener("click",()=>navigate("detail",el.dataset.detail)));
}

document.getElementById("login-form").addEventListener("submit", e=>{
  e.preventDefault();
  const role=document.querySelector(".role-chip.selected")?.dataset.demoRole || "Usuario";
  state.role=role;
  state.user=role==="Administrador"?"Administrador":role==="Bibliotecario"?"Carlos Gómez":"Laura Pérez";
  document.getElementById("login-view").classList.add("hidden");
  document.getElementById("app-shell").classList.remove("hidden");
  setupShell(); render(); showToast(`Sesión iniciada como ${role}.`);
});
document.querySelectorAll(".role-chip").forEach(chip=>chip.addEventListener("click",()=>{
  document.querySelectorAll(".role-chip").forEach(c=>c.classList.remove("selected"));
  chip.classList.add("selected");
  document.getElementById("login-user").value=chip.dataset.demoRole.toLowerCase();
  document.getElementById("login-password").value="demo123";
}));
document.getElementById("logout-btn").addEventListener("click",()=>{
  document.getElementById("app-shell").classList.add("hidden");
  document.getElementById("login-view").classList.remove("hidden");
  state.current="dashboard";
});
document.getElementById("menu-toggle").addEventListener("click",()=>document.getElementById("sidebar").classList.toggle("open"));
document.getElementById("theme-btn").addEventListener("click",()=>{
  state.highContrast=!state.highContrast;
  document.body.classList.toggle("high-contrast",state.highContrast);
  showToast(state.highContrast?"Contraste reforzado activado.":"Contraste normal activado.");
});
