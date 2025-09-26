import { createRoot } from 'react-dom/client'
// import { Hello } from '../src/index'
import { Hello } from '@moretime/react-components';

const App = () => <div className='size-full' style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
  <h2>Example View</h2>

  <div style={{flex: 1, overflow: 'hidden', borderRadius: '24px', border: '2px solid red'}}>
    <Hello name='123333' />
  </div>
</div>


const root = createRoot(document.getElementById('root')!)
root.render(<App />)
