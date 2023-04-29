import React from "react"

export default function Module(props) {
  return (props.trigger) ? (
    <section className="module">
      <div className="module_container">
        {props.children}
      </div>
    </section>
  ) : ""
}