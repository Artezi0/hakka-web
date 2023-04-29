import { UserAuth } from "@/context/AuthContext"
import { HiLockClosed, HiOutlineTrash } from "react-icons/hi"
import { MdAlternateEmail } from "react-icons/md"
import { useState, useRef, useEffect } from "react"
import { month, gender, city } from "../../components/data"
import Head from "next/head"
import Navbar from "../../components/Navbar"
import Module from "../../components/Module"
import Select from "react-select"
import PhoneInput from "react-phone-number-input/input"
import Banner from "../../components/Banner"
import Image from "next/legacy/image"

export default function Account() {    
  const { user, details, logout, avatarUpload, userDelete, editUser, resetPass } = UserAuth()
  const [ edit, isEdit ] = useState(false)
  const [ phone, setPhone ] = useState()
  const [ update, setUpdate ] = useState({
    name : details.name,
    gender : details.gender,
    birthDate: details.birthDate,
    photoURL : details.photoURL,
    phone : details.phone,
    email : details.email,
    adress: details.adress,
    city : details.city,   
  })

  const ref = useRef(null)
  
  function handleChange(e) {
    const {name, value} = e.target
    setUpdate((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          isEdit(false)
        }
      }
      document.addEventListener('mousedown', handleClick)
      return () => {
        document.removeEventListener('mousedown', handleClick)
      }
    }, [ref])
  }
  useOutsideAlerter(ref)

  async function handleUpload(file) {
    if (file.size <= 5000000) {
      try {
        await avatarUpload(file)
      } catch(err) {
        console.log(err.message)
      }
    }
  }  

  async function handleUserUpdate() {
    try {
      await editUser(update)
      isEdit(false)
    } catch(err) {
      console.log(err.message)
    }
  }

  function handleUserDelete() {
    let alert = confirm('Apakah anda yakin ingin menghapus user ini?')
    if (alert) {
      userDelete()      
    }
  }
  
  if (user) {    
    return (
      <>
        <Head>
          <title>HAKKA - Account</title>
          <meta name="description" content="HAKKA Drop soon on February 23th" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Navbar /> 
        <Banner trigger={user.emailVerified}>
          <p>Email verification link has been sent, please check your email</p>
        </Banner>
        <main className="account">
          <div className="account_details">
            <div className="account_details-avatar">
                <Image src={details.photoURL ? details.photoURL : 'https://firebasestorage.googleapis.com/v0/b/hakka-5f5e6.appspot.com/o/avatar%2F6555e9.png?alt=media&token=f1d05f0e-b7e6-4777-b711-b277c2fbd0ac'} 
                  alt="avatar" 
                  layout="fill"
                  objectFit="cover"
                  priority={true}
                />
            </div>
            <div className="account_details-information">
              <h4>{details.name}</h4>
              <div className="information_btn">
                <p className="edit-btn" onClick={() => isEdit(!edit)}>Edit Profil</p>
                <p className="logout-btn" onClick={() => logout()}>Keluar</p>
              </div>
            </div>
          </div>
          <div className="account_activities">
            <div className="account_activities-fav">
              <div className="fav_header">
                <h2 className="mono3">Favorit</h2>
              </div>
              <div className="fav_list">
              </div>
            </div>
            <div className="account_activities-order">
              <div className="order_header">
                <h2 className="mono3">Riwayat Pemesanan</h2>
              </div>
              <div className="order_list">
              </div>
            </div>
          </div>
          {details.name != undefined &&
          <Module trigger={edit}>
            <div className="edit" ref={ref}>
              <div className="information">
                <div className="information_avatar">
                  <div className="avatar">
                    <Image 
                      src={details.photoURL ? details.photoURL : 'https://firebasestorage.googleapis.com/v0/b/hakka-5f5e6.appspot.com/o/avatar%2F6555e9.png?alt=media&token=f1d05f0e-b7e6-4777-b711-b277c2fbd0ac'} 
                      alt="avatar"
                      layout="fill"
                      objectFit="cover"
                      placeholder="avatar"
                      blurDataURL={details.photoURL}
                    />
                  </div>
                  <label htmlFor="photo" className="btn1">Pilih Foto</label>
                  <input type="file" id="photo" accept="image/*" onChange={(e) => handleUpload(e.target.files[0])}/>
                  <p className="footnote">Besar file: 5 Megabytes. Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG</p>
                </div>
                <div className="information_change">
                  <button type="button" className="btn4" onClick={() => resetPass(user.email)}><HiLockClosed/>Ubah Password</button>
                  <button type="button" className="btn4"><MdAlternateEmail/>Ubah Email</button>
                  <p className="error" onClick={handleUserDelete}><HiOutlineTrash /> Hapus Akun</p>
                </div>
              </div>
              <div className="details">
                <div className="details_bio">
                  <h2 className="mono3">Ubah Biodata</h2>
                  <input type="text" name="name" placeholder={details.name} maxLength={100} onChange={handleChange}/>
                  <div className="details_bio-date">                    
                    <input type="number" name="day" placeholder={details.birthDate.day} maxLength={2} onChange={handleChange}/>
                    <Select options={month} defaultValue={month[details.birthDate.month]} name="month" className="react-select-container" classNamePrefix="react-select" placeholder="Bulan"/>
                    <input type="number" name="year" placeholder={details.birthDate.year} maxLength={4}/>
                  </div>
                  <Select options={gender} defaultValue={gender[details.gender]} name="gender" className="react-select-container" classNamePrefix="react-select" placeholder="Jenis Kelamin"/>
                </div>
                <div className="details_contact">
                  <h2 className="mono3">Ubah Kontak</h2>
                  <div className="telp">
                    <div className="telp_code">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17"><path fill="#fff" d="M0 0H20V17H0z"/><path fill="red" d="M0 0H900V300H0z"/>
                        <path fillRule="evenodd" clipRule="evenodd" xmlns="http://www.w3.org/2000/svg" fill="#fff" d="M0 0H20V17H0z"/>
                        <path fillRule="evenodd" clipRule="evenodd" xmlns="http://www.w3.org/2000/svg" fill="red" d="M0 0H20V9H0z"/>
                      </svg>
                      +62
                    </div>
                    <PhoneInput 
                      country="ID"
                      placeholder={details.phone}
                      value={phone}
                      onChange={setPhone}
                      />
                  </div>
                  <Select options={city} defaultValue={city[details.city]} name="city" className="react-select-container" classNamePrefix="react-select" placeholder="Kota" onChange={(e) => console.log(e.value)}/>
                  <textarea name="adress" placeholder={details.adress} spellCheck={false} maxLength={1000} onChange={handleChange}></textarea>
                </div>
                <div className="details_save">
                  <p className="footnote">Simpan Perubahan?</p>
                  <button type="button" className="btn1" onClick={handleUserUpdate}>Simpan</button>
                  <button type="button" className="btn2" onClick={() => isEdit(false)}>Batal</button>
                </div>
              </div>
            </div>
          </Module>
          }         
        </main>
      </>
    )
  }
}