import React from "react";
import PropTypes from "prop-types";

const Navbr = ({ icon, title }) => {
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
    </nav>
  );
};
Navbr.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github",
};

Navbr.propTyopes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
export default Navbr;
