import React from "react";
import { DNA } from "react-loader-spinner";

const Loader = () => {
  return (
    <DNA
    visible={true}
    height="500"
    width="500"
    ariaLabel="dna-loading"
    wrapperStyle={{marginTop: "200px"}}
    wrapperClass="dna-wrapper"
    />
  );
};

export default Loader;
