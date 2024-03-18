import React, { useState } from "react";
import { LeftItemList } from "./LeftItemList";
import { Divider, List } from "@mui/material";


const Production = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (

    

    <div style={{ display: "flex", height: "100vh", fontFamily: "Times New Roman", color: "white" }}>
      <div
        style={{
          width: "20%",
          marginRight: "10px",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {LeftItemList}
      </div>

      <div style={{ flex: "1", textAlign: "center", overflowY: "auto" }}>
      <div className="hero"></div>
      <img src="../types.png" className="img-fluid" alt="Wild Landscape" style={{maxWidth: '100%', height: '50%'}} width={1300} height={300} />
      <hr/>
          <div className="glide" id="glide_1"></div>
          <div className="glide__track" data-glide-el="track"></div>
          <ul className="glide__slides"></ul>
          <div className="center"></div>
          <div className="left"></div>
          <div className="container-fluid header #1F0337">
            <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
            <div className="col-md-6 p-5 "style={{ textAlign: "left" }}>
                <h1 className="display-5 animated fadeIn mb-4">
                  <span className="text-primary">
                    TYPES OF ONION{" "}
                  </span>
                </h1>
                <p style={{ color: "white", fontSize: "24px" }}>
                <ul>
                <li>
                The most commonly cultivated onion varieties include Red Creole (red onion), Yellow Granex (white onion), and shallot (multiplier onion)
                </li>
                </ul>
                </p>
              </div>
              
              <div className="col-md-6 animated fadeIn">
                <div className="owl-carousel header-carousel">
                  <div className="right">
                    <img className="img-fluid" src="../farming.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />

          <div className="glide" id="glide_1"></div>
          <div className="glide__track" data-glide-el="track"></div>
          <ul className="glide__slides"></ul>
          <div className="center"></div>
          <div className="left"></div>
          <div className="container-fluid header #1F0337">
            <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
            <div className="col-md-6 p-5 "style={{ textAlign: "left" }}>
                <h1 className="display-5 animated fadeIn mb-4">
                  <span className="text-primary">
                  SHALLOT {" "}
                  </span>
                </h1>
                <p style={{ color: "white", fontSize: "24px" }}>
                <ul>
                <li>
                Shallots are technically a type of onion, but they’re not exactly the same as your yellow, white, or sweet onions. Their characteristics can overlap, but here’s how they differ. Shallots are much smaller than regular onions (though some outliers are comically large), and they have a bulb-like shape similar to a clove of garlic. Since shallots are smaller, you’d need to use several of them in place of one onion. 
                </li>
                </ul>
                </p>
              </div>
              <div className="col-md-6 animated fadeIn">
                <div className="owl-carousel header-carousel">
                  <div className="right">
                    <img className="img-fluid" src="../shallot.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />

          <div className="glide" id="glide_1"></div>
          <div className="glide__track" data-glide-el="track"></div>
          <ul className="glide__slides"></ul>
          <div className="center"></div>
          <div className="left"></div>
          <div className="container-fluid header #1F0337">
            <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
            <div className="col-md-6 p-5 "style={{ textAlign: "left" }}>
                <h1 className="display-5 animated fadeIn mb-4">
                  <span className="text-primary">
                    WHITE ONION{" "}
                  </span>
                </h1>
                <p style={{ color: "white", fontSize: "24px" }}>
                <ul>
                <li>
                A white onion is a type of onion (Allium cepa) with an opaque white color beneath its skin, known for being slightly sweeter and milder in taste compared to yellow onions. White onions are often used raw in salads, salsas, sandwiches, and burgers due to their subtle flavor. They are also suitable for dishes where the onion flavor should not linger.
                </li>
                </ul>
                </p>
              </div>
              <div className="col-md-6 animated fadeIn">
                <div className="owl-carousel header-carousel">
                  <div className="right">
                    <img className="img-fluid" src="../whiteonion.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />

          <div className="glide" id="glide_1"></div>
          <div className="glide__track" data-glide-el="track"></div>
          <ul className="glide__slides"></ul>
          <div className="center"></div>
          <div className="left"></div>
          <div className="container-fluid header #1F0337">
            <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
            <div className="col-md-6 p-5 "style={{ textAlign: "left" }}>
                <h1 className="display-5 animated fadeIn mb-4">
                  <span className="text-primary">
                    RED ONION{" "}
                  </span>
                </h1>
                <p style={{ color: "white", fontSize: "24px" }}>
                <ul>
                <li>
                A red onion is a type of onion (Allium cepa) with a purplish-red skin and white flesh tinged with red. It is commonly used in cooking and has a sweeter flavor than white or yellow onions due to low levels of pyruvic acid and sulfur compounds. Red onions are often consumed raw, grilled, or lightly cooked with other foods.
                </li>
                </ul>
                </p>
              </div>
              <div className="col-md-6 animated fadeIn">
                <div className="owl-carousel header-carousel">
                  <div className="right">
                    <img className="img-fluid" src="../redonion.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          
          <div className="glide" id="glide_1"></div>
          <div className="glide__track" data-glide-el="track"></div>
          <ul className="glide__slides"></ul>
          <div className="center"></div>
          <div className="left"></div>
          <div className="container-fluid header #1F0337">
            <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
            <div className="col-md-6 p-5 "style={{ textAlign: "left" }}>
                <h1 className="display-5 animated fadeIn mb-4">
                  <span className="text-primary">
                  YELLOW ONION {" "}
                  </span>
                </h1>
                <p style={{ color: "white", fontSize: "24px" }}>
                <ul>
                <li>
                The yellow onion or brown onion is a variety of dry onion with a strong flavour. They have a greenish-white, light yellow, or white inside; its layers of papery skin have a yellow-brown or pale golden colour. It is higher in sulphur content than the white onion, which gives it a stronger, more complex flavour
                </li>
                </ul>
                </p>
              </div>
              <div className="col-md-6 animated fadeIn">
                <div className="owl-carousel header-carousel">
                  <div className="right">
                    <img className="img-fluid" src="../yellowonion.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col"><h1>SOME RELATED VIDEO</h1></th>
              </tr>
            </thead>
          </table>
          <div className="embed-responsive embed-responsive-16by9">
                                            <center>
                                                <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/7XIVxp-7I5s" allowFullScreen width="750" height="450"></iframe>
                                            </center>
                                            <p className="citation" style={{color: 'white'}}>Copyright: YouTube. (n.d.). Www.youtube.com. Retrieved March 18, 2024 </p>
                      <p>from https://www.youtube.com/embed/7XIVxp-7I5s</p>
        </div>
      <hr/>
        <List component="nav">
          <Divider sx={{ my: 1 }} />
        </List>
      </div>
    </div>
  );
};

export default Production;
