import { useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"

const Submenu = dynamic(() => import('./Submenu'), {
  ssr: false,
  loading: () => <p>Loading...</p>
})

export default function Navbar() {
  const [ submenu, isSubmenu ] = useState(false)
  return (
    <>
      <nav>
        <div className="logo">
          <svg width="42" height="42" viewBox="0 0 245 245" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.093e-06 118.672L122.5 118.672L122.5 156.953L0 156.953L8.28773e-06 194.223C5.8361e-06 222.266 22.7337 245 50.7772 245L194.223 245C222.266 245 245 222.266 245 194.223L245 50.7772C245 22.7337 222.266 1.18739e-05 194.223 1.30998e-05L160.781 1.45615e-05L160.781 118.672L122.5 118.672V1.62349e-05L50.7772 0C22.7338 1.22582e-06 2.32798e-05 22.7337 2.08281e-05 50.7772L7.093e-06 118.672ZM160.781 156.953L160.781 195.234H199.062L199.062 156.953H160.781Z" fill="black"/>
          </svg>
        </div>
        <div className="menus">
          <div className="menus_shop">
            <div className="menus_shop-header mono3" style={{color: "black"}}>Shop</div>
            <ul className="menus_shop-menu">
              <li><Link className="mono3" href="/">Home</Link></li>
              <li><Link className="mono3" href="/sales">Product Sales</Link></li>
            </ul>
          </div>
          <div className="menus_others">
            <li><Link className="mono3" href="/blogs">Hakka Paper</Link></li>
            <li><Link className="mono3" href="/">Account</Link></li>
          </div>
          <div className="menus_submenu">
            <li className="mono3" onClick={() => isSubmenu(true)}>Menu</li>
          </div>
        </div>
      </nav>
      {submenu && <Submenu isSubmenu={isSubmenu} />}
    </>
  )
}