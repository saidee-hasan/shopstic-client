import React, { useState } from 'react';
import { FiChevronRight, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeaturedCategory = ({ categories }) => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleRedirect = (category) => {
    if (category) {
      navigate(
        `category-products?${category?.category
          ?.toLowerCase()
          ?.split(` `)
          ?.join("-")}`,
        {
          state: {
            payload: { ...category },
          },
        }
      );
    }
  };

  // Animation variants
  const itemVariants = {
    hover: {
      y: -5,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const textVariants = {
    hover: {
      color: "#2563eb",
      transition: { duration: 0.2 }
    }
  };

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-8xl mx-auto">
      <div className="mb-6 sm:mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-3 sm:mb-0">
        
          <p className="text-sm sm:text-base text-gray-500 mt-1 sm:mt-2">
            Discover our premium collections
          </p>
        </div>
        
       
      </div>
      
      {/* Mobile: 4 columns, Larger screens: responsive columns */}
      <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 md:gap-6">
        {categories?.slice(0, 16)?.map((category) => (
          <motion.div
            key={category?._id}
            className="group flex flex-col items-center cursor-pointer"
            onClick={() => handleRedirect(category)}
            onMouseEnter={() => setHoveredItem(category._id)}
            onMouseLeave={() => setHoveredItem(null)}
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <div className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-2 sm:mb-3 md:mb-4">
              {/* Gradient glow effect - desktop only */}
              {hoveredItem === category._id && (
                <motion.div 
                  className="hidden sm:block absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-md opacity-70"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1.1, opacity: 0.7 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              
              {/* Main circle */}
              <div className="relative w-full h-full border sm:border-2 border-gray-100 sm:border-white rounded-full p-1 shadow-sm sm:shadow-lg flex items-center justify-center bg-white group-hover:border-blue-200 transition-all duration-300 z-10 overflow-hidden">
                <motion.img
                  className="h-8 w-8 sm:h-12 sm:w-12 md:h-14 md:w-14 object-contain"
                  src={category?.image}
                  alt={category?.category}
                  loading="lazy"
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: hoveredItem === category._id ? 1.1 : 1,
                    rotate: hoveredItem === category._id ? [0, 5, -5, 0] : 0
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            
            <motion.span 
              className="text-xs sm:text-sm font-medium text-gray-700 text-center group-hover:text-blue-600 transition-colors line-clamp-2 px-1"
              variants={textVariants}
            >
              {category?.category}
            </motion.span>
            
            {/* Animated underline - desktop only */}
            {hoveredItem === category._id && (
              <motion.div 
                className="hidden sm:block absolute -bottom-1 sm:-bottom-2 h-0.5 sm:h-1 bg-blue-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategory;