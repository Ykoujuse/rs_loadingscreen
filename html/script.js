const progressBar = document.getElementById("progressBar")
const progressText = document.getElementById("progressText")
const loadingText = document.getElementById("loadingText")
const tipText = document.getElementById("tipText")
const muteButton = document.getElementById("muteButton")
const bgMusic = document.getElementById("bgMusic")

bgMusic.volume = 0.3
let isMuted = false
let currentVolume = 0.3

const tips = [
  "提示：完成任务可以快速升级噢",
  "提示：按F1可以打开轮盘做很多事情",
  "提示：F2可以打开背包",
  "提示：加入Kook频道获取更多信息！",
]

let currentTipIndex = 0

let progress = 0
let loadingInterval
const fakeTotalDuration = 15000
const startTime = Date.now()

function init() {
  simulateLoading()
  setInterval(changeTip, 5000)
  setupVolumeControl()

  window.addEventListener("message", (event) => {
    const data = event.data

    if (data.eventName === "loadProgress") {
      updateRealProgress(data.loadFraction)
    }

    if (data.eventName === "updateText") {
      updateLoadingText(data.text)
    }
  })
}

function simulateLoading() {
  loadingInterval = setInterval(() => {
    const elapsed = Date.now() - startTime
    progress = Math.min((elapsed / fakeTotalDuration) * 100, 99.5)

    updateProgress(progress)

    if (progress < 30) {
      updateLoadingText("正在连接服务器...")
    } else if (progress < 60) {
      updateLoadingText("正在加载游戏资源...")
    } else if (progress < 90) {
      updateLoadingText("准备进入游戏世界...")
    } else {
      updateLoadingText("即将完成...")
    }

    if (progress >= 99.5) {
      clearInterval(loadingInterval)
    }
  }, 100)
}

function updateRealProgress(fraction) {
  if (loadingInterval) {
    clearInterval(loadingInterval)
  }

  progress = fraction * 100
  updateProgress(progress)

  if (fraction >= 1.0) {
    updateLoadingText("加载完成！")
    progressText.textContent = "100%"
    progressBar.style.width = "100%"
  }
}

function updateProgress(value) {
  progressBar.style.width = `${value}%`
  progressText.textContent = `${Math.floor(value)}%`
}

function updateLoadingText(text) {
  loadingText.textContent = text
}

function changeTip() {
  currentTipIndex = (currentTipIndex + 1) % tips.length
  tipText.textContent = tips[currentTipIndex]

  tipText.style.opacity = 0
  setTimeout(() => {
    tipText.textContent = tips[currentTipIndex]
    tipText.style.opacity = 1
  }, 500)
}

function setupVolumeControl() {
  const volumeSlider = document.getElementById("volumeSlider")

  volumeSlider.value = currentVolume * 100

  muteButton.addEventListener("click", () => {
    if (isMuted) {
      bgMusic.volume = currentVolume
      muteButton.textContent = "🎵"
      volumeSlider.value = currentVolume * 100
      isMuted = false
    } else {
      currentVolume = bgMusic.volume
      bgMusic.volume = 0
      muteButton.textContent = "🔇"
      volumeSlider.value = 0
      isMuted = true
    }
  })

  volumeSlider.addEventListener("input", function () {
    const volumeValue = this.value / 100
    bgMusic.volume = volumeValue
    currentVolume = volumeValue

    if (volumeValue === 0) {
      muteButton.textContent = "🔇"
      isMuted = true
    } else {
      muteButton.textContent = "🎵"
      isMuted = false
    }
  })
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init)
} else {
  init()
}
