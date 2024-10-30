import React from 'react'

function Slider() {
    return (
        <>
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner" style={{height:"100%"}}>
                    <div class="carousel-item active" style={{objectFit:"cover"}}>
                        <img class="d-block w-100" style={{objectFit:"cover", width:"1200px"}} src={"https://assets-in.bmscdn.com/promotions/cms/creatives/1726040605632_falgunipathakweb.jpg"} alt="First slide" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src={"https://assets-in.bmscdn.com/promotions/cms/creatives/1726215338904_cherryblossom1240x300.jpg"} alt="Second slide" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src={"https://assets-in.bmscdn.com/promotions/cms/creatives/1726036566435_playcardnewweb.jpg"} alt="Third slide" />
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </>
    )
}

export default Slider