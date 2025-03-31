import React from "react";

export default function Services() {
  return (
    <>
      <Head>
        <title>Services</title>
      </Head>
      <div className="servicespage">
        <div className="topservices">
          <div className="container">
            <h2>Inkvision Services</h2>
            <p>
              Home <span>&gt;</span>Services
            </p>
          </div>
        </div>
        <div className="centerservices">
          <div className="container">
            <div className="servicebox">
              <div className="csservice">
                <span>01</span>
                <div>
                  <h2>Creative & Story Writing</h2>
                  <p>🧠</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
