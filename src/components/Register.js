import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { env } from '../config';
import "./mix.css";

const Register = () => {

    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);

    const [inputval, setInputval] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
    })

    const setVal = (e) => {
        ////  console.log(e.target.value)
        const { name, value } = e.target;
        setInputval(() => {
            return { ...inputval, [name]: value }
        })
    };

    // console.log(inputval);
    const addUserData = async (e) => {
        e.preventDefault();

        const { fname, email, password, cpassword } = inputval;

        if (fname === "") {
            toast.warning("Please enter Your Name", {
                position: "top-center"
            });
        } else if (email === "") {
            toast.error("Please enter Your Email", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            toast.warning("Enter Valid Email", {
                position: "top-center"
            });
        } else if (password === "") {
            toast.error("Enter your Password", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("Password Must be 6 Characters", {
                position: "top-center"
            });
        } else if (cpassword === "") {
            toast.error("Enter Your Confirm Password", {
                position: "top-center"
            });
        } else if (cpassword.length < 6) {
            toast.error("Confirm Password Must be 6 Characters", {
                position: "top-center"
            });
        } else if (password !== cpassword) {
            toast.error("Password and Confirm Password not match", {
                position: "top-center"
            });
        } else {
            // console.log("User Registration Successfully")

            const data = await fetch("https://password-reset-server-maharanij.vercel.app/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fname, email, password, cpassword })
            });

            const res = await data.json();

            // console.log(res);

            if (res.status === 201) {
                toast.success("Registration Successfully Done 🙂!", {
                    position: "top-center"
                });
                setInputval({ ...inputval, fname: "", email: "", password: "", cpassword: "" })
            }
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <input
                                type="text"
                                onChange={setVal}
                                value={inputval.fname}
                                name="fname"
                                id="fname"
                                placeholder="Enter Your Name"
                            />
                        </div>

                        <div className="form_input">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                onChange={setVal}
                                value={inputval.email}
                                name="email"
                                id="email"
                                placeholder="Enter Your Email Address"
                            />
                        </div>

                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input
                                    type={!passShow ? "password" : "text"}
                                    onChange={setVal}
                                    value={inputval.password}
                                    name="password"
                                    id="password"
                                    placeholder="Enter Your Password"
                                />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                                <input
                                    type={!cpassShow ? "password" : "text"}
                                    onChange={setVal}
                                    value={inputval.cpassword}
                                    name="cpassword"
                                    id="cpassword"
                                    placeholder="Enter Your Confirm Password"
                                />
                                <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
                                    {!cpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className="btn" onClick={addUserData}>Sign Up</button>
                        <p>Already have an Account? <Link to="/">Login</Link></p>

                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default Register