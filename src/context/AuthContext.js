import { createContext, useContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, 
         GoogleAuthProvider,
         signInWithEmailAndPassword, 
         signOut, 
         signInWithRedirect,
         sendPasswordResetEmail, 
         deleteUser, 
         onAuthStateChanged} from "firebase/auth"
import { auth, storage, db } from "./firebase"
import { sendEmailVerification } from "firebase/auth"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useRouter } from "next/router"
import { collection, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore"
import uuid from "react-uuid"

const UserContext = createContext()

export function AuthContextProvider({ children }) {
  const googleProvider = new GoogleAuthProvider()
  const router = useRouter()
  const [ user, setUser ] = useState()
  const [ details, setDetails ] = useState([])
  const [ campaign, setCampaign ] = useState([])
  const [ blog, setBlog ] = useState([])
  
  useEffect(() => {
    const authChange = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        onSnapshot(doc(db, 'users', currentUser.uid), (fields) => {
          setDetails(fields.data())
          }, (err) => {
            console.log(err)
          })
      } else {
        setUser(null)
      }
    })

    // Get campaign data
    onSnapshot(collection(db, 'campaign'), (query) => {
      let data = []
      query.forEach(function(campaign) {
        data.push(campaign.data())
      })
      setCampaign(data)
    })

    // Get blog data
    onSnapshot(collection(db, 'blog'), (query) => {
      let data = []
      query.forEach(function(blog) {
        data.push(blog.data())
      })
      setBlog(data)
    })

    return () => {
      authChange()
    }
  }, [])

  // SignUp mechanism
  async function signUp(email, password, name, phone) {
    return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      sendEmailVerification(userCredential.user)
      setDoc(doc(db, "users", userCredential.user.uid), {
        dateJoined : new Date().toLocaleDateString(),
        name : name,
        gender : 0,
        birthDate: {
          month : 0,
          day : 0,
          year : 2000, 
        },
        photoURL : '',
        phone : phone,
        email : email,
        adress: '',
        city : 0,
      })
    })
  }

  // SignIn mechanism 
  async function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Google SignIn
  async function googleAuth() {
    return signInWithRedirect(auth, googleProvider)
  }

  // Logout mechanism
  async function logout() {
    return signOut(auth)
    .then(() => {
      router.push('/account/signin')
    }) 
  }
  
  // User update
  async function editUser(updated) {
    return updateDoc(doc(db, "users", user.uid), {
      dateJoined : updated.dateJoined,
      name : updated.name,
      gender : updated.gender,
      birthDate: updated.birthDate,
      photoURL : updated.photoURL,
      phone : updated.phone,
      email : updated.email,
      adress: updated.adress,
      city : updated.city,
    })
  }

  // Password update
  async function resetPass(email) {
    return sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log('Email sent')
    })
    .catch((err) => {
      console.log(err.message)
    })
  }

  // Avatar upload
  async function avatarUpload(file) {    
    const parrentRef = ref(storage, "avatar")
    const imageRef = ref(parrentRef, uuid())

    return uploadBytes(imageRef, file)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            updateDoc(doc(db, "users", user.uid), {
              photoURL : url
            })
          })
      })
  }

  // Delete user
  async function userDelete() {
    return deleteUser(user)
      .then(() => {
        router.push('/account/signin')
      })
  }

  return (
    <UserContext.Provider value={{ 
      // User logics
      details,
      user,
      googleAuth,
      signUp,
      signIn,
      logout,
      // editUser, 
      // resetPass,
      // avatarUpload,
      // userDelete,

      // Database fetch
      campaign,
      blog,
    }}>{ children }</UserContext.Provider>
  )
}

export function UserAuth() {
  return useContext(UserContext)
}

