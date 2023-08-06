import React from 'react'
import Link from 'next/link'

export default function Submenu({ isSubmenu }) {
  return (
    <div className="submenu">
      <div className="submenu_header">
        <svg width="43" height="62" viewBox="0 0 43 62" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 41.2678C0.857048 52.3531 10.1236 61.0812 21.4286 61.0812C32.7337 61.0812 42.0002 52.3531 42.8573 41.2678H35.8928C35.0598 48.5178 28.9017 54.1478 21.4286 54.1478C13.9556 54.1478 7.79747 48.5178 6.96452 41.2678H0Z" fill="black"/>
          <path d="M11.5075 40.6907C14.2971 40.6907 16.3012 39.0657 16.3012 35.7074V23.4386C16.3012 20.1345 18.1158 17.8324 21.3387 17.8324C24.5075 17.8324 26.1596 19.8907 26.1596 23.222V35.7074C26.1596 39.0657 28.1366 40.6907 30.9533 40.6907C33.77 40.6907 35.7471 39.0657 35.7471 35.7074V21.1366C35.7471 14.1761 32.0908 10.0053 25.5096 10.0053C21.0137 10.0053 17.7908 12.172 16.2741 16.1261H16.0846V5.26573C16.0846 2.15115 14.3783 0.363647 11.3991 0.363647C8.41998 0.363647 6.68664 2.15115 6.68664 5.23865V35.7074C6.68664 39.0657 8.69081 40.6907 11.5075 40.6907Z" fill="black"/>
        </svg>
      </div>
      <div className="submenu_list">
        <ul className="submenu_list-menus">
          <li><Link className="mono3" href="/" onClick={() => isSubmenu(false)}>Home</Link></li>
          <li><Link className="mono3" href="/sales" onClick={() => isSubmenu(false)}>Product Sales</Link></li>
          <li><Link className="mono3" href="/blogs" onClick={() => isSubmenu(false)}>Hakka Paper</Link></li>
          <li><Link className="mono3" href="/" onClick={() => isSubmenu(false)}>Account</Link></li>
        </ul>
        <li className="submenu_list-btn mono3" onClick={() => isSubmenu(false)}>Close</li>
      </div>
      <div className="submenu_footer">
        <small className="footnote">KOTAK ⬤ BAJU 2023</small>
      </div>
    </div>
  )
}

 