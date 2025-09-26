import React from 'react'

export type HelloProps = {
  name?: string
}

export const Hello: React.FC<HelloProps> = ({ name = 'World' }) => {
  return <div style={{fontFamily: 'sans-serif', padding: 32}}>Hello, {name} 👋</div>
}
