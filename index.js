const pages = document.querySelectorAll('[data-page]')
const drums = document.querySelectorAll('.main-drum')
const result = document.querySelector('.main-result')
const go = document.querySelector('.main-go')
const drumsAngles = [0, 0, 0]
const drumsResults = []

document.addEventListener('click', (event) => {
  const target = event.target

  if (target.classList.contains('btn')) {
    const current = target.closest('.current')

    for (page of pages) {
      if (page.dataset.page === target.textContent.toLowerCase()) {
        current.classList.remove('current')
        page.classList.add('current')
      }
    }
  }

  if (target.classList.contains('main-go')) {
    result.textContent = ''

    for (let i = 0; i < drums.length; i++) rotateDrum(drums[i], i)

    setTimeout(renderResult, 5000)
  }
})

function rotateDrum(drum, index) {
  drumsAngles[index] -= Math.ceil(Math.random() * 40) * 100

  while (drumsAngles[index] % 40 !== 0) {
    drumsAngles[index]--
  }

  drumsResults.push(((drumsAngles[index] % 360) - 40) / -40)

  drum.style.transform = `rotateX(${drumsAngles[index]}deg)`

  go.disabled = true
}

function renderResult() {
  go.disabled = false
  go.textContent = 'Try again!'

  drumsResults.every((value) => value === drumsResults[0])
    ? (result.textContent = 'You WIN!')
    : (result.textContent = 'You LOSE! Try again.')

  drumsResults.length = 0
}
