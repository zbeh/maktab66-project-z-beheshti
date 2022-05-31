import React from 'react'
import bankPort from '../../../Assets/Images/pay.png'
import shaparakStyles from "./shaparakStyles.module.scss"
import { Link } from 'react-router-dom'
export default function Shaparak() {
  return (
    <div className={`container ${shaparakStyles.imgContainer}`}>
      <Link to="/pay-result" state={{ from: "successful" }}>
      <img src={bankPort} alt={'no image'}/>
      </Link>
     
    </div>
  )
}
