import React, { useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import EmailIcon from "@mui/icons-material/Email"
import Navbar from "../Navbar/Navbar"
import "./Contact.css"
import { Alert, Slide, Snackbar } from "@mui/material"
import Footer from "../Footer/Footer"
const Contact = () => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: ""
  });
    const form = useRef()

    const sendEmail = (e) => {
        e.preventDefault()
        console.log("mailing...")
        emailjs.sendForm("service_87g28as", "template_1wmvh2x", form.current, { publicKey: "_UKlZplOqzuSOSpFv" }).then(
            () => {
            console.log("SUCCESS!")
            setAlert({ open: true, message: "Message sent", severity:""})
          },
            (error) => {
                console.log("FAILED...", error.text)
            }
        )
    }
    return (
        <>
            <Navbar section="contact"/>
            <Slide direction="up" in={alert.open} mountOnEnter unmountOnExit>
            <Snackbar className="snackbar" open={alert.open} autoHideDuration={1000}  >
                <Alert
                    severity="success"
                    variant="filled"
                    onClose={() => {
                        window.location.href = "/"
                        setAlert({ open: false, message: "" })
                    }}
                    className="alert"
                    sx={{ width: "20rem" }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
            </Slide>
        <div className="contact">
                <div className="contact-left">
                    <h2>Let's Talk About the Future</h2>
                    <p>Write your thoughts and views to me. Let me know if we share same likes!</p>
                    <div className="contact-left-items">
                        <div className="contact-left-item">
                            <LocationOnIcon />
                            <p>Malappuram, Kerala</p>
                        </div>
                        <div className="contact-left-item">
                            <LocalPhoneIcon />
                            <p>+91 9745676150</p>
                        </div>
                        <div className="contact-left-item">
                            <EmailIcon />
                            <p>getniyashere@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className="contact-right">
                    <form ref={form} onSubmit={sendEmail}>
                        <label>Name</label>
                        <input type="text" name="user_name" />
                        <label>Email</label>
                        <input type="email" name="user_email" />
                        <label>Message</label>
                        <textarea name="message" className="contact-right-textarea" />
                        <input type="submit" value="Send" className="contact-send-btn" />
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Contact
