import React from 'react';
// import heroImage from '../assets/hero-banner.png'; // Replace with your image

const Hero = () => {
  return (
    <section className="bg-gray-50 pt-20 md:pt-32">
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-gray-800 leading-snug">
            Explore Premium Electronics <span className="text-blue-600">Smarter</span>
          </h2>
          <p className="mt-4 text-gray-600">
            ElectroMart brings you a smooth Apple-style shopping experience. Shop smarter and faster.
          </p>
          <div className="mt-6">
            <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
              Shop Now
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
          {/* <img src={heroImage} alt="Electronics showcase" className="w-full" /> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
