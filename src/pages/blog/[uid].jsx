import { onSnapshot, doc, collection } from "firebase/firestore"
import { db } from "@/context/firebase"
import Navbar from "../../components/Navbar"
import Head from "next/head"
import Image from "next/legacy/image"
import Footer from "@/components/Footer"
import Link from "next/link"
import { Carousel } from '@mantine/carousel';

export default function Blog({ blog, blogs }) {  
  return (
    <>
      <Head>
        <title>HAKKA - {blog.title}</title>
        <meta name="description" content="Kits with fresh-mixed outfit. HAKKA Drop soon on February 23th" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main className="blog">
        <section className="blog_header">
          <div className="blog_header-info">
            <Link href="/" className="link mono3">&#8592; Go Back</Link>
            <span>
              <p className="mono3">{blog.dateCreated}</p>
              <p className="mono3">Article by {blog.author}</p>
            </span>
          </div>
          <h3>{blog.title}</h3>
        </section>
        <div className="blog_thumbnail">
          <Image 
            src={blog.thumbnail} 
            alt="thumbnail" 
            layout="fill"
            objectFit="cover"
            placeholder='blur'
            blurDataURL={blog.thumbnail}
          />
         </div>
        <section className="blog_body" dangerouslySetInnerHTML={{__html: blog.content}} id="body"></section>
        <section className="blog_others">
          <div className='header'>
            <h2 className='mono3'>Other Article</h2>
          </div>
          <Carousel
            className="container" 
            slideGap={20}
            slideSize={1} 
            withIndicators={false}
            withControls={false} 
            align="start" 
          >
          {blogs.map(({ uid, title, dateCreated, thumbnail }) => {
            return (
              <Carousel.Slide key={uid}>
                <Link className='container_blog' href={'/blog/' + uid}> 
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
              </Carousel.Slide>
            )
          })}
          </Carousel>
        </section>
      </main>
      <Footer />
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
  let blogs = []
   
  onSnapshot(collection(db, 'blog'), (query) => {
    query.forEach(function(blog) {
      blogs.push(blog.data())
    })
  })

  onSnapshot(doc(db, 'blog', uid), (query) => {
    blog = query.data()
  })  

  await delay(1500)
  return {
    props: {
      blog,
      blogs
    }
  }
}

function delay(time) { return new Promise(resolve => setTimeout(resolve, time)) }