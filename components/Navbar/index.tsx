import React from 'react'
import { Container } from '../Container'
import Link from 'next/link'

function Navbar() {
  return (
    <Container>
      <nav className="py-4">
      <div className="flex justify-between items-center">
        <Link href="/"> ACME</Link>
        <div className="space-x-4">
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/blog">Blog</Link>
        </div>
      </div>
      </nav>
    </Container>
  )
}

export default Navbar