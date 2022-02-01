// ===== interface controls ===============================

let yourVotefor = document.querySelector('.d-1-1 span') 
let office = document.querySelector('.d-1-2 span') 
let description = document.querySelector('.d-1-4')  
let note = document.querySelector('.d-2') 
let rightSide = document.querySelector('.d-1--right')  
let numbers = document.querySelector('.d-1-3')  

// ===== environment control ==============================

let initialStep = 0  // etapa atual
let number = ''
let whiteVote = false
let votes = []

function startStage() { // comecar etapa  
  let stage = stages[initialStep]

  let numberHTML = ''
  number = ''
  whiteVote = false

  for(let i = 0; i < stage.numbers; i++) {
    if(i === 0) {
      numberHTML += '<div class="number focus"></div>'
    } else {
      numberHTML += '<div class="number"></div>'
    }
  }

  yourVotefor.style.display = 'none'
  office.innerHTML = stage.title
  description.innerHTML = ''
  note.style.display = 'none'
  rightSide.innerHTML = ''
  numbers.innerHTML = numberHTML
}

function updateInterface() { // atualizar interface
  let stage = stages[initialStep]
  let candidate = stage.candidates.filter((item) => {
    if(item.number === number) {
      return true
    } else {
      return false
    }
  })
  if(candidate.length > 0) {
    candidate = candidate[0]
    yourVotefor.style.display = 'block'
    office.innerHTML = stage.title
    note.style.display = 'block'
    description.innerHTML = `Nome: ${candidate.name}<br>Partido: ${candidate.politicalParty}`

    let imgHTML = ''
    for(let i in candidate.img) {
      if(candidate.img[i].small) {
        imgHTML += `
        <div class="d-1-image small">
          <img src="./assets/images/${candidate.img[i].url}" alt="man-image">
          ${candidate.img[i].subtitle}
        </div>`
      } else {
        imgHTML += `
        <div class="d-1-image">
          <img src="./assets/images/${candidate.img[i].url}" alt="man-image">
          ${candidate.img[i].subtitle}
        </div>`
      }
    }
    rightSide.innerHTML = imgHTML
  } else {
    yourVotefor.style.display = 'block'
    note.style.display = 'block'
    description.innerHTML = '<div class="note--big focus">VOTO NULO</div>'
  }
}

// ===== functions ========================================

function clicked(n) {
 let elNumber = document.querySelector('.number.focus')
 let audio = new Audio('assets/sounds/click.mp3')
 if(elNumber !== null) {
  elNumber.innerHTML = n
  number = `${number}${n}`

  elNumber.classList.remove('focus')
  if(elNumber.nextElementSibling !== null) {
    elNumber.nextElementSibling.classList.add('focus') // add o próximo elemento
  } else {
    updateInterface()
  }
  audio.play()
 }
}

function white() {
  let audio = new Audio('assets/sounds/click.mp3')
  if(number === '') {
    whiteVote = true
    yourVotefor.style.display = 'block'
    note.style.display = 'block'
    numbers.innerHTML = ''
    description.innerHTML = '<div class="big-white focus">VOTO EM BRANCO</div>'
    audio.play()
  }
}

function correct() {
  let audio = new Audio('assets/sounds/click.mp3')
  audio.play()
  startStage()
}

function confirmed() {
  let audio = new Audio('assets/sounds/confirm.mp3')
  let audioEnd = new Audio('assets/sounds/confirmEnd.mp3')
  let stage = stages[initialStep]
  let confirmedVote = false

  if(whiteVote === true) {
    confirmedVote = true
    votes.push({
      stage: stages[initialStep].title,
      vote: 'BRANCO'
    })
  } else if(number.length === stage.numbers) {
  confirmedVote = true
  votes.push({
    stage: stages[initialStep].title,
    vote: number
  })
  }

  if(confirmedVote) {
    initialStep++
    if(stages[initialStep] !== undefined) {
      audio.play()
      startStage()
    } else {
      document.querySelector('.screen').innerHTML = '<div class="note--extra-big">FIM</div>'
      console.log(votes)
      audioEnd.play()
    }
  }
}
// ===== functions performed ===============================

startStage()