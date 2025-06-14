const loginScreen = document.getElementById('login-screen')
const cursor = document.createElement('span')
cursor.classList.add('blinking-cursor')
cursor.textContent = '_'
loginScreen.appendChild(cursor)

const loginLines = [
  'login: guest',
  'password: ********',
  '',
  'Authenticating...',
  '',
  'Access granted.',
  'Welcome, guest.',
  '',
  'Booting terminal interface ▓▒░',
]

// 새롭게 추가된 디렉토리/파일 구조 메시지
const directoryLines = [
  '>> Scanning file system...',
  '>> Initiating integrity check...',
  '',
  '>> Root directory (/)',
  '├── bin',
  '├── boot',
  '├── dev',
  '├── etc',
  '│   ├── hostname',
  '│   ├── passwd',
  '│   └── fstab',
  '├── home',
  '│   └── guest',
  '│       ├── .bashrc',
  '│       └── documents',
  '│           ├── project_alpha',
  '│           │   └── main.py',
  '│           └── report.pdf',
  '├── lib',
  '├── mnt',
  '├── opt',
  '├── proc',
  '├── root',
  '├── run',
  '├── sbin',
  '├── srv',
  '├── sys',
  '├── tmp',
  '├── usr',
  '│   ├── local',
  '│   ├── bin',
  '│   └── share',
  '└── var',
  '    ├── log',
  '    └── cache',
  '',
  '>> Filesystem check complete.',
  '>> All systems go.',
]

let lineIndex = 0

// **타이핑 효과 함수**: 글자가 한 글자씩 출력됩니다.
function typeText(targetText, onDone) {
  let charIndex = 0
  // 현재 줄을 위한 텍스트 노드를 생성하고 커서 앞에 삽입합니다.
  const currentLineNode = document.createTextNode('')
  loginScreen.insertBefore(currentLineNode, cursor)

  function typeChar() {
    if (charIndex < targetText.length) {
      currentLineNode.nodeValue += targetText[charIndex] // 한 글자씩 추가
      charIndex++
      loginScreen.scrollTop = loginScreen.scrollHeight // 스크롤바를 가장 아래로 이동
      setTimeout(typeChar, 40) // 글자마다 40ms 딜레이
    } else {
      currentLineNode.nodeValue += '\n' // 줄바꿈 추가
      loginScreen.scrollTop = loginScreen.scrollHeight // 최종 스크롤 유지
      if (onDone) setTimeout(onDone, 500) // 다음 동작으로 넘어가는 500ms 딜레이
    }
  }
  typeChar() // 타이핑 시작
}

// **즉시 출력 함수**: 한 줄을 통째로 바로 출력합니다.
function overwriteLine(text) {
  const lineNode = document.createTextNode(text + '\n')
  loginScreen.insertBefore(lineNode, cursor)
  loginScreen.scrollTop = loginScreen.scrollHeight // 스크롤바를 가장 아래로 이동
}

// **디렉토리 구조 출력 함수**: 각 줄을 즉시 출력합니다.
function printDirectoryStructure(onDone) {
  let dirLineIndex = 0

  function printNextDirectoryLine() {
    if (dirLineIndex >= directoryLines.length) {
      if (onDone) onDone() // 모든 디렉토리 라인 출력이 끝나면 다음 콜백 호출
      return
    }

    const text = directoryLines[dirLineIndex]
    dirLineIndex++
    overwriteLine(text) // 디렉토리 줄은 타이핑 없이 바로 출력
    setTimeout(printNextDirectoryLine, 50) // 각 디렉토리 줄 간 50ms 딜레이
  }

  printNextDirectoryLine() // 디렉토리 구조 출력 시작
}

// **메인 시퀀스 관리 함수**
function showNextLine() {
  if (lineIndex >= loginLines.length) {
    // loginLines가 모두 출력되면 디렉토리 구조 출력 시작
    printDirectoryStructure(() => {
      // 디렉토리 구조 출력이 끝난 후 터미널 시작 메시지들을 타이핑 효과로 출력
      typeText('>> /bin/init....ok', () => {
        typeText('>> env loaded', () => {
          typeText('>> starting shell...', () => {
            // 모든 메시지가 출력된 후 1.5초 뒤 terminal.html로 이동
            setTimeout(() => {
              window.location.href = 'terminal.html'
            }, 1500)
          })
        })
      })
    })
    return
  }

  // loginLines의 각 줄을 타이핑 효과로 출력
  const text = loginLines[lineIndex]
  lineIndex++
  typeText(text, showNextLine) // 다음 줄 출력을 위해 showNextLine 재귀 호출
}

// 스크립트 시작: 첫 번째 로그인 줄 출력
showNextLine()
