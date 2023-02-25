import React from "react";

function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection:'column',
        alignItems: "center",
        justifyContent: "center",
        padding: "1em",
        width: "80%",
        margin: "0 auto",
        maxWidth: "400px",
        height: "80vh",
      }}
    >
      <img
        style={{width: "100%",marginBottom:'2em'}}
        src={"../assets/404 not found.svg"}
          />
          
      <h2  style={{color:'red'}}>page not found!!</h2>
    </div>
  );
}

export default NotFound;
