import PropTypes from "prop-types";

function Card({ children, reverse }) {
  // return <div className={`card ${reverse && "reverse"}`}>{children}</div>;

  return <div className='card'>{children}</div>;
}

Card.propTypes = {
  children: PropTypes.node,
};

export default Card;
