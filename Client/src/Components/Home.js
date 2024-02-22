import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* <!-- Header Start --> */}
      <div class="container-fluid header bg-white p-0">
        <div class="row g-0 align-items-center flex-column-reverse flex-md-row">
          <div class="col-md-6 p-5 mt-lg-5">
            <h1 class="display-5 animated fadeIn mb-4">
              Onion <span class="text-primary">Supply </span>Chain
            </h1>
            <p class="animated fadeIn mb-4 pb-2">
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
          <div class="col-md-6 animated fadeIn">
            <div class="owl-carousel header-carousel">
              <div class="owl-carousel-item">
                <img class="img-fluid" src="../home.png" alt="" />
              </div>
              <div class="owl-carousel-item">
                <image class="img-fluid" src="image/onion1.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Header End --> */}
      <div class="tab-content">
        <div id="tab-1" class="tab-pane fade show p-0 active">
          <div class="row g-4">
            <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div class="property-item rounded overflow-hidden">
                <div class="position-relative overflow-hidden">
                  {/* <a href=""><img class="img-fluid" src="img/property-1.jpg" alt=""></a> */}
                  <div class="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                    For Sell
                  </div>
                  <div class="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">
                    Appartment
                  </div>
                </div>
                <div class="p-4 pb-0">
                  <a class="d-block h5 mb-2" href="">
                    Overview of onion
                  </a>
                  <p>
                    <i class="fa fa-map-marker-alt text-primary me-2"></i>The
                    onion, scientifically known as Allium cepa, is a globally
                    cultivated vegetable belonging to the genus Allium.
                    Originating in Southwest Asia, onions are now grown across
                    the world, primarily in temperate regions.Onions are
                    versatile vegetables, suitable for both raw consumption and
                    cooking. Spring onions and green onions are smaller versions
                    of mature onions, while shallots, pearl onions, and others
                    offer distinct tastes and textures.Additionally, onions
                    possess medicinal qualities, being used to treat respiratory
                    issues like asthma and to lower blood sugar and cholesterol
                    levels{" "}
                  </p>
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
