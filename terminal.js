const terminal = document.getElementById('terminal')
const input = document.getElementById('command')

const commands = {
  help: `Available commands:
whoami      
bio         
projects    
contact            `,
  whoami: '김민준@SCP',
  bio: `저는 중부대학교 정보보호학과에 재학 중이며
RubiyaLab에서 보안 공부를 하고 있습니다.
Pwnable분야를 공부중이며, WEB3에도 관심이 있습니다.`,
  projects: `- picoCTF 참가
- 시스템 해킹 공부 중
- glibc 분석 및 FILE 구조체 활용
- LubiyaLab 활동`,
  contact: `Email: alhabhonggu@gmail.com
Phone: 010-7522-6585`,
}

input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    const cmd = input.value.trim()

    if (cmd === 'clear') {
      terminal.innerHTML = ''
    } else {
      const output = commands[cmd] || `Command not found: ${cmd}`
      terminal.innerHTML += `<div>&gt; ${cmd}</div><div>${output.replace(
        /\n/g,
        '<br>'
      )}</div>`
    }

    input.value = ''
    window.scrollTo(0, document.body.scrollHeight)
  }
})
window.addEventListener('load', () => {
  input.focus()
})
document.addEventListener('click', () => {
  input.focus()
})
