import { onSnapshot, doc, collection } from "firebase/firestore"
import { db } from "@/context/firebase"
import Navbar from "../../components/Navbar"
import Head from "next/head"
import Image from "next/legacy/image"

export default function Blog({ blog }) {
  return (
    <>
      <Head>
        <title>HAKKA - {blog.title}</title>
        <meta name="description" content="Kits with fresh-mixed outfit. HAKKA Drop soon on February 23th" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main>
        <div>
          <Image src={blog.thumbnail} alt="thumbnail" width={100} height={100} />
          <h1>{blog.title}</h1>
          <h1>{blog.author}</h1>
          <h1>{blog.dateCreated}</h1>
        </div>
      </main>
    </>
  )
}

export async function getStaticPaths() {
  let data = []
  onSnapshot(collection(db, 'blog'), (query) => {
    query.forEach(function(blog) {
      data.push(blog.data())
    })
  })
  
  await delay(1500)
  const paths = data.map((blog) => {
    return {
      params: { uid : blog.uid }
    }
  })
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  const uid = context.params.uid
  let blog = []

  onSnapshot(doc(db, 'blog', uid), (query) => {
    blog = query.data()
  })  

  await delay(1500)
  return {
    props: {
      blog
    }
  }
}

function delay(time) { return new Promise(resolve => setTimeout(resolve, time)) }