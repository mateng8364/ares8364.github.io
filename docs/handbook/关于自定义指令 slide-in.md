关于自定义指令 slide-in

````js
const DISTANCE = 100
const weakMap = new WeakMap()

const ob = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const animation = weakMap.get(entry.target)
      if (animation) {
        animation.play()
        ob.unobserve(entry.target)
      }
    }
  }
})

function isBelowViewport(el) {
  const rect = el.getBoundingClientRect()
  return rect.top - DISTANCE > window.innerHeight
}

export default function (Vue) {
  Vue.directive('slide-in', {
    inserted(el) {
      if (!isBelowViewport(el)) {
        return false
      }
      const animation = el.animate(
        [
          {
            transform: `translateY(${DISTANCE}px)`,
            opacity: 0.5
          },
          {
            transform: 'translateY(0)',
            opacity: 1
          }
        ],
        {
          duration: 500,
          easing: 'ease-in-out',
          fill: 'forwards'
        }
      )
      animation.pause()
      ob.observe(el)
      weakMap.set(el, animation)
    },
    unbind(el) {
      ob.unobserve(el)
    }
  })
}

````

