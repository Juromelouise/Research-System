import React from 'react'

const Season = () => {
  return (
    <div> 
    <div className="hero"></div>
      <div className="glide" id="glide_1"></div>
        <div className="glide__track" data-glide-el="track"></div>
          <ul className="glide__slides"></ul>
              <div className="center"></div>
                <div className="left"></div>
                  <div className="container-fluid header bg-white p-0">
                    <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
                      <div className="col-md-6 p-5 mt-lg-5">
                        <h1 className="display-5 animated fadeIn mb-4">
                          <span className="text-primary">"What is the best seasons to plant for onion?" </span>
                        </h1>
                        <p className="animated fadeIn mb-4 pb-2 ">
                        For best growth and bulb quality, onion requires cooler weather during the early stages of growth and
                         a dry atmosphere with moderately high temperature for bulb development & maturation. 
                        Planting can be done as early as October (yellow onions) to as late as January (red onions).
                        </p>
                      </div>
                      <div className="col-md-6 animated fadeIn">
                        <div className="owl-carousel header-carousel">
                          <div className="right">
                            <img className="img-fluid" src="../onion1.png" alt=""/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
  )
}

export default Season;