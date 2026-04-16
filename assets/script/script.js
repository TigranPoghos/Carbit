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








    //цены
    const tabs = document.querySelectorAll('.price__tabs-btn');
    const asides = document.querySelectorAll('.price__aside');
    const tables = document.querySelectorAll('.price__content-table');
    function isMobile() {
    return window.innerWidth <= 768;
    }
    function initPricing() {
    const firstTab = tabs[0];
    const type = firstTab?.dataset.type;

    tabs.forEach(t => t.classList.remove('active'));
    firstTab?.classList.add('active');

    asides.forEach(aside => {
        aside.classList.toggle('active', aside.dataset.type === type);
        const buttons = aside.querySelectorAll('.price__aside-button');

        if (isMobile()) {
        buttons.forEach(b => b.classList.remove('active'));
        tables.forEach(table => table.classList.remove('active'));
        } else {
        buttons.forEach((b, i) => b.classList.toggle('active', i === 0));
        const firstTableName = buttons[0]?.dataset.table;
        tables.forEach(table => {
            table.classList.toggle('active', table.dataset.table === firstTableName &&
            table.closest('.price__bottom').querySelector(`.price__aside[data-type="${type}"]`)
            );
        });
        }
    });
    }
    tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const type = tab.dataset.type;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        asides.forEach(aside => {
        aside.classList.toggle('active', aside.dataset.type === type);
        const buttons = aside.querySelectorAll('.price__aside-button');

        if (isMobile()) {
            buttons.forEach(b => b.classList.remove('active'));
            tables.forEach(table => table.classList.remove('active'));
        } else {
            buttons.forEach((b, i) => b.classList.toggle('active', i === 0));
            const firstTableName = buttons[0]?.dataset.table;
            tables.forEach(table => {
            table.classList.toggle('active', table.dataset.table === firstTableName &&
                table.closest('.price__bottom').querySelector(`.price__aside[data-type="${type}"]`)
            );
            });
        }
        });
    });
    });
    asides.forEach(aside => {
    const buttons = aside.querySelectorAll('.price__aside-button');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
        const tableName = btn.dataset.table;
        const type = aside.dataset.type;

        const relatedTables = Array.from(tables).filter(t => t.closest('.price__bottom').querySelector(`.price__aside[data-type="${type}"]`));
        const table = relatedTables.find(t => t.dataset.table === tableName);

        if (!table) return;

        if (isMobile()) {
            const isActive = btn.classList.contains('active');
            btn.classList.toggle('active', !isActive);

            if (!isActive) {
            btn.insertAdjacentElement('afterend', table);
            table.classList.add('active');
            } else {
            table.classList.remove('active');
            }
        } else {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            relatedTables.forEach(t => t.classList.toggle('active', t.dataset.table === tableName));
        }
        });
    });
    });
    window.addEventListener('load', initPricing);
    window.addEventListener('resize', initPricing);








    $.fn.setCursorPosition = function(pos) {
        const el = $(this).get(0);
        if (el.setSelectionRange) {
            el.setSelectionRange(pos, pos);
        } else if (el.createTextRange) {
            const range = el.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
        return this;
    };

    $('input[type="tel"]')
    .mask('+358 (999) 999 99 99', { autoclear: false })
    .on('click focus', function(e) {
        const pos = this.selectionStart;

        if (pos < 6) {
            e.preventDefault();
            $(this).setCursorPosition(5);
        }
    })
    .on('keydown', function(e) {
        const pos = this.selectionStart;

        if (pos <= 6 && (e.key === 'Backspace' || e.key === 'Delete')) {
            e.preventDefault();
        }
    });


    



    //вопрос-ответ
    const faqWrapper = document.querySelector('.faq__wrapper');
    if (!faqWrapper) return;
    const faqItems = faqWrapper.querySelectorAll('.faq__item');
    if (!faqItems.length) return;
    faqItems.forEach((item) => {
        const subtitle = item.querySelector('.faq__subtitle');
        if (!subtitle) return;
        item.addEventListener('click', (e) => {
            if (e.target.closest('a, button')) return;

            const isActive = item.classList.contains('active');
            faqItems.forEach((el) => {
                el.classList.remove('active');

                const sub = el.querySelector('.faq__subtitle');
                if (sub) sub.classList.remove('active');
            });
            if (!isActive) {
                item.classList.add('active');
                subtitle.classList.add('active');
            }
        });
    });







})