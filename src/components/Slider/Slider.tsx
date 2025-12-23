"use client";

import SlideOne from "./SlideOne"
import SlideSecond from "./SlideSecond"
import {motion} from "framer-motion"


const Slider = () => {

   const slides = [
    <SlideOne key="slide1"/>,
    <SlideSecond key="slide2"/>
   ]
  return (
    <div className="relative h-20 md:h-40  w-full overflow-hidden mb-10 md:mb-15 xl:h-60">
      {slides.map((slide , index) => (
        <motion.div key={`slide-${index}`}
        initial={{opacity:0}}
        animate={{opacity:[0,1,1,0]}}
        transition={{
          duration:5,
          repeat:Infinity,
          repeatDelay: slides.length * 5 - 5,
          delay: index * 5
        }}
        className="absolute w-full h-full"
        >
         {slide}
        </motion.div>
      ))}  
    </div>
  )
}

export default Slider