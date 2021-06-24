const startBtn = document.getElementById('startBtn');
const video = document.getElementById('preview');

const handleStart = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
  video.srcObject = stream; // src 파일이 아니니까!
  video.play();
};

startBtn.addEventListener('click', handleStart);
