import gsap from 'gsap';
import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Brand_model_GSAP = (root: React.MutableRefObject<null>) => {
  const q = gsap.utils.selector(root);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    [1, 2, 3].forEach((i) => {
      const target = q(`.title__${i}`);
      gsap.fromTo(
        target,
        {
          opacity: 0,
          scale: 1.1,
        },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: target,
            start: `${i === 0 ? 'top' : i * 10}px 100px`,
            // end: '800px 100px',
            end: `${i * 100 + 100}px 100px`,
            scrub: true,
            // markers: true,
          },
        },
      );

      gsap.fromTo(
        target,
        {
          opacity: 1,
        },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: target,
            start: `${i === 0 ? 'top' : i * 100 + 200 + i * 200 + 100}px 100px`,
            // end: '800px 100px',
            end: `${i * 200 + 700}px 100px`,
            scrub: true,
            // markers: true,
          },
        },
      );
    });
  }, []);
};

export default Brand_model_GSAP;
