import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Movie.css'
import axios from 'axios'
import Slider from '../slider/Slider'


function Movies() {
    const [movielist, setmovielist] = useState([])
    useEffect(() => {
        setTimeout(() => {
            showmovie()
        })
    }, [])
    let showmovie = () => {
        axios.get("http://localhost:3000/user")
            .then((res) => {
                // console.log(res.data);
                console.log(res.data);
                setmovielist(res.data)
            })
    }
    return (
        <>
        <Slider/>
            <div className="container">
                <Link to={'/addmovie'}>Add Movie</Link>
                <div>
                    <h1>Recommended Movie</h1>
                    <div className='all-movie'>
                        {movielist.map((val, i) => {
                            // console.log(val.image);
                            return (
                                <Link to={'/singlemovie/' + val.id} className='movie-list'>
                                    <div>
                                        <div className='images'>
                                            {/* <img src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-Ni43LzEwICA5LjJLIFZvdGVz,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00403265-dxgtjzxhsq-portrait.jpg" alt="" className='img' /> */}
                                            <img src={val.image} alt="" className='img' />
                                        </div>
                                        <div style={{ padding: "5px 20px" }}>
                                            <div style={{ backgroundColor: "blue", width: "35px", color: "white", borderRadius: "5px", textAlign: "center", padding: "3px" }}>
                                                <h5>{val.rating}&#x2605;</h5>
                                            </div>
                                            <h3 style={{ fontWeight: "600", marginTop: "5px", color: "black" }}>{val.name}</h3>
                                            <div style={{ display: "flex" }}>
                                                {val.types[0] &&
                                                    <h3 style={{ marginTop: "5px", fontWeight: "300", fontSize: "17px", color: "black" }}>{val.types[0]}</h3>
                                                }
                                                {val.types[1] &&
                                                    <h3 style={{ marginTop: "5px", fontWeight: "300", fontSize: "17px", color: "black" }}>/{val.types[1]}</h3>
                                                }
                                                {val.types[2] &&
                                                    <h3 style={{ marginTop: "5px", fontWeight: "300", fontSize: "17px", color: "black" }}>/{val.types[2]}</h3>
                                                }
                                                {val.types[3] &&
                                                    <h3 style={{ marginTop: "5px", fontWeight: "300", fontSize: "17px", color: "black" }}>/{val.types[3]}</h3>
                                                }
                                                {val.types[4] &&
                                                    <h3 style={{ marginTop: "5px", fontWeight: "300", fontSize: "17px", color: "black" }}>/{val.types[4]}</h3>
                                                }
                                            </div>
                                        </div>
                                        {/* <img src={val.image} alt="" /> */}
                                    </div>
                                </Link>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Movies