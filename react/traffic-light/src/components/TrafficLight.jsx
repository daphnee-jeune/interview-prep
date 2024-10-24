import React, { useState } from "react";

const TrafficLight = ({ activeLight }) => {
  const colors = ["red", "yellow", "green"];
  const lights = colors.map((color) => (
    <div
      key={Math.random(Math.floor() * 10)}
      className="inactive"
      style={
        activeLight === color
          ? { ...styles.light, ...styles[`${color}Active`] }
          : { ...styles.light, ...styles[`${color}`] }
      }
    />
  ));
  return <div className="trafficLight">{lights}</div>;
};

const styles = {
  light: {
    backgroundColor: "#1b1e1f",
    margin: "30px 0",
    borderRadius: "50%",
    height: "80px",
    width: "80px",
  },
  inactive: {
    backgroundColor: "#000",
  },
  redActive: {
    backgroundColor: "red",
    boxShadow: "0 0 20px 5px red",
  },
  yellowActive: {
    backgroundColor: "yellow",
    boxShadow: "0 0 20px 5px yellow",
  },
  greenActive: {
    backgroundColor: "lightgreen",
    boxShadow: "0 0 20px 5px lightgreen",
  },
};
export default TrafficLight;
