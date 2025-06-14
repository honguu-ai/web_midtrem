// theme.js
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('theme-toggle')
  const body = document.body

  // 테마 상태 불러오기
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'light') {
    body.classList.add('light-theme')
  }

  // 버튼 텍스트 초기화
  updateButtonText()

  toggleButton.addEventListener('click', () => {
    body.classList.toggle('light-theme')

    // 테마 저장
    if (body.classList.contains('light-theme')) {
      localStorage.setItem('theme', 'light')
    } else {
      localStorage.setItem('theme', 'dark')
    }

    updateButtonText()
  })

  // 버튼 텍스트 업데이트 함수
  function updateButtonText() {
    if (body.classList.contains('light-theme')) {
      toggleButton.textContent = 'Drak mode'
      toggleButton.style.backgroundColor = '#333'
      toggleButton.style.color = '#fff'
    } else {
      toggleButton.textContent = 'Light mode'
      toggleButton.style.backgroundColor = '#fff'
      toggleButton.style.color = '#333'
    }
  }
})

// 타이핑 효과
document.addEventListener('DOMContentLoaded', () => {
  const typingElement = document.getElementById('typing-text')
  const textToType = 'This is ME!'
  let index = 0

  function typeText() {
    if (index < textToType.length) {
      typingElement.textContent += textToType.charAt(index)
      index++

      // 80ms ~ 250ms 사이 랜덤 속도
      const delay = Math.floor(Math.random() * 170) + 80
      setTimeout(typeText, delay)
    }
  }

  typeText()
})
