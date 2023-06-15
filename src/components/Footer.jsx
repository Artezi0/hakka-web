export default function Footer() {
  return (
    <footer className='footer'>
        <div className='footer_desc'>
          <div className='footer_desc-header'>
            <h1>HAKKA</h1>
          </div>
          <div className='footer_desc-body'>
            <ul className='subheading'>
              <li><a href="#"><small>Terms of condition</small></a></li>
              <li><a href="#"><small>Privacy Policy</small></a></li>
            </ul>
            <p>Hakka is a brand that provides mix and match clothing sets.</p>
            <small>2023 HAKKA, Inc. All Rights Reserved</small>
          </div>
        </div>  
        <div className='footer_list'>
          <ul className='footer_list-links'>
            <p className='mono3'>Reach us</p>
            <li className='mono3'><a href="https://www.tiktok.com/@hakkafits">Tiktok</a></li>
            <li className='mono3'><a href="https://www.instagram.com/hakka.fits/">Instagram</a></li>
            <li className='mono3'><a href="https://wa.me/6285643712032">Whatsapp</a></li>
            <li className='mono3'><a href="mailto: hakkafitsid@gmail.com">Email</a></li>
          </ul>
        </div>
      </footer>
  )
}