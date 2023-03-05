let audio = []
let startTime;
let endTime;
let isStarting = false

const btns = [
  { btnId: 'btn1', audioId: 'sample1', file: './samples/1.mp3' },
  { btnId: 'btn2', audioId: 'sample2', file: './samples/2.mp3' },
  { btnId: 'btn3', audioId: 'sample3', file: './samples/3.mp3' },
  { btnId: 'btn4', audioId: 'sample4', file: './samples/4.mp3' },
  { btnId: 'btn5', audioId: 'sample5', file: './samples/5.mp3' },
  { btnId: 'btn6', audioId: 'sample6', file: './samples/6.mp3' },
  { btnId: 'btn7', audioId: 'sample7', file: './samples/7.mp3' },
  { btnId: 'btn8', audioId: 'sample8', file: './samples/8.mp3' },
  { btnId: 'btn9', audioId: 'sample9', file: './samples/9.mp3' },
  { btnId: 'btn10', audioId: 'sample10', file: './samples/10.mp3' },
  { btnId: 'btn11', audioId: 'sample11', file: './samples/11.mp3' },
  { btnId: 'btn12', audioId: 'sample12', file: './samples/12.mp3' },
  { btnId: 'btn13', audioId: 'sample13', file: './samples/13.mp3' },
  { btnId: 'btn14', audioId: 'sample14', file: './samples/14.mp3' },
  { btnId: 'btn15', audioId: 'sample15', file: './samples/15.mp3' },
  { btnId: 'btn16', audioId: 'sample16', file: './samples/16.mp3' },
]

const addSample = (btnId, audioId) => {
  audio.push({ btnId, audioId, time: new Date() })
}

$(document).ready(function() {

  btns.forEach(({ btnId, audioId }) => {
    const audioCntrl = document.getElementById(audioId);

    $(`#${btnId}`).mousedown(function() {
      audioCntrl.currentTime = 0;
      audioCntrl.play();

      if (isStarting) {
        addSample(btnId, audioId)
      }
    });
  })

    $("#btn-start").mousedown(function() {
      isStarting = true
      audio = []
      startTime = new Date()
      endTime = undefined

      const btnStart = document.getElementById("btn-start");
      btnStart.classList.add('hidden')

      const btnEnd = document.getElementById("btn-end");
      btnEnd.classList.remove('hidden')
    });

    $("#btn-end").mousedown(function() {
      isStarting = false
      endTime = new Date()

      const btnStart = document.getElementById("btn-start");
      btnStart.classList.remove('hidden')

      const btnEnd = document.getElementById("btn-end");
      btnEnd.classList.add('hidden')
    });

    $("#btn-play").mousedown(function() {
      audio.forEach(({ btnId, audioId, time }) => {
        const timeDiff = time - startTime
        const audioCntrl = document.getElementById(audioId);
        const btn = document.getElementById(btnId);

        setTimeout(() => {
          audioCntrl.play()

          btn.classList.add('btn-play')

          setTimeout(() => {
            btn.classList.remove('btn-play')
          }, 150)
        }, timeDiff)
      })
    });
  });

$("#select-table").change(function(e) {
  const currentValue = e.currentTarget.value
  let elements
  let gridClass

  switch (currentValue) {
    case '2x2': {
      gridClass = 'twoOnTwo'
      elements = 4
      break
    }
    case '3x3': {
      gridClass = 'threeOnThree'
      elements = 9
      break
    }
    case '4x4': {
      gridClass = 'fourOnFour'
      elements = 16
      break
    }
    default:
      throw new Error(`Table is not supported ${currentValue} format`)
  }

  $("#instrument").empty()
  $("#instrument").removeAttr('class')
  $("#instrument").addClass(gridClass)

  for (let i = 0; i < elements; i++) {
    const index = i

    $("#instrument").append(`<div id="btn${index + 1}" class="box"></div>`);
  }

  btns.slice(0, elements).forEach(({ btnId, audioId }) => {
    const audioCntrl = document.getElementById(audioId);

    $(`#${btnId}`).mousedown(function() {
      audioCntrl.currentTime = 0;
      audioCntrl.play();

      if (isStarting) {
        addSample(btnId, audioId)
      }
    });
  })
});