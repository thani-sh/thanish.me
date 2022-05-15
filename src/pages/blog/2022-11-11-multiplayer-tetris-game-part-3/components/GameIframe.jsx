import React from "react";

const styles = {
  container: {
    display: "flex",
    height: "600px",
    border: "solid 1px #aaa",
    margin: "16px 0",
  },
  button: {
    flex: 1,
    border: "none",
    background: "none",
    outline: "none",
    fontSize: "18px",
    cursor: "pointer",
  },
};

export const GameIframe = ({ src, height }) => {
  return (
    <div style={{ ...styles.container, height }}>
      <iframe src={src} width="100%" height="100%" scrolling="no" />
    </div>
  );
};
