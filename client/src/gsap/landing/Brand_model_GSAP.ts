import gsap from 'gsap';
import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Brand_model_GSAP = (root: React.MutableRefObject<null>) => {
  const q = gsap.utils.selector(root);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const target = q('.brand__model');
    gsap.fromTo(
      target,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: target,
          start: 'top 200px',
          end: '100px 200px',
        },
      },
    );
  }, []);
};

export default Brand_model_GSAP;
