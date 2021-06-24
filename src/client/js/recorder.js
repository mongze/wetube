const startBtn = document.getElementById('startBtn');
const video = document.getElementById('preview');

let stream;

const handleStop = () => {
  startBtn.innerText = 'Start Recording';
  startBtn.removeEventListener('click', handleStop);
  startBtn.addEventListener('click', handleStart);
};

const handleStart = () => {
  startBtn.innerText = 'Stop Recording';
  startBtn.removeEventListener('click', handleStart);
  startBtn.addEventListener('click', handleStop);

  const recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => console.log(e); // BlobEvent
  console.log(recorder);
  recorder.start();
  console.log(recorder);
  setTimeout(() => {
    recorder.stop();
  }, 10000);
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
  video.srcObject = stream; // src 파일이 아니니까!
  video.play();
};

init();
startBtn.addEventListener('click', handleStart);
