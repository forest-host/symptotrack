const px2rem = (...pxs) => pxs.map(px => `${px / 16}rem`).join(' ');

export default px2rem;
