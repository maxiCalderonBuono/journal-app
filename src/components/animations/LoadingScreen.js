const loadingScreen = (props) => {
  return (
    // <div className= "loader" style= {{backgroundColor:`${props.bgcolor}`}}>
    //      <Loader type="bubble-scale" bgColor={props.color} title={props.title} color={props.color} size={100} /> *
    // </div>
    <div
      className="loader-container"
      style={{ backgroundColor: `${props.bgcolor}` }}
    >
      <div className="loader-wrapper mb-5">
        <div className="loader">
          <div className="loader loader-inner"></div>
        </div>
      </div>
      <h3 style={{ color: `${props.color}` }}>{props.title}</h3>
    </div>
  );
};

export default loadingScreen;
