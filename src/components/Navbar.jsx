import { useState } from "react"
import Link from "next/link"

export default function Navbar({ length }) {
  const [ submenu, isSubmenu ] = useState(false)

  const Submenu = () => {
    return (
      <div className="submenu">
        <div className="submenu_header">
          <h1>HAKKA</h1>
        </div>
        <div className="submenu_list">
          <ul className="submenu_list-menus">
            <li><Link className="mono3" href="/" onClick={() => isSubmenu(false)}>Home</Link></li>
            <li><Link className="mono3" href="/sales" onClick={() => isSubmenu(false)}>Sales</Link></li>
            <li><Link className="mono3" href="/" onClick={() => isSubmenu(false)}>Shopping bag (0)</Link></li>
            <li className="mono3">Hakka Paper</li>
            <li><Link className="mono3" href="/" onClick={() => isSubmenu(false)}>Account</Link></li>
          </ul>
          <li className="submenu_list-btn mono3" onClick={() => isSubmenu(false)}>Close</li>
        </div>
        <div className="submenu_footer">
          <small className="footnote">HAKKA 2023</small>
        </div>
      </div>
    )
  }

  return (
    <>
      <nav>
        <div className="logo">
          <h1>HAKKA</h1>
        </div>
        <div className="menus">
          <div className="menus_shop">
            <div className="menus_shop-header mono3" style={{color: "black"}}>Shop</div>
            <ul className="menus_shop-menu">
              <li><Link className="mono3" href="/">Home</Link></li>
              <li><Link className="mono3" href="/sales">Sales</Link></li>
              <li><Link className="mono3" href="/">Shopping bag ({length})</Link></li>
            </ul>
          </div>
          <div className="menus_others">
            <li className="mono3">Hakka Paper</li>
            <li><Link className="mono3" href="/">Account</Link></li>
          </div>
          <div className="menus_submenu">
            <li className="mono3" onClick={() => isSubmenu(true)}>Menu</li>
          </div>
        </div>
      </nav>
      {submenu && <Submenu />}
    </>
  )
}