import Head from 'next/head'
import Navbar from '../components/Navbar'
import Image from 'next/legacy/image'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '@/context/firebase'
import Link from 'next/link'
import Footer from '@/components/Footer'
import CurrencyInput from 'react-currency-input-field';

export default function Home({ blogs, campaigns, products }) {
  let featured = blogs.filter((blog) => { return blog.isFeatured == true })
  let newArrival = products.filter((product) => {
    let date = new Date().getDate()
    return product.dateAdded - date < 6
  })

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
                  placeholder='blur'
                  blurDataURL={image}
                />
              </li>
            )
          })}
        </ul>
        {featured.length > 0 && 
          <section className='home_blog'>
            <div className='header'>
              <h2 className='mono3'>Hakka Paper</h2>
            </div>
            <div className='container'>
              {featured.slice(0, 4).map(({ uid, title, dateCreated, thumbnail }) => {
                return (
                  <Link className='container_blog' key={uid} href={'/blog/' + uid}> 
                    <div className='container_blog-img'>
                      <Image
                        src={thumbnail} 
                        alt="thumbnail"
                        layout='fill'
                        objectFit='cover'
                        placeholder='blur'
                        blurDataURL={thumbnail}
                      />
                    </div>
                    <small className='container_blog-date'>{dateCreated}</small>
                    <h5 className='container_blog-title'>{title}</h5>
                  </Link>
                )
              })}
            </div>
          </section>
        }
        {products.length > 0 &&
          <section className='home_products'>
            <div className='header'>
              <h2 className='mono3'>New Arrival</h2>
            </div>
            <div className='container'>
              {newArrival.slice(0, 16).map(({ uid, name, image, price, description, link}) => {
                return (
                  <Link className='productCard' key={uid} href={link}> 
                      <div className='productCard_img'>
                        <Image
                          src={image} 
                          alt="product"
                          layout='fill'
                          objectFit='cover'
                          placeholder='blur'
                          blurDataURL={image}
                        />
                      </div>
                      <small className='tag'>New Arrival</small>
                      <h6>{name}</h6>
                      <small className='footnote'>{description}</small>
                      <CurrencyInput className='price'
                        prefix="Rp" 
                        value={price} 
                        decimalSeparator="," 
                        groupSeparator="."   
                        disabled
                      />
                    </Link>
                  )
              })}
            </div>
          </section>
        } 
      </main>
      <Footer />
      </>
  )
}

export async function getStaticProps() {
  let blogs = []
  let campaigns = []
  let products = []

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

  onSnapshot(collection(db, 'product'), (query) => {
    query.forEach(function(product) {
      products.push(product.data())
    })
  })

  await delay(1500)
  return { props: { blogs, campaigns, products } }
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}  
