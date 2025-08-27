/*
 * Licensed under the MIT License. See LICENSE file in the project root for full license text.
 */

"use client"

import React, { useState, useEffect } from 'react'
import { assets, workData } from '../../assets/assets'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Projects = () => {
  const [isDark, setIsDark] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null) // modal
  const [visibleCount, setVisibleCount] = useState(4); // Show first row (4 projects) initially

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkTheme()
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const projectStyles = {
    text: { color: isDark ? '#fff' : '#222', transition: 'color 0.3s ease' },
    card: { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#fff', borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'transparent', transition: 'all 0.3s ease' }
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0); // Reset to first image when opening new project
  };
  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0); // Reset to first image when closing
  };

  // Add keyboard event listener for Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        closeModal();
      }
    };

    if (selectedProject) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

const titleVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};


  return (
    <motion.div id="projects" className='w-full px-[12%] py-10 scroll-mt-20 snap-section'>
      {/* Header */}
      <div className="text-center mb-16">
        <h4 style={projectStyles.text} className="mb-2 text-lg font-mozilla-headline font-light">My portfolio</h4>
        <motion.h2
          style={projectStyles.text}
          className="text-5xl font-mozilla-headline font-medium mb-8"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          My latest projects
        </motion.h2>
        <p style={projectStyles.text} className="max-w-2xl mx-auto font-mozilla-text">
          Welcome to my portfolio! Explore a collection of projects showcasing my expertise in full-stack web development.
        </p>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-10 gap-5">
        {workData.slice(0, visibleCount).map((project, index) => (
          <motion.div
            key={index}
            className='aspect-square bg-no-repeat bg-cover bg-center rounded-lg border-1 border-gray-500 relative cursor-pointer group overflow-hidden hover:shadow-xl'
            style={{ backgroundImage: `url(${project.bgImage})` }}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal(project)}
          >
        
            <motion.div 
              style={{
                background: 'rgba(40,40,40,0.3)',
                border: '1px solid rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s ease',
              }}
              className='w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between shadow-lg z-20'
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.15 + 0.1 }}
            >  
              <div className="flex-1">
                <motion.h2 
                  style={{ color: '#fff', transition: 'color 0.3s ease' }} 
                  className='font-semibold mb-1'
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.15 + 0.2 }}
                >
                  {project.title}
                </motion.h2>
              </div>
              <div 
                className='arrow-container border rounded-full w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] bg-white/20 transition-transform duration-300 z-20'
              >
                <Image src={assets.send_icon} alt='' className='w-5 transition-transform duration-300 group-hover:rotate-45' />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Show More button after the grid */}
      {workData.length > 4 && visibleCount < workData.length && (
        <div className="flex justify-center items-center col-span-full">
          <button
            className="px-6 py-2 mt-5 border-1 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition"
            onClick={() => setVisibleCount(workData.length)}
          >
            Show More
          </button>
        </div>
      )}

      {/* Show Less button after the grid */}
      {workData.length > 4 && visibleCount === workData.length && (
        <div className="flex justify-center items-center col-span-full">
          <button
            className="px-6 py-2 mt-5 border-1 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition"
            onClick={() => setVisibleCount(4)}
          >
            Show Less
          </button>
        </div>
      )}

      {/* Modal / Pop-out page */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 md:px-0 pt-24 sm:pt-28 md:pt-8"
          onClick={closeModal}
        >
          <motion.div
            className={`rounded-xl w-full max-w-4xl p-8 relative shadow-xl overflow-y-auto max-h-[80vh] sm:max-h-[85vh] md:max-h-[90vh] mt-4 md:mt-0 ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-2xl font-bold z-20 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
                isDark ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'
              }`}
              onClick={closeModal}
              aria-label="Close modal"
            >
              ×
            </button>

            <h2 className="text-3xl font-semibold mb-6" style={projectStyles.text}>
              {selectedProject.title}
            </h2>

            {/* Image Browser */}
            <div className="mb-6">
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="relative">
                  {/* Main Image Display */}
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={selectedProject.images[currentImageIndex]}
                      alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                      width={800}
                      height={600}
                      className="object-cover"
                    />
                    
                    {/* Navigation Arrows - Only show if more than 1 image */}
                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImageIndex(prev => 
                            prev === 0 ? selectedProject.images.length - 1 : prev - 1
                          )}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                        >
                          ←
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex(prev => 
                            prev === selectedProject.images.length - 1 ? 0 : prev + 1
                          )}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                        >
                          →
                        </button>
                      </>
                    )}
                    
                    {/* Image Counter */}
                    {selectedProject.images.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                        {currentImageIndex + 1} / {selectedProject.images.length}
                      </div>
                    )}
                  </div>
                  
                  {/* Thumbnail Navigation - Only show if more than 1 image */}
                  {selectedProject.images.length > 1 && (
                    <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                      {selectedProject.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImageIndex(i)}
                          className={`flex-shrink-0 w-20 h-12 rounded overflow-hidden border-2 transition-all ${
                            currentImageIndex === i 
                              ? 'border-blue-500 opacity-100' 
                              : isDark 
                                ? 'border-gray-600 opacity-60 hover:opacity-80' 
                                : 'border-gray-300 opacity-60 hover:opacity-80'
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`Thumbnail ${i + 1}`}
                            width={80}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Project Description */}
            <div className="mb-6 space-y-2">
              {Array.isArray(selectedProject.description) 
                ? selectedProject.description.map((line, i) => (
                  <p key={i} style={projectStyles.text}>{line}</p>
                ))
                : <p style={projectStyles.text}>{selectedProject.description}</p>
              }
            </div>

            {/* GitHub Link */}
            {selectedProject.githubLink && (
              <a
                href={selectedProject.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block px-6 py-2 rounded-full border transition-colors ${
                  isDark
                    ? 'border-gray-200 text-gray-200 hover:bg-gray-700'
                    : 'border-gray-700 text-gray-700 hover:bg-gray-200'
                }`}
              >
                View on GitHub
              </a>
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

export default Projects
