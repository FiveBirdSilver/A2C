import { useState, useEffect } from 'react'

const useTimer = (initialTime: number) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return // 타이머가 작동 중이 아니거나 시간이 끝났을 때 멈춤

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(timerId) // 컴포넌트가 사라질 때 타이머 정리
  }, [isRunning, timeLeft])

  const startTimer = () => setIsRunning(true)
  const resetTimer = () => {
    setTimeLeft(initialTime)
    setIsRunning(false)
  }

  return { timeLeft, startTimer, resetTimer }
}

export default useTimer
