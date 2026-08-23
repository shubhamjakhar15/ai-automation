import React from 'react'



import './App.css'
import AppRoutes from './appRoutes/AppRoutes'

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react'

function App() {
  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App