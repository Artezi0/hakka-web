import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/legacy/image'
import { db } from '@/context/firebase'
import Navbar from '../components/Navbar'
import Footer from '@/components/Footer'
import CurrencyInput from 'react-currency-input-field'
import { onSnapshot, collection } from 'firebase/firestore'
import Slider from 'react-slick'

export default function Home({ blogs, campaigns, products }) {
  let featured = blogs.filter((blog) => { return blog.isFeatured == true })
  let newArrival = products.filter((product) => {
    let date = new Date().getDate()
    return product.dateAdded - date < 6
  })

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
    swipe: true,
    swipeToSlide: true,
  };

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
        {featured.length > 0 && 
          <section className='home_blog'>
            <div className='header'>
              <h2 className='mono3'>Hakka Paper</h2>
            </div>
            <div className='container'>
              {featured.slice(0, 4).map(({ uid, title, dateCreated, thumbnail }) => {
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
                    <small className='blogCard_date footnote'>{dateCreated}</small>
                    <h6 className='blogCard_title'>{title}</h6>
                  </Link>
                )
              })}
            </div>
            <div className='home_blog-btn'>
              <Link href="/blogs" className="mono3">More Article &#8594;</Link>
            </div>
          </section>
        }
        {products.length > 0 &&
          <section className='home_products'>
            <div className='header'>
              <h2 className='mono3'>New Arrival</h2>
            </div>
            <div className='container'>
              <Slider {...settings} className='slider'>
                {newArrival.slice(0, 11).map(({ uid, name, image, price, description, link}) => {
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
                        <p>{name}</p>
                        <p className='footnote'>{description}</p>
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
              </Slider>
            </div>
            <div className='home_products-btn'>
              <Link href="/sales" className="mono3">See All Products &#8594;</Link>
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
