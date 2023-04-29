import React from "react"

export default function Banner(props) {
  return (!props.trigger) ? (
    <section className="banner">
      {props.children}
    </section>
  ) : ""
}