import { useEffect, useRef, useState } from 'react';

// LAB 4 (Slide 17): Timer ID를 useRef로 관리
export default function Lab4RefTimer() {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  // 타이머 ID는 화면에 보일 필요가 없으므로 ref에 보관한다
  const timerRef = useRef(null);

  const start = () => {
    // 이미 타이머가 있으면 새로 만들지 않는다 (중복 실행 방지)
    if (timerRef.current !== null) return;

    timerRef.current = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
    setRunning(true);
  };

  const stop = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setRunning(false);
  };

  const reset = () => {
    stop();
    setCount(0);
  };

  useEffect(() => {
    // 컴포넌트가 사라질 때 남아 있는 타이머를 정리한다
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div>
      <p className="status">상태: {running ? 'Running' : 'Stopped'}</p>
      <div className="count">{count}</div>
      <div className="controls">
        <button onClick={start} disabled={running}>Start</button>
        <button className="secondary" onClick={stop} disabled={!running}>Stop</button>
        <button className="secondary" onClick={reset}>Reset</button>
      </div>
      <p className="hint">Timer ID와 화면 표시용 상태의 차이를 설명해 보세요.</p>
    </div>
  );
}
