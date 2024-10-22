import React from 'react'
import Image from "next/image";

export default function NotFound() {
  return (
    <div>
      <h1>404 - NotFound</h1>
      <h2>This page could not be found.</h2>
      <Image layout="intrinsic" src="https://lojaintegrada.com.br/hub/wp-content/uploads/2023/05/erro-404-4.webp" alt="Página de erro." width={400} height={400} />
    </div>
  )
}
