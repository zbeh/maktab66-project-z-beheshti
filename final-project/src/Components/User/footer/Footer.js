import React from 'react'
import footerStyles from './footerStyles.module.scss'
export default function Footer() {
  return (
    <footer className={footerStyles.footer}>
      <div className='d-flex justify-between container'>
      <p className={footerStyles.content} > تمامی حقوق محفوظ است.</p>
      <p className={footerStyles.content}>2022&copy;</p>
      </div>
   
    </footer>
    
  )
}
