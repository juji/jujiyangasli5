<!-- <script lang="ts">
  function draw(x: number) {
  var g = document.createElementNS("http://www.w3.org/2000/svg", "g")
  g.id = "canvas"
  canvas.parentNode.replaceChild(g, canvas)
  for (var i = 1; i < x; i++) {
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    rect.setAttribute("width", "100")
    rect.setAttribute("height", "100")
    rect.setAttribute("filter", "url(#" + filter + ")")
    rect.setAttribute("fill", "rgba(128,128,128,0.8)")
    rect.setAttribute("x", Math.random() * 300)
    rect.setAttribute("y", Math.random() * 300)
    g.appendChild(rect)
  }

  }
</script>


<svg xmlns="http://www.w3.org/2000/svg" class="hidden">
  <filter id="goo">
    <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
    <feColorMatrix in="blur" type="matrix" 
      values="1 0 0 0 0  
              0 1 0 0 0  
              0 0 1 0 0  
              0 0 0 3 -1" />

  </filter>
  <filter id="goosafari">
    <feGaussianBlur in="dimmed" stdDeviation="1" result="blur" />
    <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  
                                                  0 1 0 0 0  
                                                  0 0 1 0 0  
                                                  0 0 0 21 -7" />
    <feComposite in="blur" in2="goo" operator="in" result="composite" />
  </filter>
</svg>

<style>
  svg.hidden{
    height: 0;
    width: 0;
    position: absolute;
  }
</style> -->