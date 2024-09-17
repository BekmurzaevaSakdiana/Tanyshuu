import React from 'react'

export default function FooterMain() {
  return (
   <footer className='footerMain bg-black pt-12 p-5'>
    <div className="container">
        <div className="footer-items flex flex-col justify-center items-center gap-5">
            <div className="nickNames">
                <p className='font-mont text-white'>@its_smoothie</p>
                <p className='font-mont text-white'>@rustambbekova</p>
            </div>
        </div>
    </div>
   </footer>
  )
}
