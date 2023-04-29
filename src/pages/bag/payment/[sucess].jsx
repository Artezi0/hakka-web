import Navbar from "@/components/Navbar"

export default function Sucess() {
  return (
    <>
      <Navbar />
      <main className="sucess">
        <div className="sucess_content">
          <h1>Thank You For Your Order!</h1>
          <p>You can check your order status here. We will also notify you if your order have arrived.</p>
          <button type="button" className="btn1">Back to Shop</button>
        </div>
      </main>
    </>
  )
}