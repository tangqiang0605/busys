import { Button } from 'antd'
import React from 'react'
import TokenInfo from './TokenInfo'
import { useDispatch } from 'react-redux'
import { clearUser } from '../../store/user'

function DevTools() {
  const dispatch = useDispatch()
  return (
    <div>
      <Button onClick={() => window.open(import.meta.env.VITE_NEON_CONSOLE_URL as string, '_blank')}>跳转到SQL控制台</Button>
      <TokenInfo />

      <Button onClick={() => {
        dispatch(clearUser())
      }}>清除store的userInfo</Button>
    </div>
  )
}

export default DevTools