import { UserAuth } from "@/context/AuthContext"
import { useState } from "react"
import { useRouter } from "next/router" 
import { FcGoogle } from "react-icons/fc"
import PhoneInput from "react-phone-number-input/input"
import Link from "next/link"

export default function Account() {    
  const router = useRouter()
  const { googleAuth, signUp, user } = UserAuth()
  const [ error, setError ] = useState() 
  const [ phone, setPhone ] = useState()
  const [ details, setDetails ] = useState({
    name : '',
    email : '',
    password : '',
    confirmPassword: '',
  })  

  function handleChange(e) {
    const {name, value} = e.target
    setDetails((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  
  async function handleGoogle() {
    try {
      await googleAuth()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleSignUp() {
    if (details.password == details.confirmPassword) {
      try {
        await signUp(details.email, details.password, details.name, phone)
      } catch(err) {
        setError(err.message)
      }
    } else {
      setError("Password didn't match")
    }
  }

  if (user) router.push('/')

  return (
    <main className="signup">
      <div className="signup_container" onSubmit={(e) => e.preventDefault() & handleSignUp()}>
        <div className="signup_container-header">
          <svg width="100" height="103" viewBox="0 0 100 103" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M30.5713 62.9091C31.4283 73.9943 40.6949 82.7224 51.9999 82.7224C63.305 82.7224 72.5715 73.9943 73.4286 62.9091H66.4641C65.6311 70.159 59.473 75.7891 51.9999 75.7891C44.5269 75.7891 38.3688 70.159 37.5358 62.9091H30.5713Z" fill="black"/>
            <path d="M42.079 62.332C44.8686 62.332 46.8728 60.707 46.8728 57.3487V45.0799C46.8728 41.7757 48.6873 39.4737 51.9103 39.4737C55.079 39.4737 56.7311 41.532 56.7311 44.8632V57.3487C56.7311 60.707 58.7082 62.332 61.5248 62.332C64.3415 62.332 66.3186 60.707 66.3186 57.3487V42.7778C66.3186 35.8174 62.6623 31.6466 56.0811 31.6466C51.5853 31.6466 48.3623 33.8132 46.8457 37.7674H46.6561V26.907C46.6561 23.7924 44.9498 22.0049 41.9707 22.0049C38.9915 22.0049 37.2582 23.7924 37.2582 26.8799V57.3487C37.2582 60.707 39.2623 62.332 42.079 62.332Z" fill="black"/>
          </svg>
          <h2>Sign In</h2>
          <Link href='/account/signin'>Sudah Memiliki Akun?</Link>
        </div>
        <form className="signup_container-form">
          <div className="group">
            <input type="text" name="name" placeholder="Nama Pengguna" onChange={handleChange} required maxLength={100}/>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required/>
          </div>
          <div className="group2">
            <div className="telp-code">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17"><path fill="#fff" d="M0 0H20V17H0z"/><path fill="red" d="M0 0H900V300H0z"/>
                <path fillRule="evenodd" clipRule="evenodd" xmlns="http://www.w3.org/2000/svg" fill="#fff" d="M0 0H20V17H0z"/>
                <path fillRule="evenodd" clipRule="evenodd" xmlns="http://www.w3.org/2000/svg" fill="red" d="M0 0H20V9H0z"/>
              </svg>
              +62
            </div>
            <PhoneInput 
              country="ID"
              placeholder="No. Telepon"
              value={phone}
              onChange={setPhone}
            />
          </div>
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required maxLength={50}/>
          <input type="text" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required maxLength={50}/>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn1">Daftar</button>
        </form>
        <div className="separator"></div>
        <div className="signup_container-others">
          <button type="button" className="btn4" onClick={handleGoogle}><FcGoogle/> Masuk Dengan Google</button>
        </div>
        <p className="footnote">Dengan mengklik Daftar di atas, Anda mengakui bahwa Anda telah membaca, memahami, serta menyetujui Syarat & Ketentuan dan Kebijakan Privasi Hakka.</p>
      </div>
    </main>
  )
}