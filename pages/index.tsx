import React, { Suspense } from 'react'
import HomePage from './home'

export default function IndexPage() {

  return (
    <>
      <Suspense fallback={null}>
        <HomePage />
      </Suspense>
    </>
  )
}
