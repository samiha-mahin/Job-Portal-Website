import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const Category = () => {
  return (
    <div>
        <Carousel className='w-full max-w-xl mx-auto my-20'>
            <CarouselContent>
                {
                    category.map((cat, index) => {
                        return ( // Return the CarouselItem from the map function
                            <CarouselItem key={index} className='md:basis-1/2 lg-basis-1/3'>
                                <Button variant="outline" className='rounded-full'>{cat}</Button>
                            </CarouselItem>
                        );
                    })
                }
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>
    </div>
  )
}

export default Category
