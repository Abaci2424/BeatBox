let audio = []
let startTime;
let endTime;
let isStarting = false

const btns = [
  { btnId: 'btn1', audioId: 'sample1' },
  { btnId: 'btn2', audioId: 'sample2' },
  { btnId: 'btn3', audioId: 'sample3' },
  { btnId: 'btn4', audioId: 'sample4' },
  { btnId: 'btn5', audioId: 'sample5' },
  { btnId: 'btn6', audioId: 'sample6' },
  { btnId: 'btn7', audioId: 'sample7' },
  { btnId: 'btn8', audioId: 'sample8' },
  { btnId: 'btn9', audioId: 'sample9' },
  { btnId: 'btn10', audioId: 'sample10' },
  { btnId: 'btn11', audioId: 'sample11' },
  { btnId: 'btn12', audioId: 'sample12' },
  { btnId: 'btn13', audioId: 'sample13' },
  { btnId: 'btn14', audioId: 'sample14' },
  { btnId: 'btn15', audioId: 'sample15' },
  { btnId: 'btn16', audioId: 'sample16' },
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
