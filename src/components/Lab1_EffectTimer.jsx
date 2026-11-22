import { useEffect, useState } from 'react';

// LAB 1 (Slide 07): useEffect Timer
export default function Lab1EffectTimer() {
  const [count, setCount] = useState(0);
  console.log('[LAB 1] rendered');

  useEffect(() => {
    console.log('[LAB 1] effect: timer started');
    // 1초마다 이전 값(prev)에 1을 더한다 (Functional State Update)
    const id = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    // Cleanup: 컴포넌트가 사라질 때 타이머를 정리한다
    return () => {
      clearInterval(id);
      console.log('[LAB 1] cleanup: timer cleared');
    };
    // Dependency Array가 []이면 마운트될 때 한 번만 실행된다.
    // []를 지우면 렌더링될 때마다 cleanup → effect가 반복된다.
  }, []);

  return (
    <div>
      <p className="hint">1초마다 자동으로 Count가 증가합니다.</p>
      <div className="count">{count}</div>
      <p className="hint">Console에서 Render / Effect / Cleanup을 비교하세요.</p>
    </div>
  );
}
