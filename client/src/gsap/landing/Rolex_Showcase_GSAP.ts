import gsap from 'gsap';
import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Rolex_Showcase_GSAP = (root: React.MutableRefObject<null>) => {
  const q = gsap.utils.selector(root);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const target = q('.rolex__showcase');
    gsap.fromTo(
      target,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: target,
          start: '4300px 300px',
          end: '4700px 100px',
          scrub: true,
          // markers: true,
          id: 'rolex-end-2200px',
        },
      },
    );
  }, []);
};

export default Rolex_Showcase_GSAP;
