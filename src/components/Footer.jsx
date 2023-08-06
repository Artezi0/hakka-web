import Link from "next/link"
import { FaInstagram, FaTiktok, FaGoogle, FaWhatsapp } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className='footer'>
        <div className='footer_header'>
          <div className='footer_header-info'>
            <h2>KOTAK ⬤ BAJU</h2>
            <span>
              <Link href="#"><p className="footnote">Terms of condition</p></Link>
              <Link href="#"><p className="footnote">Privacy Policy</p></Link>
            </span>
          </div>
          <ul className='footer_header-list'>
            <li><Link className="mono3" href="/">Home</Link></li>
            <li><Link className="mono3" href="/sales">Product Sales</Link></li>
            <li><Link className="mono3" href="/blogs">Hakka Paper</Link></li>
            <li><Link className="mono3" href="/">Account</Link></li>
          </ul>
        </div>     
        <div className="footer_socials">
          <ul className="footer_socials-social">
            <li className='mono3'><Link href="mailto: hakkafitsid@gmail.com"><FaGoogle /></Link></li>
            <li className='mono3'><Link href="https://www.tiktok.com/@hakkafits"><FaTiktok /></Link></li>
            <li className='mono3'><Link href="https://www.instagram.com/hakka.fits/"><FaInstagram /></Link></li>
            <li className='mono3'><Link href="https://wa.me/6285643712032"><FaWhatsapp /></Link></li>
          </ul>
          <div className="footer_socials-watermark">
            <p className="footnote">2023 KotakBaju, Inc. All Rights Reserved</p>
            <p className="footnote">Website by <Link className="footnote" href="https://www.instagram.com/artezio_">Artezio</Link></p>
          </div>
        </div>
      </footer>
  )
}