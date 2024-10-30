import React, { useEffect, useState } from 'react'
import './SingleMovie.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { FaStar } from "react-icons/fa";

function SingleMovie() {
    let pos = useParams()
    const [movie, setmovie] = useState({})
    const [dates, setdates] = useState()
    const [checks, setchecks] = useState([])
    const [languagecheck, setlanguagecheck] = useState([])
    // console.log(pos);
    useEffect(() => {
        singlemovie()
    }, [setmovie])
    let singlemovie = () => {
        axios.get("http://localhost:3000/user/" + pos.id)
            .then((res) => {
                // console.log(res.data);
                setmovie(res.data)
                let movietype = res.data.types
                setchecks(movietype)
                let movielanguage = res.data.languages
                setlanguagecheck(movielanguage)
                let d = new Date(movie.date)
                const month = d.toLocaleString('default', { month: 'long' });
                setdates(month)
            })
    }
    // console.log(movie.types[1]);
    // console.log(checks[0]);
    // console.log(languagecheck[0]);
    // console.log(dates);
    return (
        <>
            <section>
                <div className="container">
                    <div className='bg-movie'>
                        <div className='about'>
                            <div className='top-img'>
                                <div className='main-img' style={{ textAlign: "right" }}>
                                    <img src={movie.image} alt="" style={{ height: "400px", objectFit: "cover" }} />
                                    {/* <h1>{movie.name}</h1> */}
                                </div>
                            </div>
                            <div className='right-detail'>
                                <div>
                                    <h1 style={{ fontSize: "40px" }}>{movie.name}</h1>
                                    <div className='rate'>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <FaStar className='star' />
                                            {movie.rating}/10
                                            <div style={{ marginLeft: "10px" }}>
                                                (58.6K Votes)
                                            </div>
                                        </div>
                                        <button className='rate-btn'>Rate Now</button>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", color: "black", padding: "5px" }}>
                                        <div style={{ backgroundColor: "white", padding: "5px 10px" }}>
                                            <h4>2D</h4>
                                        </div>
                                        <div style={{ display: "flex", marginLeft: "10px", padding: "5px 10px", borderRadius: "5px", gap: "10px", backgroundColor: "white", }}>
                                            {languagecheck[0] &&
                                                <h4>{languagecheck[0]}</h4>
                                            }
                                            {languagecheck[1] &&
                                                <h4>/{languagecheck[1]}</h4>
                                            }
                                            {languagecheck[2] &&
                                                <h4>/{languagecheck[2]}</h4>
                                            }
                                            {languagecheck[3] &&
                                                <h4>/{checks[3]}</h4>
                                            }
                                            {languagecheck[4] &&
                                                <h4>/{languagecheck[4]}</h4>
                                            }

                                        </div>
                                    </div>
                                    <div className='timing'>
                                        <h3>1h 53min </h3>
                                        <div style={{ display: "flex" }}>
                                            {checks[0] &&
                                                <h3>{checks[0]}</h3>
                                            }
                                            {checks[1] &&
                                                <h3>/{checks[1]}</h3>
                                            }
                                            {checks[2] &&
                                                <h3>/{checks[2]}</h3>
                                            }
                                            {checks[3] &&
                                                <h3>/{checks[3]}</h3>
                                            }
                                            {checks[4] &&
                                                <h3>/{checks[4]}</h3>
                                            }
                                        </div>
                                        <h3>{movie.date},{dates}</h3>
                                    </div>
                                    <Link to={'/bookpage/'+movie.id}>
                                        <button className='book-btn'>Book Tickets</button>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <div className="container" >
                <div style={{ padding: "20px 0px" }} className='about-sec'>
                    <h1>About This Movie</h1>
                    <p style={{ marginTop: "15px" }}>{movie.aboutmovie}</p>
                </div>

            </div>

        </>
    )
}

export default SingleMovie