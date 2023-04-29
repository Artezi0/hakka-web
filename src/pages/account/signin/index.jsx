import { UserAuth } from "@/context/AuthContext"
import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"

export default function SignIn() {    
  const router = useRouter()
  const { signIn, googleAuth, user, resetPass } = UserAuth()
  const [ error, setError ] = useState() 
  const [ details, setDetails ] = useState({
    email : '',
    password : '',
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
      router.push('/')
    } catch(err) {
      console.log(err.message)
    }
  }

  async function handleSignIn() {
    try {
      await signIn(details.email, details.password)
      router.push('/')
    } catch(err) {
      setError(err.message)
    }
  } 

  async function reset() {
    if (details.email != "") {
      try {
        await resetPass(details.email)
      } catch (err) {
        setError(err.message)
      }
    }
    else {
      setError('Isi Alamat Email Terlebih Dahulu!')
    }
  }
  
  if (user) router.push('/')

  return (
    <main className="signin">
      <div className="signin_container">
        <div className="signin_container-header">
          <svg width="100" height="103" viewBox="0 0 100 103" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M30.5713 62.9091C31.4283 73.9943 40.6949 82.7224 51.9999 82.7224C63.305 82.7224 72.5715 73.9943 73.4286 62.9091H66.4641C65.6311 70.159 59.473 75.7891 51.9999 75.7891C44.5269 75.7891 38.3688 70.159 37.5358 62.9091H30.5713Z" fill="black"/>
            <path d="M42.079 62.332C44.8686 62.332 46.8728 60.707 46.8728 57.3487V45.0799C46.8728 41.7757 48.6873 39.4737 51.9103 39.4737C55.079 39.4737 56.7311 41.532 56.7311 44.8632V57.3487C56.7311 60.707 58.7082 62.332 61.5248 62.332C64.3415 62.332 66.3186 60.707 66.3186 57.3487V42.7778C66.3186 35.8174 62.6623 31.6466 56.0811 31.6466C51.5853 31.6466 48.3623 33.8132 46.8457 37.7674H46.6561V26.907C46.6561 23.7924 44.9498 22.0049 41.9707 22.0049C38.9915 22.0049 37.2582 23.7924 37.2582 26.8799V57.3487C37.2582 60.707 39.2623 62.332 42.079 62.332Z" fill="black"/>
          </svg>
          <h2>Log In</h2>
          <Link href="/account/signup">Belum Memiliki Akun?</Link>
        </div>
        <form className="signin_container-form" onSubmit={(e) => e.preventDefault() & handleSignIn()}>
          <input type="email" name="email" placeholder="Alamat Email" onChange={handleChange} required/>
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required maxLength={50}/>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn1">Masuk</button>
          <button type="button" className="btn3" onClick={reset}>Lupa Password</button>
        </form>
        <div className="separator"></div>
        <div className="signin_container-others">
          <button type="button" className="btn4" onClick={handleGoogle}><FcGoogle/> Masuk Dengan Google</button>
        </div>
      </div>
    </main>
  )
}