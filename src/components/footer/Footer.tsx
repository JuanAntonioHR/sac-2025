import React from 'react'
import logoCD from "./assets/legoCD.svg"
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className=' w-full h-fit p-5 flex flex-col justify-center items-center overflow-clip'>
       <div className="h-1 w-2xl bg-linear-[90deg,rgba(247,94,99,1)_25%,rgba(66,205,255,1)_25%,rgba(66,205,255,1)_50%,rgba(197,240,111,1)_50%,rgba(214,235,107,1)_75%,rgba(255,223,98,1)_75%,rgba(255,223,98,1)_100%]" />
       <p className=' flex flex-row items-center font-light md:text-xl text-blacksac'>MADE WITH LOVE BY <span> <Image alt='' src={logoCD}/> </span> CENTRO DE DESARROLLO | 2025</p>
    </footer>
  )
}

export default Footer
