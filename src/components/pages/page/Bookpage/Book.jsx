import React, { useEffect, useState } from 'react'
import './Book.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

function Book() {
  let pos = useParams()
  let [movie, setmovie] = useState([])
  const [datewise, setdatewise] = useState([])
  const [category, setcategory] = useState([])
  const [currentdata, setcurrentdata] = useState("WED 23 OCT")
  const [movieid, setmovieid] = useState("")
  const [id, setid] = useState(0)


  // let [dates, setdates] = useState([
  //   {
  //     day: "WED",
  //     date: "23",
  //     month: "OCT"
  //   },
  //   {
  //     day: "THU",
  //     date: "24",
  //     month: "OCT"
  //   }
  // ])


  // let [todayshowtimes, settodayshowtimes] = useState([[],[]])

  // useEffect(() => {
  //   axios.get("http://localhost:3000/user/" + pos.id)
  //     .then((res) => {
  //       setmovie(res.data)
  //       setmovieid(res.data.id)
  //     })
  // }, [])
  // useEffect(() => {
  //   getdatemovie()
  // }, [])
  // let getdatemovie=()=>{
  //   axios.get("http://localhost:3000/date")
  //   .then((res)=>{
  //     settodayshowtimes(res.data)
  //   })
  // }

  // let setbtn = (i) => {
  //   setid(i)
  // }




  // let settheater=(time,pos,valu)=>{
  //   let date=dates[id]
  //   let newobj={
  //     time,
  //     valu,
  //     date
  //   }
  //   localStorage.setItem("cinemas",JSON.stringify(newobj))
  // }

  useEffect(() => {
    getDate()
    getmovie()
  }, [])
  let getDate = () => {
    axios.get("http://localhost:3000/dateCategory")
      .then((res) => {
        // console.log(res.data);
        setcategory(res.data)
      })
  }
  let getmovie = () => {
    // axios.get("http://localhost:3000/CinemaCategory")
    axios.get("http://localhost:3000/CinemaCategory?date="+currentdata)
      .then((res) => {
        // console.log(res.data);
        setmovie(res.data)
      })
  }
  let filterdate=(val)=>{
    // console.log(val);
    axios.get("http://localhost:3000/CinemaCategory?date="+val.date)
    .then((res)=>{
      setmovie(res.data)
    })
  }
  let settheater=(val,values,i)=>{
    console.log(val,values);
    let aboutmovie={
      val,
      values
    }
    localStorage.setItem("movieDetail",JSON.stringify(aboutmovie))
    // console.log(value.time[i]);
    // console.log(pos);
  }


  return (
    <>
      <div className='container'>
        {category.map((val) => {
          return (
            <>
              <button className='time-btn' onClick={()=>{filterdate(val)}}>{val.date}</button>
            </>
          )
        })
        }
        <div>
          
          {movie.map((value,id) => {
            
            return (
              <>
                <div className='show-sec'>
                  <div style={{ width: "80%" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ width: "40%" }}>
                        <div style={{ padding: "20px" }}>
                          <h4>{value.name}</h4>
                        </div>
                      </div>
                      <div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ display: "flex" }}>
                            {value.time.map((val, i) => {
                              // console.log(val);
                              return (
                                <>
                                  <div>
                                    {/* <Link to={"/seats/"+movieid} onClick={()=>{settheater(val,pos,valu)}}> */}
                                    <Link to={"/seats/"+pos.id} onClick={()=>{settheater(val,value,i)}}>
                                    {/* <button className='ticket-btn' onClick={()=>{settheater(val,value,i)}}>{val}</button> */}
                                    <button className='ticket-btn'>{val}</button>
                                    </Link>
                                  </div>
                                  <div>
                                  </div>
                                </>
                              )
                            })
                            }
                          </div>
                        </div>
                        {/* <h6 style={{ marginLeft: "10px"}}>{valu.cancellation}</h6> */}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          })
          }
        </div>
      </div>

      {/* <div>
        <div>
          <h1 style={{ textAlign: "center" }}>Book Tickets</h1>
          <div>
            <div className='title'>
              <div className='container'>
                <div className='about-movie-sec'>
                  <h1>{movie.name}:</h1>
                  <div>
                    <div style={{ display: "flex", gap: "5px" }}>
                      {movie.languages &&
                        movie.languages.map((val) => {
                          return (
                            <h4>{val}</h4>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div className="container">
                  <div>
                    {dates.map((val, i) => {
                      return (
                        <>
                          <button className='time-btn' onClick={() => { setbtn(i) }}>
                            <div>{val.day}</div>
                            <div>{val.date}</div>
                            <div>{val.month}</div>
                          </button>
                        </>
                      )
                    })
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className='booking-sec'>
              <div className='container'>
                <div className='pvr-sec'>

                  {todayshowtimes[id].map((valu,pos) => {
                    return (
                      <>
                        <div className='show-sec'>
                          <div style={{ width: "80%" }}>

                            <div style={{ display: "flex", alignItems: "center" }}>
                              <div style={{ width: "40%" }}>
                                <div style={{ padding: "20px" }}>
                                  <h4>{valu.name}</h4>
                                </div>
                              </div>
                              <div>
                                <div style={{ textAlign: "right" }}>
                                  <div style={{ display: "flex" }}>
                                    {valu.time.map((val,i) => {
                                      console.log(val);
                                      return (
                                        <>
                                          <div>
                                            <Link to={"/seats/"+movieid} onClick={()=>{settheater(val,pos,valu)}}>
                                              <button className='ticket-btn'>{val}</button>
                                            </Link>
                                          </div>
                                          <div>
                                          </div>
                                        </>
                                      )
                                    })
                                    }
                                  </div>
                                </div>
                                <h6 style={{ marginLeft: "10px"}}>{valu.cancellation}</h6>
                              </div>
                            </div>
                          </div>

                        </div>
                      </>
                    )
                  })
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}



    </>
  )
}

export default Book