import gsap from 'gsap';
import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Brand_name_GSAP = (root: React.MutableRefObject<null>) => {
  const q = gsap.utils.selector(root);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const brand = q('.brand__animate');

    gsap.fromTo(
      brand,
      {
        opacity: 0,
        rotate: -20,
        scale: 0.5,
        width: '70px',
      },
      {
        width: '100%',
        rotate: 0,
        scale: 1,
        opacity: 1,
        scrollTrigger: {
          trigger: brand,
          start: '2800px 100px',
          end: '3200px 100px',
          scrub: true,
          // markers: true,
          id: 'brand-end-2200px',
        },
      },
    );

    gsap.fromTo(
      brand,
      {
        x: 0,
      },
      {
        x: -300,
        opacity: 0,
        scrollTrigger: {
          trigger: brand,
          start: '3400px 100px',
          end: '3700px 100px',
          scrub: true,
          // markers: true,
          id: 'brand-end-2200px',
        },
      },
    );
  }, []);
};

export default Brand_name_GSAP;
