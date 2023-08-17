import React from 'react'
import { shortList, list, longList } from "./data"
import { FaQuoteRight } from 'react-icons/fa'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const Carusel = () => {
  const [people, setPeople] = React.useState(list);
  const [currentPerson, setCurrentPerson] = React.useState(0)

  const prevSlide = () => {    
    setCurrentPerson(prevIndex => {
        return prevIndex - 1;
    })
    if(currentPerson <= 0) return setCurrentPerson(people.length -1);
  }

  const nextSlide = () => {
    setCurrentPerson(prevIndex => {
        return prevIndex + 1;
    })
    if(currentPerson >= people.length - 1) return setCurrentPerson(0)
  }

  // Trzeba naprawić logikę przesuwania slidów, teraz całość chodzi tak
  // że w sytuacji odpalenia useEffect, slide przechodzi na koniec

  React.useEffect(() => {
    setInterval(() => {
        nextSlide();
    }, 5000);
  }, [currentPerson])

  return (
    <section className='slider-container'>
      {people.map((person, personIndex) => {
        const { id, image, name, title, quote } = person;

        return (
            <article 
                className='slide' 
                style={{ 
                    transform: `translateX(${100 * (personIndex - currentPerson)}%)`, 
                    opacity: personIndex === currentPerson ? 1 : 0,
                    visibility: personIndex === currentPerson ? 'visible' : 'hidden'
                }} 
                key= {id}
            >
            <img src={image} alt={name} className='person-img' />
            <h5 className='name'>{name}</h5>
            <p className='title'>{title}</p>
            <p className='quote'>{quote}</p>
            <FaQuoteRight className='icon' />
            </article>
        )
      })}

      <button 
        type='button' 
        className='prev' 
        onClick={prevSlide}
      >
        <FiChevronLeft />
      </button>

      <button 
        type='button' 
        className='next' 
        onClick={nextSlide}
      >
        <FiChevronRight />
      </button>
    </section>
  )
}

export default Carusel
