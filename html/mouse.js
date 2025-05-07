function createCustomCursor() {
    const cursor = document.createElement("div")
    cursor.id = "custom-cursor"
    cursor.style.position = "fixed"
    cursor.style.width = "20px"
    cursor.style.height = "20px"
    cursor.style.borderRadius = "50%"
    cursor.style.border = "2px solid white"
    cursor.style.backgroundColor = "rgba(255, 255, 255, 0.3)"
    cursor.style.transform = "translate(-50%, -50%)"
    cursor.style.pointerEvents = "none" 
    cursor.style.zIndex = "9999999" 
    cursor.style.transition = "transform 0.1s ease"
    document.body.appendChild(cursor)
    return cursor
  }

  function trackMouse(cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`

      const element = document.elementFromPoint(e.clientX, e.clientY)
      if (
        element &&
        (element.tagName === "A" ||
          element.tagName === "BUTTON" ||
          element.closest("a") ||
          element.closest("button") ||
          element.tagName === "INPUT" ||
          getComputedStyle(element).cursor === "pointer")
      ) {
        cursor.style.transform = "translate(-50%, -50%) scale(1.2)"
        cursor.style.backgroundColor = "rgba(255, 255, 255, 0.5)"
      } else {
        cursor.style.transform = "translate(-50%, -50%) scale(1)"
        cursor.style.backgroundColor = "rgba(255, 255, 255, 0.3)"
      }
    })

    document.addEventListener("mousedown", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(0.8)"
    })
  
    document.addEventListener("mouseup", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
    })
  }
  
  function hideOriginalCursor() {
    const style = document.createElement("style")
    style.innerHTML = `
      * {
        cursor: none !important;
      }
      
      #custom-cursor {
        cursor: none !important;
      }
    `
    document.head.appendChild(style)
  }

  function initCustomCursor() {
    const cursor = createCustomCursor()
    trackMouse(cursor)
    hideOriginalCursor()

    window.addEventListener("resize", () => {
      cursor.style.display = "block"
    })

    window.addEventListener("scroll", () => {
      cursor.style.display = "block"
    })

    window.addEventListener("focus", () => {
      cursor.style.display = "block"
    })

    document.addEventListener("mouseenter", () => {
      cursor.style.display = "block"
    })
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCustomCursor)
  } else {
    initCustomCursor()
  }

  setInterval(() => {
    if (!document.getElementById("custom-cursor")) {
      initCustomCursor()
    }
  }, 1000)
  