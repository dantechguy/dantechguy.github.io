document.querySelectorAll('nav span.sm').forEach(el => {
  el.style.setProperty('--desired-width', `${el.offsetWidth}px`)
  el.style.width = '0px'
})