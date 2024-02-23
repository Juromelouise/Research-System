import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="hero"></div>
        <div className="glide" id="glide_1"></div>
          <div className="glide__track" data-glide-el="track"></div>
            <ul className="glide__slides"></ul>
              {/* <li className="glide__slide"> */}
                <div className="center"></div>
                  <div className="left"></div>
                    {/* Header Start */}
                    <div className="container-fluid header bg-white p-0">
                      <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
                        <div className="col-md-6 p-5 mt-lg-5">
                          <h1 className="display-5 animated fadeIn mb-4">
                            <span className="text-primary">"Onistem" </span>
                          </h1>
                          <p className="animated fadeIn mb-4 pb-2">
                            Optimizing Onion Supply Chain: A Web-Based Platform for Improved
                            Communication and Transparency. This web-based platform gives a
                            chance and improves the safest and fastest way to exchange and
                            promote a Filipino onion. By using a web platform, it will be
                            possible to demonstrate the need for improvements in the onion
                            supply chain and assist small farmers who are unable to voice
                            their concerns to the public. This will help them understand why
                            onions are always becoming more expensive. Enhancing transparency
                            and facilitating better communication might be possible
                          </p>
                        </div>
                        <div className="col-md-6 animated fadeIn">
                          <div className="owl-carousel header-carousel">
                            <div className="right">
                              <img className="img-fluid" src="../home.png" alt="" />
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
              <div className="col-md-6 animated fadeIn">
                <div className="owl-carousel header-carousel">
                  <div className="left">
                    <img className="img-fluid" src="../onion.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 p-5 mt-lg-5 animated fadeIn">
              <div>
                <h1 className="display-5 mb-4">
                  <span className="text-primary align-items-left">"Overview of Onion" </span>
                </h1>
                <p className="mb-4 pb-2">
                The onion, scientifically known as Allium cepa, is a globally
                 cultivated vegetable belonging to the genus Allium.
                Originating in Southwest Asia, onions are now grown across
                 the world, primarily in temperate regions. Onions are
                  versatile vegetables, suitable for both raw consumption and
                   cooking. Spring onions and green onions are smaller versions
                    of mature onions, while shallots, pearl onions, and others
                    offer distinct tastes and textures. Additionally, onions
                    possess medicinal qualities, being used to treat respiratory
                    issues like asthma and to lower blood sugar and cholesterol
                  levels
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
                          
                        
      
  );
};

export default Home;
