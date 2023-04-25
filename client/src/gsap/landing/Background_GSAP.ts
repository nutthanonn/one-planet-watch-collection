import gsap from 'gsap';
import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Background_GSAP = (root: React.MutableRefObject<null>) => {
  const q = gsap.utils.selector(root);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    [1, 2, 3, 4, 5].forEach((i) => {
      const subheading = q(`.subtitle__animte${i}`);

      gsap.fromTo(
        subheading,
        {
          opacity: 0,
          x: 100,
          color: 'black',
        },
        {
          color: 'white',
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: subheading,
            start: `${i * 40 + 1700} 200px`,
            end: `${i * 40 + 2000}px 200px`,
            // markers: true,
            scrub: true,
            id: 'text',
          },
        },
      );

      gsap.fromTo(
        subheading,
        {
          opacity: 1,
        },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: subheading,
            start: `${i * 40 + 2400} 200px`,
            end: `${i * 40 + 2500}px 200px`,
            // markers: true,
            scrub: true,
            id: 'text',
          },
        },
      );
    });

    const target = q('.background__animate');

    gsap.fromTo(
      target,
      {
        scale: 4,
      },
      {
        scale: 0,
        scrollTrigger: {
          trigger: target,
          start: '2000px 200px',
          end: '2500px 200px',
          // markers: true,
          scrub: true,
          id: 'background',
        },
      },
    );
  }, []);
};

export default Background_GSAP;
