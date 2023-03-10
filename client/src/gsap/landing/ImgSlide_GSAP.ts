import gsap from 'gsap';
import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ImgSlide_GSAP = (root: React.MutableRefObject<null>) => {
  const q = gsap.utils.selector(root);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const PowerBy = q('.scale__img');
    gsap.fromTo(
      q('.scale__img'),
      {
        scale: 1,
      },
      {
        scale: 1.05,
        scrollTrigger: {
          trigger: PowerBy,
          start: '200px 200px',
          end: '200px 200px',
        },
      },
    );
  }, []);
};

export default ImgSlide_GSAP;
