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

    const isAnyBurgerOpen = () => {
        return [...burgers].some(burger => burger.classList.contains('active'));
    };
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
    button.addEventListener('click', (e) => {
        e.stopPropagation();

        if (isAnyBurgerOpen()) {
            closeBurger();
        } else {
            openBurger();
        }
    });
    overlay.addEventListener('click', () => {
        closeBurger();
        closeAllSearches();
    });
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


    // поиск
    const searches = document.querySelectorAll('.header__search');

    function closeAllSearches() {
        searches.forEach((search) => {
            const input = search.querySelector('input');
            const dropdown = search.querySelector('.header__search-block');
            if (dropdown) {
                dropdown.classList.remove('active');
            }
            if (input) {
                input.blur();
            }
        });
        if (!isAnyBurgerOpen()) {
            body.classList.remove('hidden');
            overlay.classList.remove('active');
        }
    }
    if (searches.length) {
        searches.forEach((search) => {
            const input = search.querySelector('input');
            const dropdown = search.querySelector('.header__search-block');
            if (!input || !dropdown) return;
            input.addEventListener('focus', () => {
                closeAllSearches();
                dropdown.classList.add('active');
                const searchInsideBurger = [...burgers].some(burger => burger.contains(search));
                if (!(searchInsideBurger && isAnyBurgerOpen())) {
                    body.classList.add('hidden');
                    overlay.classList.add('active');
                }
            });
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeAllSearches();
                }
            });
        });
        document.addEventListener('click', (e) => {
            const clickInsideSearch = [...searches].some(search => search.contains(e.target));
            if (!clickInsideSearch) {
                closeAllSearches();
            }
        });
    }








})