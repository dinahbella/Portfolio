import Head from "next/head";
import React, { useState } from "react";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GrLinkedin } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios";

export default function Contact() {
  const [name, setName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [project, setProject] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [messageOk, setMessageok] = useState("");

  async function creatContact(ev) {
    ev.preventDefault();

    setMessageok("Sending....");
    const data = {
      name,
      lname,
      email,
      company,
      phone,
      country,
      project,
      price,
      description,
    };

    try {
      await axios.post("api/contact", data);
      setMessageok("message sent successfully");
    } catch (error) {}
  }

  return (
    <div>
      <Head>
        <title>Contact Us</title>
      </Head>
      <div className="contactPage">
        <div className="container">
          <div className="leftcontainer">
            <h2>Get in touch</h2>
            <h2> Let's talk about your project </h2>
            <p>
              Thinking about a new project, a problem to solve, or just want to
              connect? Let's do it!{" "}
            </p>
            <p>Use the form on this page to get in touch </p>
            <p>
              We love questions and feedback - and we are always happy to help
            </p>
          </div>
          <div className="leftsocial">
            <li>
              {" "}
              <FaPhone />{" "}
              <span>
                Phone:{" "}
                <a href="tel:+24456789" target="_blank">
                  0702345676
                </a>
              </span>
            </li>
            <li>
              {" "}
              <MdEmail />{" "}
              <span>
                Email:{" "}
                <a href="mailto:inkvision@gmail.com" target="_blank">
                  inkvision@gmail.com
                </a>
              </span>
            </li>
            <li>
              {" "}
              <GrLinkedin />{" "}
              <span>
                Linkedin:{" "}
                <a href="tel:+24456789" target="_blank">
                  inkvision
                </a>
              </span>
            </li>
            <li>
              {" "}
              <FaXTwitter />{" "}
              <span>
                Twitter:{" "}
                <a href="tel:+24456789" target="_blank">
                  0702345676
                </a>
              </span>
            </li>
          </div>
          <div className="rightcontainer"></div>
        </div>
      </div>
    </div>
  );
}
