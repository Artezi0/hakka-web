import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/legacy/image';
import CurrencyInput from 'react-currency-input-field';
import { db } from '@/context/firebase'
import { onSnapshot, collection } from 'firebase/firestore'
import Head from 'next/head';
import { useState } from 'react';

const Navbar = dynamic(() => import("@/components/Navbar"))
const Footer = dynamic(() => import("@/components/Footer"))
export default function Account({ products }) {
  const [ search, setSearch ] = useState('')
  let sortedProducts = products.filter((product) => product.name.toLowerCase().replace(/\s/g, '').includes(search.toLowerCase().replace(/\s/g, '')))  
  let date = new Date().getDate()
  
  return (
    <>
      <Head>
        <title>HAKKA - SALES</title>
        <meta name="description" content="Kits with fresh-mixed outfit. HAKKA Drop soon on February 23th" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main className="sales">
        <div className='header'>
          <h2 className='mono3'>Sales</h2>
        </div>
        <div className='sales_search'>
          <input type="text" className='searchbar mono1' placeholder='Search Article' onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className='sales_rows'>
          {sortedProducts.map(({ uid, name, image, price, description, link, dateAdded}) => {
            return (
              <Link className='productCard' key={uid} href={link}> 
                  <div className='productCard_img'>
                    <Image
                      src={image} 
                      alt="product"
                      layout='fill'
                      quality={50}
                      objectFit='cover'
                      placeholder='blur'
                      blurDataURL={image}
                    />
                  </div>
                  <div className='productCard_info'>
                    {dateAdded - date < 6 && <small className='tag'>New Arrival</small>}
                    <p>{name}</p>
                    <p className='footnote'>{description}</p>
                    <CurrencyInput className='price'
                      prefix="Rp" 
                      value={price} 
                      decimalSeparator="," 
                      groupSeparator="."   
                      disabled
                    />
                  </div>
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
  let products = []

  onSnapshot(collection(db, 'product'), (query) => {
    query.forEach(function(product) {
      products.push(product.data())
    })
  })

  await delay(1500)
  return { props: { products } }
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}  
