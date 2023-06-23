import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '@/context/firebase'
import { useState } from 'react'

export default function Blogs({ blogs }) {
  const [ search, setSearch ] = useState("")
  let sortedBlogs = blogs.filter((blog) => blog.title.toLowerCase().replace(/\s/g, '').includes(search.toLowerCase().replace(/\s/g, '')))
  
  return (
    <>
      <Head>
        <title>HAKKA - Hakka Paper</title>
        <meta name="description" content="Kits with fresh-mixed outfit. HAKKA Drop soon on February 23th" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main className='blogs'>
        <div className='header'>
          <h2 className='mono3'>Hakka Paper</h2>
        </div>
        <div className='blogs_search'>
          <input type="text" className='searchbar mono1' placeholder='Search Article' onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className='blogs_rows'>
          {sortedBlogs.map(({ uid, title, dateCreated, thumbnail }) => {
            return (
              <Link className='blogCard' key={uid} href={'/blogs/blog/' + uid}> 
                <div className='blogCard_img'>
                  <Image
                    src={thumbnail} 
                    alt="thumbnail"
                    layout='fill'
                    objectFit='cover'
                    placeholder='blur'
                    blurDataURL={thumbnail}
                    />
                </div>
                <small className='blogCard_date'>{dateCreated}</small>
                <h6 className='blogCard_title'>{title}</h6>
              </Link>
            )
          })}
        </div>
      </main>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  let blogs = []
 
  onSnapshot(collection(db, 'blog'), (query) => {
    query.forEach(function(blog) {
      blogs.push(blog.data())
    })
  })

  await delay(1500)
  return { props: { blogs }}
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}  


