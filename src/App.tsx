import './App.css';
import { useEffect, useRef } from 'react';
import { engineExec } from './engine-exec';

function App() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const devref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!ref.current || !devref.current) {
      return;
    }

    engineExec(ref.current, devref.current);
  }, [ref.current]);
  
  return (
    <div className='App'>
      <canvas ref={ref} />
      <canvas ref={devref} />
    </div>
  );
}

export default App;
