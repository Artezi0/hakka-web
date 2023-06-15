import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '@/context/firebase'
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Link from 'next/link';
import Image from 'next/legacy/image';
import CurrencyInput from 'react-currency-input-field';

export default function Account({ products }) {
  let date = new Date().getDate()

  return (
    <>
      <Navbar />
      <main className="sales">
        <div>
          {products.map(({ uid, name, image, price, description, link, dateAdded}) => {
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
                  {dateAdded - date < 6 && 
                    <small className='tag'>New Arrival</small>
                  }
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
