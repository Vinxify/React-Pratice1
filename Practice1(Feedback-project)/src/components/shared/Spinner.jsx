import spinner from "../../assests/spinner-loading.gif";

function Spinner() {
  return (
    <img
      src={spinner}
      alt='Loading...'
      style={{ width: "100px", display: "block", margin: "auto" }}
    />
  );
}

export default Spinner;
