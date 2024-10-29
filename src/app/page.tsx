'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductOption {
  value: string;
  label: string;
  image: string;
  alt: string;
  name: string;
  description: string;
}

interface Product {
  options: ProductOption[];
}

const products: Product[] = [
  {
    options: [
      {
        value: 'black',
        label: 'Matte Black',
        image:
          'https://images.pexels.com/photos/1552616/pexels-photo-1552616.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        alt: 'Matte black stylish floor lamp in a cozy room',
        name: 'Stylish Bedroom Lamp - Matte Black',
        description:
          'A chic floor lamp in matte black finish that combines elegance and functionality.',
      },
      {
        value: 'white',
        label: 'Bright White',
        image:
          'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        alt: 'Bright white floor lamp illuminating a modern living room',
        name: 'Stylish Bedroom Lamp - Bright White',
        description:
          'A modern floor lamp in bright white that enhances any living space with its light.',
      },
      {
        value: 'silver',
        label: 'Brushed Steel',
        image:
          'https://images.pexels.com/photos/4107184/pexels-photo-4107184.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        alt: 'Brushed steel stylish floor lamp with an elegant design',
        name: 'Stylish Bedroom Lamp - Brushed Steel',
        description: 'An elegant brushed steel floor lamp that adds a touch of sophistication.',
      },
      {
        value: 'blue',
        label: 'Royal Blue',
        image: '',
        alt: 'Royal blue stylish floor lamp',
        name: 'Stylish Floor Lamp - Royal Blue',
        description: 'A bold royal blue floor lamp that adds a pop of color to any room.',
      },
    ],
  },
];

export default function ProductPage() {
  const [currentProduct] = useState<Product>(products[0]);
  const [selectedOption, setSelectedOption] = useState<string>(currentProduct.options[0].value);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  const currentOption = useMemo(
    () => currentProduct.options[currentImageIndex],
    [currentImageIndex, currentProduct],
  );

  const changeImage = (direction: number) => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex =
        (prevIndex + direction + currentProduct.options.length) % currentProduct.options.length;
      
      setSelectedOption(currentProduct.options[newIndex].value);

      return newIndex;
    });
  };

  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  const handleOptionChange = (value: string) => {
    const newIndex = currentProduct.options.findIndex((option) => option.value === value);

    setSelectedOption(value);
    setCurrentImageIndex(newIndex);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl w-full relative">
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-md shadow-lg flex items-center gap-2"
            >
              <span className="font-semibold">{currentOption.label}</span>

              <span>added to cart!</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="md:flex">
          <div className="md:w-1/2 relative">
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                className="w-full h-[350px] relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={currentOption.image}
                  alt={currentOption.alt}
                  width={600}
                  height={400}
                  style={{ objectFit: 'cover' }}
                  onLoad={handleImageLoad}
                  onLoadingComplete={handleImageLoad}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/fake-lamp.webp';
                  }}
                />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() => changeImage(-1)}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              aria-label="Previous image"
            >
              <ChevronLeftIcon />
            </button>

            <button
              onClick={() => changeImage(1)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              aria-label="Next image"
            >
              <ChevronRightIcon />
            </button>
          </div>

          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-semibold mb-4">{currentOption.name}</h1>

            <p className="text-gray-600 mb-6">{currentOption.description}</p>

            <div className="mb-6">
              <Select.Root
                value={selectedOption}
                onValueChange={handleOptionChange}
              >
                <Select.Trigger className="inline-flex items-center justify-between rounded px-4 py-2 text-sm leading-none h-9 gap-1 bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 outline-none">
                  <Select.Value placeholder="Select a color" />

                  <Select.Icon>
                    <ChevronDownIcon />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg">
                    <Select.Viewport className="p-2">
                      {currentProduct.options.map((option) => (
                        <Select.Item
                          key={option.value}
                          value={option.value}
                          className="relative flex items-center px-8 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 cursor-pointer outline-none"
                        >
                          <Select.ItemText>{option.label}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors active:bg-gray-900 active:scale-95 flex items-center justify-center"
              aria-live="polite"
            >
              Add to Cart
            
              {cartCount > 0 && (
                <span className="ml-2 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
