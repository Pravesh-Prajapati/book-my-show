import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Booking.css'

function Bookings() {
    let [data, setdata] = useState([])
    useEffect(() => {
        let getmovie = JSON.parse(localStorage.getItem(""))
    }, [])

    useEffect(() => {
        axios.get("http://localhost:3000/booking")
            .then((res) => {
                // console.log(res.data);
                setdata(res.data)
            })
    }, [])

    return (
        <>
            <div>
                <div className="table-container">
                    Your History
                    <div style={{ marginTop: "10px" }}>
                        {/* {data.map((val) => {
                            console.log(val);
                            return (
                                <>
                                    {val.movieName &&
                                        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                                            <h1 style={{ margin: "10px 0px" }}>{val.movieName}</h1>
                                            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                                <h5>{val.date}</h5>
                                                <h3 style={{ color: "orange" }}>{val.movietime}</h3>
                                            </div>
                                            <h5> YOUR seat no.{val.seats}</h5>
                                        </div>
                                    }
                                </>
                            )
                        })
                        } */}
                        <table border={1}>
                            <thead>
                                <tr>
                                    <th>Movie Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Seat</th>
                                    <th>Theater Name</th>
                                </tr>
                            </thead>
                            {data.map((val) => {
                                return (
                                    <>
                                        {/* <tr style={{ alignItems: "center" }}>
                                            <td>{val.movieName}</td>
                                            <td>{val.date}</td>
                                            <td>{val.movietime}</td>
                                        </tr> */}
                                        <tr>
                                            <td>
                                                <span class="movie-name">{val.movieName}</span>
                                                {/* <span class="theater">INOX, Mumbai</span> */}
                                            </td>
                                            <td class="date-column">
                                                <span class="date">{val.date}</span>
                                                {/* <span class="time">4:30 PM</span> */}
                                            </td>
                                            <td>
                                                <span class="seats">{val.movietime}</span>
                                            </td>
                                            <td>
                                                <span class="seats">{val.seats}</span>
                                            </td>
                                            <td>
                                                <span class="amount">{val.theaterName}</span>
                                            </td>
                                            {/* <td>
                                                <span class="status status-cancelled">{val.theaterName}</span>
                                            </td> */}
                                        </tr>


                                    </>
                                )
                            })

                            }
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Bookings