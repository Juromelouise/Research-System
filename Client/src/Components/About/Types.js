import React from "react";

const Types = () => {
  return (
    <div>
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
                <span className="text-primary">
                  "The different types of onion "{" "}
                </span>
              </h1>
              <p className="animated fadeIn mb-4 pb-2">
                In the Philippines, the most commonly cultivated onion varieties
                include Red Creole (red onion), Yellow Granex (white onion), and
                shallot (multiplier onion). Recently, native onion cultivars
                such as Tanduyong and Batanes are gaining popularity for export
                purposes.
              </p>
            </div>
            <div className="col-md-5 animated fadeIn">
              <div className="owl-carousel header-carousel">
                <div className="right">
                  <img className="img-fluid" src="../oniontypes.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero"></div>
        <div className="glide" id="glide_2">
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides"></ul>
            <div className="center">
              <div className="right">
                <div className="container-fluid header bg-white p-0">
                  <div className="row g-0 align-items-left flex-column-reverse flex-md-row">
                    <div className="col-md-6 p-5 mt-lg-5">
                      <div className="col-md-10 animated fadeIn">
                        <div className="owl-carousel header-carousel">
                          <div className="left">
                            <img
                              className="img-fluid"
                              src="../red onion.jpg"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 p-5 mt-lg-5 animated fadeIn">
                      <div>
                        <h1 className="display-5 mb-4">
                          <span className="text-primary align-items-left">
                            " Red onion"{" "}
                          </span>
                        </h1>
                        <p className="mb-4 pb-2">
                          Red onion is a popular vegetable in the Philippines.
                          It is used in many dishes and is considered a staple
                          in Filipino cuisine.Over the past few years, the price
                          of red onions has fluctuated dramatically due to
                          several factors including supply chain disruptions,
                          extreme weather events, and import policies. the red
                          onion industry in the Philippines faces complex
                          challenges related to pricing, climate change, and
                          trade policy, which require careful attention and
                          strategic solutions to ensure the long-term
                          sustainability of the sector and the wellbeing of
                          local farmers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Types;
