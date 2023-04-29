import Link from "next/link"

export default function Payment() {
  return (
    <main className="payment">
      <div className="payment_header">
        <h2 className="mono2">Payment</h2>
        <small>Payment through the account listed below :<br /> 1246384387484 Cimb Niaga (Kafka Hammam Vadanta)</small>
        <small>You can see your order status on Order History. We will also notify you via Whatsapp if the packet has arrived</small>
      </div>
      <div className="payment_btn">
        <button type="button" className="btn1">Confirm</button>
        <Link href='/bag' className="btn3">Back to Information</Link>
      </div>
    </main>
  )
}