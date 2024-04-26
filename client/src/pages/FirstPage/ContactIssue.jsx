import React, { useState } from "react";
import emailjs from "emailjs-com";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
export default function ContactIssue() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendContactForm = (e) => {
    e.preventDefault();

    const emailJsConfig = {
      service_id: process.env.REACT_APP_EMAIL_JS_SERVICE_ID,
      template_id: process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID,
      user_id: process.env.REACT_APP_EMAIL_JS_USER_ID,
    };

    const formTemplate = {
      from_name: name,
      from_email: email,
      message: message,
    };

    emailjs
      .send(
        emailJsConfig.service_id,
        emailJsConfig.template_id,
        formTemplate,
        emailJsConfig.user_id
      )
      .then(() => {
        setMessage("");
        alert("Contact form submitted");
        console.log("form submitted");
      })
      .catch((error) => {
        console.error("Email failed to send:", error);
      });
  };

  return (
    <div>
      <div className="flex w-full min-h-screen justify-center items-center">
        <div className="flex flex-col md:flex-row  md:space-x-6 space-y-6 md:space-y-0 bg-teal-400 bg-opacity-20 w-full max-w-4xl p-8 rounded-xl shadow-lg text-black sm:p-12">
          <div className="flex flex-col space-y-8 justify between">
            <div>
              <h1 className="font-bold text-4xl tracking-wide">Contact us</h1>
            </div>
            <div className="flex flex-col space-y-6">
              <div className="inline-flex space-x-2 items-center">
              <MdLocalPhone />

                <span>9947234893</span>
              </div>
              <div className="inline-flex space-x-2 items-center">
              <MdOutlineMailOutline />

                <span>akashjoju969@gmail.com</span>
              </div>
              <div className="inline-flex space-x-2 items-center">
              <FaLocationDot />

                <span>Thrissur</span>
              </div>
            </div>
            
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-gray-600 md:w-80">
            <form onSubmit={sendContactForm}>
              <div>
                <label htmlFor="name" className="text-sm">
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Message here"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>
              <button
                type="submit"
                className="inline-block self-end bg-blue-700 text-white font-bold rounded-lg px-6 py-2 uppercase text-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}