document.addEventListener('DOMContentLoaded', function () {

    const body = document.body;
    const overlay = document.querySelector('.opacite');



    // переключение языка
    const langButtons = document.querySelectorAll('.header__lang-item');

    if (langButtons.length) {
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                langButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }



    // слайдер сервисов
    let serviceSlider = null;

    function initServiceSlider() {
        const slider = document.querySelector('.service-swiper');
        if (!slider || typeof Swiper === 'undefined') return;

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

    initServiceSlider();
    window.addEventListener('resize', initServiceSlider);




    // поиск
    const searches = document.querySelectorAll('.header__search');

    function isAnyBurgerOpen() {
        const burgers = document.querySelectorAll('.burger');
        return [...burgers].some(burger => burger.classList.contains('active'));
    }

    function closeAllSearches() {
        if (!searches.length) return;

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

        if (!isAnyBurgerOpen() && overlay) {
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

                const burgers = document.querySelectorAll('.burger');
                const searchInsideBurger = [...burgers].some(burger => burger.contains(search));

                if (!(searchInsideBurger && isAnyBurgerOpen()) && overlay) {
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




    // бургер
    const burgerButton = document.querySelector('.header__burger');
    const burgers = document.querySelectorAll('.burger');
    const closeButtons = document.querySelectorAll('.burger__close');

    if (burgerButton && burgers.length && overlay) {
        const openBurger = () => {
            burgerButton.classList.add('active');
            burgers.forEach(burger => burger.classList.add('active'));
            overlay.classList.add('active');
            body.classList.add('hidden');
        };

        const closeBurger = () => {
            burgerButton.classList.remove('active');
            burgers.forEach(burger => burger.classList.remove('active'));

            if (!searches.length || ![...searches].some(search => {
                const dropdown = search.querySelector('.header__search-block');
                return dropdown && dropdown.classList.contains('active');
            })) {
                overlay.classList.remove('active');
                body.classList.remove('hidden');
            }
        };

        burgerButton.addEventListener('click', (e) => {
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
            const clickOnButton = burgerButton.contains(e.target);

            if (isAnyBurgerOpen() && !clickInsideAnyBurger && !clickOnButton) {
                closeBurger();
            }
        });
    }




    // цены
    const tabs = document.querySelectorAll('.price__tabs-btn');
    const asides = document.querySelectorAll('.price__aside');
    const tables = document.querySelectorAll('.price__content-table');

    function isMobile() {
        return window.innerWidth <= 768;
    }

    function initPricing() {
        if (!tabs.length || !asides.length || !tables.length) return;

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
                    table.classList.toggle(
                        'active',
                        table.dataset.table === firstTableName &&
                        table.closest('.price__bottom')?.querySelector(`.price__aside[data-type="${type}"]`)
                    );
                });
            }
        });
    }

    if (tabs.length && asides.length && tables.length) {
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
                            table.classList.toggle(
                                'active',
                                table.dataset.table === firstTableName &&
                                table.closest('.price__bottom')?.querySelector(`.price__aside[data-type="${type}"]`)
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

                    const relatedTables = Array.from(tables).filter(t =>
                        t.closest('.price__bottom')?.querySelector(`.price__aside[data-type="${type}"]`)
                    );

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

        initPricing();
        window.addEventListener('resize', initPricing);
    }




    // маска телефона
    if (typeof $ !== 'undefined' && $.fn.mask) {
        $.fn.setCursorPosition = function (pos) {
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
            .on('click focus', function (e) {
                const pos = this.selectionStart;

                if (pos < 6) {
                    e.preventDefault();
                    $(this).setCursorPosition(5);
                }
            })
            .on('keydown', function (e) {
                const pos = this.selectionStart;

                if (pos <= 6 && (e.key === 'Backspace' || e.key === 'Delete')) {
                    e.preventDefault();
                }
            });
    }




    // вопрос-ответ
    const faqWrapper = document.querySelector('.faq__wrapper');

    if (faqWrapper) {
        const faqItems = faqWrapper.querySelectorAll('.faq__item');

        if (faqItems.length) {
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
        }
    }




    // кнопки блога
    const blogButtonsWrapper = document.querySelector('.blog__blog-buttons');

    if (blogButtonsWrapper) {
        const blogButtons = blogButtonsWrapper.querySelectorAll('.blog__blog-buttons-item');

        if (blogButtons.length) {
            blogButtons.forEach((button) => {
                button.addEventListener('click', () => {
                    blogButtons.forEach((btn) => {
                        btn.classList.remove('active');
                    });

                    button.classList.add('active');
                });
            });
        }
    }


    
    //Показать еще
    const workBottom = document.querySelector('.blog__blogs');
    const workMoreButton = document.querySelector('.buttonJS');

    if (workBottom && workMoreButton) {

        const workItems = workBottom.querySelectorAll('.work__item');

        // сначала скрываем всё после 6
        workItems.forEach((item, index) => {
            if (index >= 6) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });

        // если карточек больше 6 — показываем кнопку
        if (workItems.length > 6) {
            workMoreButton.classList.add('active');

            workMoreButton.addEventListener('click', () => {
                // показываем все карточки
                workItems.forEach(item => item.classList.add('active'));

                // убираем кнопку
                workMoreButton.classList.remove('active');
            });

        } else {
            // если <= 6 — кнопка не нужна
            workMoreButton.classList.remove('active');
        }
    }






});