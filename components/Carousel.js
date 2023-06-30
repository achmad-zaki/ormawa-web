import { useState, useEffect } from 'react';
import Image from 'next/image';

const Carousel = ({ images, autoSlideInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, autoSlideInterval);

    return () => {
      clearInterval(timer);
    };
  }, [images.length, autoSlideInterval]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="relative top-28 ">
      {/* <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded-l"
        onClick={prevSlide}
      >
        Prev
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded-r"
        onClick={nextSlide}
      >
        Next
      </button> */}
      <Image src={images[currentIndex]} alt="Carousel Slide" className="mx-auto object-contain max-w-full max-h-96" />
    </div>
  );
};

export default Carousel;
