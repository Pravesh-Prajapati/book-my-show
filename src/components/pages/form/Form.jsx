import React, { useState } from 'react'
import './Form.css'
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Form() {
    let [data, setdata] = useState({})
    let [error, seterror] = useState({})
    let [hob, setHob] = useState([]);
    let [lang, setlang] = useState([]);
    let navigate = useNavigate()
    let [image, setimage] = useState(null)

    let validatedata = () => {
        let err = {}
        if (!data.name) {
            err.name = "Enter Movie"
        }
        if (!data.rating) {
            err.rating = "Enter rating"
        }
        else if (data.rating > 10) {
            err.rating = "Rating Should be less then 10"
        }
        if (!data.date) {
            err.date = "Enter date"
        }
        if (hob.length == 0) {
            err.type = "Select Movie Type"
        }
        if (lang.length == 0) {
            err.language = "Select Available Languages"
        }
        if (!data.aboutmovie) {
            err.aboutmovie = "Write Description About Movie"
        }
        return err;
    }
    let setinput = (e) => {
        let name = e.target.name
        let value = e.target.value
        setdata({ ...data, [name]: value })
        // -===============================img
        if (name == "image") {
            let file = e.target.files[0]
            let reader = new FileReader();

            reader.onload = () => {
                let image_render = reader.result;
                setimage(image_render)
            }
            if (file) {
                reader.readAsDataURL(file)
            }
            setdata({ ...data, [name]: value })
        }
        // =========================== movie types
        let hoData = [...hob];
        if (name == 'types') {
            if (e.target.checked) {
                hoData.push(value);
            }
            else {
                let index = hoData.findIndex((v, i) => v == value);
                hoData.splice(index, 1);
            }
            value = hoData;
            setHob(value);
        }
        // =========================language
        let language = [...lang]
        if (name == "languages") {
            if (e.target.checked) {
                language.push(value)
            }
            else {
                let index = language.findIndex((v, i) => v == value)
                language.splice(index, 1)
            }
            value = language
            setlang(value)
        }
        setdata({ ...data, [name]: value })
    }

    let submitdata = (e) => {
        e.preventDefault()
        let validation = validatedata()
        if (Object.keys(validation).length > 0) {
            seterror(validation)
            toast.error("Try Again")
        }
        else {
            data = { ...data, ['image']: image };
            console.log(data);
            seterror({})
            axios.post("http://localhost:3000/user", data)
                .then((res) => {
                    console.log(res.data);
                    toast.success("Movie Entered Successfully")
                    setTimeout(() => {
                        navigate("/")
                    }, 2000);
                })
            setdata({})
            setHob([]);
            setlang([])
        }

    }
    return (
        <>

            {/* ========================================= */}
            <div class="container1">
                <form action="" method='post' onSubmit={(e) => { submitdata(e) }}>
                    <Link to={"/"}>See Movies</Link>
                    <div class="row">
                        <div class="column">
                            <h3 class="title">Add Movie</h3>
                            <div class="input-box">
                                <span>Movie Name :</span>
                                <input type="text" placeholder="Enter Movie Name" name='name' onChange={(e) => { setinput(e) }} />
                                <p className='para'>{error.name}</p>
                            </div>
                            <div class="input-box">
                                <span>Rating</span>
                                <input type="text" placeholder="Enter Rating" name='rating' onChange={(e) => { setinput(e) }} />
                                <p className='para'>{error.rating}</p>
                            </div>
                            <div class="input-box">
                                <span>Release Date</span>
                                <input type="date" name='date' placeholder="Street - Locality" onChange={(e) => { setinput(e) }} />
                                <p className='para'>{error.date}</p>
                            </div>
                            <div>
                                <h3>Enter Movie Type</h3>
                                <div>
                                    <input type="checkbox" name="types" id="" value={"Crime"} checked={hob.includes('Crime') ? "checked" : ""} onChange={(e) => { setinput(e) }} />
                                    <span style={{ marginLeft: "10px" }}>Crime</span>
                                </div>
                                <div>
                                    <input type="checkbox" name="types" id="" value={"Mystery"} checked={hob.includes('Mystery') ? "checked" : ""} onChange={(e) => { setinput(e) }} />
                                    <span style={{ marginLeft: "10px" }}>Mystery</span>
                                </div>
                                <div>
                                    <input type="checkbox" name="types" id="" value={"Thriller"} checked={hob.includes('Thriller') ? "checked" : ""} onChange={(e) => { setinput(e) }} />
                                    <span style={{ marginLeft: "10px" }}>Thriller</span>
                                </div>
                                <div>
                                    <input type="checkbox" name="types" id="" value={"Drama"} checked={hob.includes('Drama') ? "checked" : ""} onChange={(e) => { setinput(e) }} />
                                    <span style={{ marginLeft: "10px" }}>Drama</span>
                                </div>
                                <div>
                                    <input type="checkbox" name="types" id="" value={"Horror"} checked={hob.includes('Horror') ? "checked" : ""} onChange={(e) => { setinput(e) }} />
                                    <span style={{ marginLeft: "10px" }}>Horror</span>
                                </div>
                                <p className='para'>{error.type}</p>
                            </div>
                            <div class="input-box">
                                <span>About Movie</span>
                                {/* <input type="date" name='date' placeholder="Street - Locality" /> */}
                                <textarea name="aboutmovie" id="" onChange={(e) => { setinput(e) }} style={{ minHeight: "100px", padding: '7px' }} ></textarea>
                                <p className='para'>{error.aboutmovie}</p>
                            </div>
                        </div>
                        <div class="column" style={{ padding: "20px" }}>
                            <div style={{ margin: "15px 0px" }}>
                                <h3 style={{ marginBottom: "5px" }}>Language</h3>
                                <div style={{ marginBottom: "10px" }}>
                                    <div>
                                        <input type="checkbox" name="languages" id="" value={"Hindi"} checked={lang.includes('Hindi') ? "checked" : ""} onChange={(e) => { setinput(e) }} />
                                        <span style={{ marginLeft: "10px" }}>Hindi</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="languages" id="" value={"English"} checked={lang.includes('English') ? "checked" : ""} onChange={(e) => { setinput(e) }} />
                                        <span style={{ marginLeft: "10px" }}>English</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="languages" id="" value={"Tamil"} checked={lang.includes('Tamil') ? "checked" : ""} onChange={(e) => { setinput(e) }} />
                                        <span style={{ marginLeft: "10px" }}>Tamil</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="languages" id="" value={"Gujarati"} checked={lang.includes('Gujarati') ? "checked" : ""} onChange={(e) => { setinput(e) }} />
                                        <span style={{ marginLeft: "10px" }}>Gujarati</span>
                                    </div>
                                    <p className='para'>{error.language}</p>
                                </div>
                            </div>
                            <div>
                                <div className='input-img'>
                                    <input type="file" name='image' onChange={(e) => { setinput(e) }} className='img-field' />
                                    {image &&
                                        <img src={image} alt="" srcset="" style={{ height: "240px", width: "100%", objectFit: "cover", margin: "10px", borderRadius: "20px" }} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn">Add Movie</button>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default Form