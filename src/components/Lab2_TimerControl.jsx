import { useEffect, useState } from 'react';

// 초 단위 count를 mm:ss 형식으로 바꾼다 (예: 75 → 01:15)
const formatTime = (sec) =>
  `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;

// LAB 2 (Slide 10): Timer Start / Stop / Reset
export default function Lab2TimerControl() {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    // running이 false면 타이머를 만들지 않는다
    if (!running) return;

    // running이 true일 때만 1초마다 count 증가
    const id = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    // running이 바뀌거나 컴포넌트가 사라질 때 타이머 정리
    return () => clearInterval(id);
  }, [running]);

  const reset = () => {
    // running을 false로 바꾸면 Cleanup이 타이머를 멈춘다
    setRunning(false);
    setCount(0);
  };

  return (
    <div>
      <p className={running ? 'status running' : 'status'}>
        상태: {running ? '● Running' : '■ Stopped'}
      </p>
      <div className="count">{formatTime(count)}</div>
      <div className="controls">
        <button onClick={() => setRunning(true)} disabled={running}>Start</button>
        <button className="secondary" onClick={() => setRunning(false)} disabled={!running}>Stop</button>
        <button className="secondary" onClick={reset}>Reset</button>
      </div>
      <p className="hint">Start/Stop 버튼의 State 변경과 Effect 실행의 관계를 확인하세요.</p>
    </div>
  );
}
