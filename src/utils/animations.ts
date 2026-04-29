import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animations au chargement de la page
 */
export const initPageAnimations = () => {
  // Fade in des éléments au chargement
  gsap.to('h1', {
    duration: 0.8,
    opacity: 1,
    y: 0,
    ease: 'power2.out',
    delay: 0.2,
  });

  gsap.to('h2', {
    duration: 0.8,
    opacity: 1,
    y: 0,
    ease: 'power2.out',
    delay: 0.3,
    stagger: 0.1,
  });
};

/**
 * Animation scroll - révéler les éléments au scroll
 */
export const animateOnScroll = (selector: string, options?: any) => {
  gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: 'power2.out',
      ...options,
    });
  });
};

/**
 * Animation des cartes au hover
 */
export const animateCardHover = (selector: string) => {
  gsap.utils.toArray<HTMLElement>(selector).forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        duration: 0.3,
        y: -8,
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        ease: 'power2.out',
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        duration: 0.3,
        y: 0,
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        ease: 'power2.out',
      });
    });
  });
};

/**
 * Animation parallax au scroll
 */
export const animateParallax = (selector: string, speed: number = 0.5) => {
  gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        markers: false,
      },
      y: (index: number) => window.innerHeight * speed,
      ease: 'none',
    });
  });
};

/**
 * Animation stagger - apparition progressive
 */
export const animateStagger = (selector: string, duration: number = 0.8) => {
  gsap.to(selector, {
    duration,
    opacity: 1,
    y: 0,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
};

/**
 * Animation de compteur (chiffres)
 */
export const animateCounter = (selector: string, duration: number = 2) => {
  gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
    const finalValue = parseInt(element.innerText, 10);
    gsap.fromTo(
      { value: 0 },
      { value: finalValue },
      {
        duration,
        onUpdate: function () {
          element.innerText = Math.floor(this.targets()[0].value).toLocaleString();
        },
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        ease: 'power2.out',
      }
    );
  });
};

/**
 * Animation de ligne de dessin (SVG)
 */
export const animateDrawSVG = (selector: string, duration: number = 1.5) => {
  gsap.utils.toArray<SVGElement>(selector).forEach((path) => {
    const length = (path as any).getTotalLength?.();
    if (length) {
      gsap.fromTo(
        path,
        {
          strokeDasharray: length,
          strokeDashoffset: length,
        },
        {
          strokeDashoffset: 0,
          duration,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: path,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  });
};
