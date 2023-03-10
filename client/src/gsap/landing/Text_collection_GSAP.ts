import gsap from 'gsap';
import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Text_collection_GSAP = (root: React.MutableRefObject<null>) => {
  const q = gsap.utils.selector(root);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const target = q('.text__collection');
    gsap.fromTo(
      target,
      {
        opacity: 0,
        scale: 2.5,
      },
      {
        scale: 1,
        opacity: 1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: target,
          start: '-50px 200px',
          end: '100px 200px',
          scrub: true,
        },
      },
    );
  }, []);
};

export default Text_collection_GSAP;
