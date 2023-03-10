import gsap from 'gsap';
import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Heading_GSAP = (root: React.MutableRefObject<null>) => {
  const q = gsap.utils.selector(root);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const PowerBy = q('.landing__target');
    gsap.fromTo(
      q('.landing__heading'),
      {
        width: '20px',
      },
      {
        width: '150px',
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: PowerBy,
          start: '200px 200px',
          end: '400px 200px',
          scrub: true,
        },
      },
    );
    gsap.fromTo(
      q('.landing__watch'),
      {
        scale: 1,
        opacity: 1,
      },
      {
        scale: 3,
        opacity: 0,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: PowerBy,
          start: '200px 200px',
          end: '400px 200px',
          scrub: true,
        },
      },
    );
  }, []);
};

export default Heading_GSAP;
