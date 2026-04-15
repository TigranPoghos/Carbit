document.addEventListener("DOMContentLoaded", function(){



    //переключение языка
    const langButtons = document.querySelectorAll('.header__lang-item');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });



    //слайдер сервисов
    let serviceSlider = null;
    function initServiceSlider() {
        const slider = document.querySelector('.service-swiper');
        if (!slider) return;
        if (typeof Swiper === 'undefined') return;

        const wrapper = slider.querySelector('.swiper-wrapper');
        const slides = slider.querySelectorAll('.swiper-slide');
        const pagination = slider.querySelector('.service__pagination');

        if (!wrapper || !slides.length) return;

        if (window.innerWidth <= 768 && !serviceSlider) {
            serviceSlider = new Swiper(slider, {
                slidesPerView: 'auto',
                spaceBetween: 10,
                speed: 500,
                pagination: pagination ? {
                    el: pagination,
                    clickable: true,
                } : undefined,
            });
        }

        if (window.innerWidth > 768 && serviceSlider) {
            serviceSlider.destroy(true, true);
            serviceSlider = null;
        }
    }
    window.addEventListener('load', initServiceSlider);
    window.addEventListener('resize', initServiceSlider);





    //бургер
    const button = document.querySelector('.header__burger');
    const burgers = document.querySelectorAll('.burger');
    const overlay = document.querySelector('.opacite');
    const closeButtons = document.querySelectorAll('.burger__close');
    const body = document.body;

    if (!button || !burgers.length || !overlay) return;

    const openBurger = () => {
        button.classList.add('active');
        burgers.forEach(burger => burger.classList.add('active'));
        overlay.classList.add('active');
        body.classList.add('hidden');
    };

    const closeBurger = () => {
        button.classList.remove('active');
        burgers.forEach(burger => burger.classList.remove('active'));
        overlay.classList.remove('active');
        body.classList.remove('hidden');
    };

    const isAnyBurgerOpen = () => {
        return [...burgers].some(burger => burger.classList.contains('active'));
    };

    button.addEventListener('click', (e) => {
        e.stopPropagation();

        if (isAnyBurgerOpen()) {
            closeBurger();
        } else {
            openBurger();
        }
    });

    overlay.addEventListener('click', closeBurger);

    closeButtons.forEach(closeBtn => {
        closeBtn.addEventListener('click', closeBurger);
    });

    document.addEventListener('click', (e) => {
        const clickInsideAnyBurger = [...burgers].some(burger => burger.contains(e.target));
        const clickOnButton = button.contains(e.target);

        if (isAnyBurgerOpen() && !clickInsideAnyBurger && !clickOnButton) {
            closeBurger();
        }
    });






})