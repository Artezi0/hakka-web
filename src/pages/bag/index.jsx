import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Select from "react-select";
import Head from "next/head";

export default function Bag() {
  const [ error, setError ] = useState(false)
  const [ errorMsg, setErrorMsg ] = useState('')
  const [ adress, setAdress ] = useState('')
  const [ details, setDetails ] = useState('')
  const [ city, setCity ] = useState('')
  const [ zip, setZip ] = useState('')
  const [ province, setProvince ] = useState(undefined)
  const [ telp, setTelp ] = useState('')
  const router = useRouter()
  const options = [
    { value: 0, label: "DKI Jakarta" },
    { value: 1, label: "DIY Yogyakarta" },
    { value: 3, label: "Semarang" },
    { value: 4, label: "Bandung" }
  ]
    
  function onSubmit() {
    if (adress.length == 0 || details.length == 0 || city.length == 0 || zip.length == 0 || telp.length == 0 || province == undefined) {
      setError(true)
      setErrorMsg('All Field Required')
    } 
    else {
      if (/^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/.test(telp) && /^([1-9])[0-9]{4}$/.test(zip)) {
        setError(false)
        router.push('bag/payment')
      } 
      else {
        setError(true)
        setErrorMsg('Invalid ZIP or Telephone Code')
      }
    }
  }

  return (
    <>
      <Head>
        <title>HAKKA - Shopping Bag</title>
        <meta name="description" content="HAKKA Drop soon on February 23th" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main className="bag">
        <div className="bag_list">
          <div className="bag_list-header">
            <h2 className="mono2">Shopping bag</h2>
          </div>
          <ul className="bag_list-product">
          </ul>
          <div className="bag_list-total">
            <h6>Total : Rp 3,945,000</h6>
            <small>Price does not include shipping</small>
          </div>
        </div>
        <div className="bag_checkout">
          <div className="bag_checkout-header">
            <h2 className="mono2">Information</h2>
            <small>Recipient Address</small>
          </div>
          <div className="bag_checkout-input">
            <div className="adress">
              <input type="text" required maxLength={500} placeholder="Adress" onChange={e => setAdress(e.target.value)}/>
              <input type="text" required maxLength={1000} placeholder="Apartment, suite, etc (Optional)" onChange={e => setDetails(e.target.value)}/>
              <input type="text" required maxLength={100} placeholder="City" onChange={e => setCity(e.target.value)}/>
            </div>
            <div className="details">
              <input type="number" required placeholder="ZIP Code" onChange={e => setZip(e.target.value)}/>
              <Select placeholder="Province" options={options} className="react-select-container" classNamePrefix="react-select" onChange={e => setProvince(e.value)}/>
            </div>
            <div className="telp">
              <input type="number" required placeholder="Telephone" onChange={e => setTelp(e.target.value)}/>
            </div>
            {error && <p className="error">{errorMsg}</p>}
            <div className="checkout">
              <button type="button" className="btn1" onClick={onSubmit}>Proceed to Payment</button>
              <Link href="/sales" className="btn3">Back to Store</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}