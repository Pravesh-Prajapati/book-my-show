import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { json, useNavigate, useParams } from 'react-router-dom'
import './Seats.css'
import { toast, ToastContainer } from 'react-toastify';

function Seats() {
  let pos = useParams()
  let navigate = useNavigate()
  let [movie, setmovie] = useState({})
  let [pricemodal, setpricemodal] = useState(false);
  let [cinemaName, setcinemaName] = useState("")
  let [seats, setseats] = useState("")
  let [bookings, setbookings] = useState([])
  let [seat, setseat] = useState(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,]
  )
  useEffect(() => {
    axios.get("http://localhost:3000/user/" + pos.id)
      .then((res) => {
        setmovie(res.data)
        let getmovieDetail = JSON.parse(localStorage.getItem("movieDetail"))
        console.log(getmovieDetail.values.date);
        // console.log(moviedate);
        axios.get(`http://localhost:3000/booking/?movieName=${res.data.name}&theaterName=${getmovieDetail.values.name}&date=${getmovieDetail.values.date}`)
          .then((res) => {
            bookedSeat = []
            res.data.map((val) => {
              bookedSeat.push(val.seats)
            })
            setbookings(bookedSeat)
            // console.log(bookedSeat);
          }).catch((err) => {
            console.log(err);
          })
      })
  }, [])


  useEffect(() => {
    let getmovieDetail = JSON.parse(localStorage.getItem("movieDetail"))
    // console.log(getmovieDetail.values.date);
    setcinemaName(getmovieDetail)
  }, [])

  let bookseat = (i) => {
    setseats(i)
    setpricemodal(!pricemodal)
  }



  let paybtn = async () => {
    // console.log("pay");
    setpricemodal(!pricemodal)
    let movietime = cinemaName.val
    let date = cinemaName.values.date
    let theaterName = cinemaName.values.name
    let movieName = movie.name

    let bookingdata = {
      seats,
      movietime,
      date,
      theaterName,
      movieName
    }
    // let getseat= await axios.get("http://localhost:3000/booking/?seats="+seats)
    let getseat = await axios.get(`http://localhost:3000/booking/?seats=${seats}&&theaterName=${theaterName}&&movieName=${movieName}&&date=${date}`)
    console.log(getseat.data);
    if (getseat.data.length == 0) {
      let addTicket = await axios.post("http://localhost:3000/booking", bookingdata)
      toast.success("Your Seat is booked")
      setTimeout(() => {
        navigate("/bookings")
      }, 1000);
    }
    else {
      // alert("That Seat is booked")
      toast.error("This seat is booked")
    }

  }

  let bookedSeat;


  return (
    <>
      <div>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h6 style={{ marginBottom: "10px" }}>{movie.name}</h6>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <div className='booked'></div>
                <h5>Booked</h5>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop:"10px" }}>
                <div className='unbooked'></div>
                <h5>Available</h5>
              </div>
            </div>
          </div>

          {cinemaName &&
            <div>
              <h5>{cinemaName.values.name}</h5>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                <h5 style={{ fontWeight: "700" }}>{cinemaName.values.date}</h5>
                <h5 style={{ fontSize: "14px" }}>{cinemaName.val}</h5>
              </div>
            </div>
          }
          <div className='seat-container'>
            <div className='seats'>
              {seat.map((val, i) => {
                i = i + 1
                return (
                  <>
                    {bookings.includes(i) ?
                      <button className='box' style={{ backgroundColor: "gray", color: "White" }} disabled onClick={() => { bookseat(i) }}> {val} </button>
                      :
                      <button className='box' onClick={() => { bookseat(i) }}>
                        {/* <button className='box' onClick={() => { bookseat(i) }} style={bookings>=i?{backgroundColor:"red"}:{backgroundColor:"white"}} > */}
                        {val}
                      </button>

                    }
                  </>
                )
              })
              }
            </div>
          </div>
          <div>
            <div className={`${pricemodal ? "price-overlay" : "price-overlay-none"}`} onClick={() => { setpricemodal(!pricemodal) }}></div>
            <div className={`${pricemodal ? "price" : "price-none"}`}>
              <div className='price-detail'>
                <button className='pay-btn' onClick={() => { paybtn() }}>Pay 500</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Seats