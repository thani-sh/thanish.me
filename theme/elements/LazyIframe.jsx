import { useState } from "react";

const styles = {
  container: {
    display: "flex",
    height: "600px",
    border: "dashed 1px #aaa",
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

export const LazyIframe = ({ src, height }) => {
  const [enabled, setEnabled] = useState(false);
  const iframeEl = (
    <iframe src={src} width="100%" height="100%" scrolling="no" />
  );
  const buttonEl = (
    <button style={styles.button} onClick={() => setEnabled(true)}>
      Click Here
    </button>
  );
  return (
    <div style={{ ...styles.container, height }}>
      {enabled ? iframeEl : buttonEl}
    </div>
  );
};
