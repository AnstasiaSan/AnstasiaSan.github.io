function initMenuHamburger () {

    const buttonHamburger = document.querySelector('.menu-hambuger');
    buttonHamburger.addEventListener('click', ()=> {
        const menuVisible = document.querySelector('.header-content__menu');
        const headerBackground = document.querySelector('.header-content')
        const buttonHamburgerActive = document.querySelector('.menu-hambuger__button');
        const contentWhenMenuHambugerOpened = document.querySelector('html')
        const sliderDotts = document.querySelector('.slider-dots')

        menuVisible.classList.toggle('menu-visible');
        buttonHamburgerActive.classList.toggle('button-active');
        contentWhenMenuHambugerOpened.classList.toggle('menu-hambuger-opened');
        headerBackground.classList.toggle('menu-visible')
        sliderDotts.classList.toggle('menu-visible')
    })
}

initMenuHamburger ()


function initLowerSlider () {

    const slidesToScroll = 1
    let position = 0

    const slider = document.querySelector('.projects-slider')
    const slidesContainer = document.querySelector('.projects-slider__slides')
    const slides = document.querySelectorAll('.projects-slider__slide')
    const buttonPrev = document.querySelector('.button-left-arrow')
    const buttonNext = document.querySelector('.button-right-arrow')

    let screenWidth = slider.clientWidth
    let slideMinWidth
    let slidesToShow 

    if (screenWidth <= 381) {
        slideMinWidth = screenWidth
        slidesToShow = 1
    } else {
        slideMinWidth = 381
        slidesToShow = Math.trunc(screenWidth/slideMinWidth)
    }

    let slideWidth = screenWidth/slidesToShow
    const slidesCount = slides.length
    slides.forEach(slide => {
        slide.style.minWidth = `${slideWidth}px`
    })

    const setPosition = () => {
        slidesContainer.style.transform = `translateX(${position}px)`
    }

    function ArrowPrevDisabled () {
        if (position === 0) {
            buttonPrev.classList.add('disabled')
        }
    }

    function ArrowNextDisabled () {
        if (position <= -(slidesCount - slidesToShow) * slideWidth) {
            buttonNext.classList.add('disabled')
        } 
    }

    const movePosition = slideWidth * slidesToScroll

    buttonPrev.addEventListener('click',() => {
        const unscrolledSlidesCount = Math.abs (position/slideWidth)
        position += unscrolledSlidesCount >= slidesToScroll
             ? movePosition
             : unscrolledSlidesCount * slideWidth
        setPosition ()
        ArrowPrevDisabled ()
        buttonNext.classList.remove('disabled')
    })
    
    buttonNext.addEventListener('click',() => {
        let unscrolledSlidesCount = slidesCount - (Math.abs(position) + slidesToShow * slideWidth) / slideWidth
        position -= unscrolledSlidesCount >= slidesToScroll
            ? slidesToScroll * slideWidth
            : unscrolledSlidesCount * slideWidth
        setPosition ()
        ArrowNextDisabled ()
        buttonPrev.classList.remove('disabled')
    }) 
}

initLowerSlider ()

window.addEventListener('resize', () => {
    initLowerSlider ()
})


function initHeaderSlider () {

    let slideIndex = 1;
    showHeaderSlides(slideIndex);

    function nextSlide() {
        showHeaderSlides(slideIndex += 1);
    }

    function currentSlide(n) {
        showHeaderSlides(slideIndex = n);
    }

    function showHeaderSlides(n) {
        let i;
        const slides = document.querySelectorAll('.header-slider__slide')
        const dots = document.querySelectorAll('.slider-dots__item');

        if (n > slides.length) {
        slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace('dots-active', '');
            dots[i].addEventListener ('click', function(idx){
                return function(){
                    currentSlide(idx+1);
                }
            }(i)) 
        }
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dots-active');
    }

    setInterval(nextSlide, 3000);
}

initHeaderSlider ()
    

function initAnimScroll () {

    const animItems = document.querySelectorAll('.anim-items');
    const animItemsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
                observer.unobserve(entry.target);
            }
        })  
        }, {
        threshold: 0.2
    });
    animItems.forEach((animItem) => animItemsObserver.observe(animItem));
}

initAnimScroll ()


function mediaQueries () {

    const logo = document.querySelector('.logo-white')
    const screenWidthChange1200 = window.matchMedia('(max-width: 1200px)')

    function changeSrc(e) {
        if (e.matches) {
            logo.src = 'images/logo-black.png'
        } else {
            logo.src = 'images/logo-white.png'
        }
    }

    screenWidthChange1200.addListener(changeSrc)
    changeSrc(screenWidthChange1200)
}

mediaQueries ()
