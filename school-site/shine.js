function setupShine() {
  document.querySelectorAll('.shine').forEach( element => {
    element.addEventListener('mousemove', event => {
      let elRect = element.getBoundingClientRect();
      let x = event.clientX - elRect.x;
      let y = event.clientY - elRect.y;

      element.style.setProperty('--gradient-x', `${x}px`)
      element.style.setProperty('--gradient-y', `${y}px`)
    })
  });
}

setupShine();
