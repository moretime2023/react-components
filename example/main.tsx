import React from 'react'
import { createRoot } from 'react-dom/client'
import { Hello } from '../src'

const App = () => (
  <div style={{padding:20}}>
    <h1>Example Preview</h1>
    <Hello name="Vite + React + TSX" />
  </div>
)

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
