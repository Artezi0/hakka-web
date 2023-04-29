import Head from 'next/head'
import Navbar from '../components/Navbar'
import Image from 'next/legacy/image'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '@/context/firebase'
import Link from 'next/link'

export default function Home({ blogs, campaigns }) {
  let featured = blogs.filter((blog) => { return blog.isFeatured == true })

  return (
    <>
      <Head>
        <title>HAKKA - Kits With Fresh-Mixed Outfit</title>
        <meta name="description" content="Kits with fresh-mixed outfit. HAKKA Drop soon on February 23th" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar/>
      <main className='home'>
        <ul className='home_campaign'>
          {campaigns.map(({ uid, image, url }) => {
            return (
              <li className='home_campaign-container' key={uid}>
                <Link href={url ? url : ''} target='_blank'></Link>
                <Image 
                  src={image} 
                  alt='campaign'
                  layout='fill'
                  objectFit='contain'
                  priority={true}
                />
              </li>
            )
          })}
        </ul>
        <section className='home_blog'>
          <div className='header'>
            <h2 className='mono3'>Hakka Paper</h2>
          </div>
          <div className='slider'>
            {featured.slice(0, 4).map(({ uid, title, dateCreated, thumbnail }) => {
              return (
                <Link className='blog' 
                  key={uid} 
                  href={'/blog/' + uid}
                > 
                  <div className='blog_img'>
                    <Image 
                      src={thumbnail} 
                      alt="thumbnail"
                      layout='fill'
                      objectFit='cover'
                      placeholder='blur'
                      blurDataURL={thumbnail}
                    />
                  </div>
                  <p>{dateCreated}</p>
                  <h5 className='blog_title'>{title}</h5>
                </Link>
              )
            })}
          </div>
        </section>
        <section className='home_featured'>
          <div className='header'>
            <h2 className='mono3'>Featured</h2>
          </div>
        </section>
        <section className='home_new'>
          <div className='header'>
            <h2 className='mono3'>New Arrival</h2>
          </div>
          <div className='card1'></div>
        </section>
      </main>
    </>
  )
}

export async function getStaticProps() {
  let blogs = []
  let campaigns = []

  onSnapshot(collection(db, 'campaign'), (query) => {
    query.forEach(function(campaign) {
      campaigns.push(campaign.data())
    })
  })
 
  onSnapshot(collection(db, 'blog'), (query) => {
    query.forEach(function(blog) {
      blogs.push(blog.data())
    })
  })

  await delay(1500)
  return { props: { blogs, campaigns } }
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}  
