const hex2rgba = (hex, opacity) => {
  const h = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return `rgba(${parseInt(h[1], 16)},${parseInt(h[2], 16)},${parseInt(h[3], 16)},${opacity})`;
};

export default hex2rgba;
