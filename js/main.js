const grid = new Muuri('.grid', {
  layout: {
   rounding: false
  }
});

window.addEventListener('load',() => {
  grid.refreshItems().layout();
document.getElementById('grid').classList.add('imagenes-cargadas');  

  //listeners de enlaces para filtrar por categoria
  const enlaces = document.querySelectorAll('#categorias a');
  
  enlaces.forEach((elemento) => {
  elemento.addEventListener('click', (evento) =>{
    evento.preventDefault();
//    revisamos cada enlace, y removemos la clase 'activo'
    enlaces.forEach((enlace ) => enlace.classList.remove('activo')); 
//adicionamos la clase 'activo al enlace seleccionado'
    evento.target.classList.add('activo');

    const categoria = evento.target.innerHTML.toLowerCase(); 
    categoria === 'tudos' ? grid.filter('[data-categoria]'): grid.filter(`[data-categoria = "${categoria}"]`);    
    });  
  });

  //listener barra de busqueda 
  document.querySelector('#barra-busqueda').addEventListener('input',(evento) =>{
    const busqueda = evento.target.value; 
    grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda));
  });
//listener imagenes
  const overlay = document.getElementById('overlay');
  document.querySelectorAll('.grid .item img').forEach((elemento) => {

   
    elemento.addEventListener('click', () => {
      const ruta = elemento.getAttribute('src');
      const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
      overlay.classList.add('activo');
      document.querySelector('#overlay img').src = ruta;
      document.querySelector('#overlay .descripcion').innerHTML = descripcion;
    });
  });
  //event listener boton cerrar
  document.querySelector('#btn-cerrar-popup').addEventListener('click', () =>{
    overlay.classList.remove('activo');
  });
  overlay.addEventListener('click', (evento) => {
   //
    evento.target.id === 'overlay' ? overlay.classList.remove('activo'):'';
  });
  overlay.addEventListener('keypress', () =>{
    overlay.classList.remove('activo');
  })
  /* / listener boton de esc
  const escape   = document.querySelector("escape");

  window.addEventListener('keypress', (esc) => {
    overlay.classList.remove('activo');

  })*/
});
 
