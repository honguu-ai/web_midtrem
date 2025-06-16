document.addEventListener('DOMContentLoaded', () => {
  // 원하는 태그들 선택
  const targets = document.querySelectorAll('section, h2, p, img')

  targets.forEach((el) => {
    el.classList.add('fade-in-init')
  })

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible')
          obs.unobserve(entry.target) // 한 번만 실행
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -10px 0px',
    }
  )

  targets.forEach((el) => observer.observe(el))
})
