import React from 'react'

export type HelloProps = {
  name?: string
}

const Hello: React.FC<HelloProps> = ({ name = 'World' }) => {
  return <div style={{fontFamily: 'sans-serif'}}>Hello, {name} 👋</div>
}

export default Hello
