const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index +'px';
}

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-'+targetSlide.style.left+')';
    currentSlide.classList.remove('carousel__slide--current');
    targetSlide.classList.add('carousel__slide--current');
}
const updateNav = (currentButton, targetButton) => {
    currentButton.classList.remove('carousel__indicator--current');
    targetButton.classList.add('carousel__indicator--current');
}

const showHideArrows = (targetIndex, prevButton, nextButton) => {
    if (targetIndex === 0){
        prevButton.classList.add('is-hidden')
        nextButton.classList.remove('is-hidden')
    } else if (targetIndex === slides.length - 1){
        prevButton.classList.remove('is-hidden')
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden')
        nextButton.classList.remove('is-hidden')
    }
}
//set slide position
slides.forEach(setSlidePosition);

//next button 
const nextButton = document.querySelector('.carousel__button--next');

nextButton.addEventListener('click', e => {
    const currentSlide = document.querySelector('.carousel__slide--current');
    const nextSlide = currentSlide.nextElementSibling;
    const currentButton = document.querySelector('.carousel__indicator--current');
    const nextDot = currentButton.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateNav(currentButton, nextDot);
    showHideArrows(nextIndex, prevButton, nextButton);
})

//previous button
const prevButton = document.querySelector('.carousel__button--prev');

prevButton.addEventListener('click', e => {
    const currentSlide = document.querySelector('.carousel__slide--current');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = document.querySelector('.carousel__indicator--current');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    updateNav(currentDot, prevDot);
    showHideArrows(prevIndex, prevButton, nextButton);
})

//nav 
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

dotsNav.addEventListener('click', e => {
    targetButton = e.target.closest('button');
    if (!targetButton) {
        return
    }

    const currentSlide = document.querySelector('.carousel__slide--current');
    const targetIndex = dots.findIndex(dot => dot === targetButton);
    const targetSlide = slides[targetIndex];
    const currentButton = document.querySelector('.carousel__indicator--current');
    
    moveToSlide(track, currentSlide, targetSlide);
    updateNav(currentButton, targetButton);
    showHideArrows(targetIndex, prevButton, nextButton);
})


