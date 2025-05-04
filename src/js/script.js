'use strict';

document.addEventListener("DOMContentLoaded", function () {
    // Инициализация GLightbox
    const lightbox = GLightbox({
        selector: 'img[data-glightbox]',
    });

    const images = document.querySelectorAll('img.glightbox');
    images.forEach(image => {
        image.onclick = function () {
            lightbox.setElements([{
                href: this.src,
            }]);
            lightbox.open();
        };
    });

    // Конец
    const burger = document.querySelector('.header__burger');
    const cross = document.querySelector('.header__cross');
    const menu = document.querySelector('.header__menu');

    // Функция для открытия меню
    function openMenu() {
        menu.style.display = 'flex';
        document.addEventListener('click', clickOutsideMenu);
    }

    // Функция для закрытия меню
    function closeMenu() {
        menu.style.display = 'none';
        document.removeEventListener('click', clickOutsideMenu);
    }

    // Обработчик события для кликов вне меню
    function clickOutsideMenu(event) {
        if (!menu.contains(event.target) && !burger.contains(event.target)) {
            closeMenu();
        }
    }

    burger.addEventListener('click', openMenu);
    cross.addEventListener('click', closeMenu);



    const seeMore = document.querySelector('.section_see-more');
    const projectsNone = document.querySelector('.projects--none');
    const check = document.getElementById('check');
    const sectionSeeMoreText = document.getElementById('section_see-more-text');

    seeMore.addEventListener('click', function () {
        if (getComputedStyle(projectsNone).display === 'none' && sectionSeeMoreText.textContent === 'Посмотреть ещё 3 проекта') {
            projectsNone.style.display = 'flex';
            sectionSeeMoreText.textContent = 'Скрыть';
        } else {
            projectsNone.style.display = 'none';
            sectionSeeMoreText.textContent = 'Посмотреть ещё 3 проекта';
        }
        // Переключение вращения стрелки
        if (check.style.transform === 'rotate(180deg)') {
            check.style.transform = '';
        } else {
            check.style.transform = 'rotate(180deg)';
        }
    });


    // Клик по кружкам и показ выноски
    const circlesSection2 = [
        document.querySelector('.section2_circl-1'),
        document.querySelector('.section2_circl-2'),
        document.querySelector('.section2_circl-3'),
        document.querySelector('.section2_circl-4'),
        document.querySelector('.section2_circl-5')
    ];

    const textElementsSection2 = [
        document.getElementById('section2__text-1'),
        document.getElementById('section2__text-2'),
        document.getElementById('section2__text-3'),
        document.getElementById('section2__text-4'),
        document.getElementById('section2__text-5')
    ];

    const squareElement = document.querySelector('.section2__square');
    const squareElement2 = document.querySelector('.section2__rectangle');  // Этот элемент присутствует только в executeCode3

    const positions = [
        { left: '114px', leftSmall: '86px', leftSmallest: '79px', heightSmallest: '137px' },
        { left: '57px', leftSmall: '44px', leftSmallest: '36px', heightSmallest: '137px' },
        { left: '165px', leftSmall: '133px', leftSmallest: '108px', heightSmallest: '156px' },
        { left: '293px', leftSmall: '239px', leftSmallest: '190px', heightSmallest: '137px' },
        { left: '368px', leftSmall: '303px', leftSmallest: '241px', heightSmallest: '137px' }
    ];

    function executeCode(screenWidth) {
        circlesSection2.forEach((circle, index) => {
            circle.addEventListener('click', () => {
                textElementsSection2.forEach((textElem, textIndex) => {
                    textElem.style.display = textIndex === index ? 'block' : 'none';
                });

                if (screenWidth <= 949 && screenWidth >= 510) {
                    squareElement.style.left = positions[index].left;
                } else if (screenWidth < 510 && screenWidth >= 424) {
                    squareElement.style.left = positions[index].leftSmall;
                } else if (screenWidth < 424) {
                    squareElement.style.left = positions[index].leftSmallest;
                    if (squareElement2) {
                        squareElement2.style.height = positions[index].heightSmallest;
                    }
                }
            });
        });
    }

    function checkWidth() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 949 && screenWidth >= 510) {
            executeCode(screenWidth); // invoke with current screen width
        } else if (screenWidth < 510 && screenWidth >= 424) {
            executeCode(screenWidth); // invoke with current screen width
        } else if (screenWidth < 424) {
            executeCode(screenWidth); // invoke with current screen width
        }
    }

    // Проверка ширины экрана при загрузке страницы
    checkWidth();

    // Добавление обработчика события для изменения размера окна
    window.addEventListener('resize', checkWidth);



    // -----КАРУСЕЛЬ-----
    const carouselItems = Array.from(document.querySelectorAll('.section4__carousel--photo'));
    let activeIndex = carouselItems.findIndex(item => item.id === 'carousel__active');

    if (activeIndex === -1) {
        activeIndex = 0;
        carouselItems[activeIndex].id = 'carousel__active';
    }

    const circles = Array.from(document.querySelectorAll('.section4__carousel--circles div'));

    function updateClasses() {
        const totalItems = carouselItems.length;
        const leftIndex = (activeIndex - 1 + totalItems) % totalItems;
        const rightIndex = (activeIndex + 1) % totalItems;

        carouselItems.forEach(item => {
            item.id = ''; // Удаляем все значения ID
            // Удаляем стили для всех элементов
            item.children[0].style.width = '';
            item.children[0].style.height = '';
            if (item.children[0].nextElementSibling) {
                item.children[0].nextElementSibling.style.display = '';
            }
        });

        carouselItems[activeIndex].id = 'carousel__active';
        carouselItems[leftIndex].id = 'section4__carousel--left';
        carouselItems[rightIndex].id = 'section4__carousel--right';

        // Добавим логику выбора размеров в зависимости от ширины экрана
        const screenWidth = window.innerWidth;
        const activeItemChildren = carouselItems[activeIndex].children;
        if (activeItemChildren.length > 0) {
            if (screenWidth > 868) {
                activeItemChildren[0].style.width = '588px';
                activeItemChildren[0].style.height = '342px';
            } else if (screenWidth >= 767) {
                activeItemChildren[0].style.width = '521px';
                activeItemChildren[0].style.height = '303px';
            }
            activeItemChildren[0].nextElementSibling.style.display = 'flex';
        }

        // Круги навигации
        circles.forEach(circle => {
            circle.id = ''; // Удаляем все значения ID
        });

        circles[activeIndex].id = 'circles--background';
    }

    updateClasses();

    function handleLeftClick() {
        activeIndex = (activeIndex - 1 + carouselItems.length) % carouselItems.length;
        updateClasses();
    }

    function handleRightClick() {
        activeIndex = (activeIndex + 1) % carouselItems.length;
        updateClasses();
    }

    const leftButton = document.querySelector('.section4__left');
    const rightButton = document.querySelector('.section4__right');

    if (leftButton) {
        leftButton.addEventListener('click', handleLeftClick);
    }

    if (rightButton) {
        rightButton.addEventListener('click', handleRightClick);
    }

    // Переменные для отслеживания начальной и конечной позиции свайпа
    let startX = 0;
    let endX = 0;
    const threshold = 50;  // Порог для срабатывания свайпа (50 пикселей)

    // Функция, вызываемая при начале касания
    function handleTouchStart(event) {
        // Запоминаем начальную позицию касания
        startX = event.touches[0].clientX;
    }

    // Функция, вызываемая при движении пальца по экрану
    function handleTouchMove(event) {
        // Запоминаем текущую позицию касания
        endX = event.touches[0].clientX;
    }

    // Функция, вызываемая при завершении касания
    function handleTouchEnd() {
        // Проверяем разницу между начальной и конечной позицией касания
        if (startX - endX > threshold) {
            handleRightClick();
        } else if (endX - startX > threshold) {
            handleLeftClick();
        }
    }

    const carouselContainer = document.querySelector('.section4__container');

    // Добавляем обработчики событий касания к контейнеру слайдера
    if (carouselContainer) {
        // Следим за началом касания
        carouselContainer.addEventListener('touchstart', handleTouchStart);
        // Следим за движением пальца по экрану
        carouselContainer.addEventListener('touchmove', handleTouchMove);
        // Следим за окончанием касания
        carouselContainer.addEventListener('touchend', handleTouchEnd);
    }


    //-------------- Прокручивание к нужному блоку---------------
    function scrollToSection() {
        const targetSection = document.querySelector(".section6");
        targetSection.scrollIntoView({ behavior: "smooth" });
    }

    const moreDetailsButton = document.getElementById("button_moredetails");
    const consultationButtons = document.querySelectorAll(".button_consultation");

    moreDetailsButton.addEventListener("click", scrollToSection);

    consultationButtons.forEach(function (button) {
        button.addEventListener("click", scrollToSection);
    });

    // ----------------ДЛЯ СКАЧИВАНИЯ ПДФ---------------
    function downloadFile() {
        const fileUrl = "https://avidreaders.ru/api/get.php?b=353742&f=epub";
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = "";
        link.click();
    }

    const downloadButtons = document.querySelectorAll(".button--transparent");

    downloadButtons.forEach(function (button) {
        button.addEventListener("click", downloadFile);
    });

    // Для анимации блоков
    new WOW().init();


    // ДЛЯ УВЕЛИЧЕНИЯ ИЗОБРАЖЕНИЙ
    $(document).ready(function () {
        $('.image-link').magnificPopup({ type: 'image' });
    });

    $('.parent-container').magnificPopup({
        delegate: 'a',
        type: 'image'
    });


    // ВАЛИДАЦИЯ ФОРМЫ
    const form = document.getElementById('consultationForm');
    const nameInput = form.querySelector('input[name="name"]');
    const phoneInput = form.querySelector('input[name="phone"]');
    const agreementCheckbox = form.querySelector('input[name="agreement"]');
    const label = document.getElementById('label');
    const formCheck = form.querySelector('.form__check');
    const nameError = nameInput.nextElementSibling;
    const phoneError = phoneInput.nextElementSibling;
    const agreementError = form.querySelector('.agreement-error');
    const button_section6 = form.querySelector('button.section6__button');
    const formTitle = document.getElementById('formTitle');

    // Обработка нажатия на кнопку отправки формы
    button_section6.addEventListener('click', function () {
        let valid = true;

        // Проверка ввода имени
        if (nameInput.value.trim() === '') {
            nameInput.style.borderColor = 'red';
            nameError.style.display = 'block';
            valid = false;
        } else {
            nameInput.style.borderColor = '';
            nameError.style.display = 'none';
        }

        // Проверка ввода телефона
        if (phoneInput.value.trim() === '') {
            phoneInput.style.borderColor = 'red';
            phoneError.style.display = 'block';
            valid = false;
        } else {
            phoneInput.style.borderColor = '';
            phoneError.style.display = 'none';
        }

        // Проверка чекбокса
        if (!agreementCheckbox.checked) {
            agreementError.style.display = 'block';
            valid = false;
        } else {
            agreementError.style.display = 'none';
        }

        if (valid) {
            let url = 'https://testologia.ru/checkout?name=' + nameInput.value;

            $.ajax({
                method: "POST",
                url: url,
                data: { name: nameInput.value }
            })
                .done(function (msg) {
                    let result = msg;

                    if (result.success && result.hasOwnProperty('success')) {
                        form.style.display = 'none';
                        formTitle.textContent = "Спасибо, мы свяжемся с вами в ближайшее время!";

                        // Очищаем и возвращаем форму
                        setTimeout(function () {
                            form.reset();
                            form.style.display = 'block';
                            formTitle.textContent = 'Получите индивидуальную консультацию';
                        }, 2000);
                    } else {
                        alert("Некорректные данные");
                    }
                });


        }
    });

    // Обработка нажатия на лейбл для соглашения
    label.addEventListener('click', function (event) {
        event.preventDefault();

        // Переключаем состояние чекбокса
        agreementCheckbox.checked = !agreementCheckbox.checked;

        // Переключаем отображение стилизованного чекбокса и ошибки
        formCheck.style.display = agreementCheckbox.checked ? 'block' : 'none';
        agreementError.style.display = agreementCheckbox.checked ? 'none' : 'block';
    });


    // -------------------------POPAP---------------------

    const overlay = document.querySelector('.overlay');
    const closeButton = document.querySelector('.popap img');
    const nameInputPopap = document.getElementById('name_popap');
    const phoneInputPopap = document.getElementById('tel_popap');
    const submitButton = document.querySelector('.button_popap');
    const errorMessageName = document.querySelector('#name_popap + .error-message_popap');
    const errorMessagePhone = document.querySelector('#tel_popap + .error-message_popap');
    const sectionButton = document.getElementById('section7__button');


    sectionButton.addEventListener('click', function () {
        overlay.style.display = 'flex';
    });

    // Закрытие попапа
    closeButton.addEventListener('click', function () {
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', function (event) {
        if (event.target === overlay) {
            overlay.style.display = 'none';
        }
    });

    submitButton.addEventListener('click', function () {
        let isValid = true;

        // Проверка поля имени
        if (nameInputPopap.value.trim() === '') {
            nameInputPopap.style.borderColor = 'red';
            errorMessageName.style.display = 'block';
            isValid = false;
        } else {
            nameInputPopap.style.borderColor = '';
            errorMessageName.style.display = 'none';
        }

        // Проверка поля телефона
        if (phoneInputPopap.value.trim() === '') {
            phoneInputPopap.style.borderColor = 'red';
            errorMessagePhone.style.display = 'block';
            isValid = false;
        } else {
            phoneInputPopap.style.borderColor = '';
            errorMessagePhone.style.display = 'none';
        }

        if (isValid) {
            $.ajax({
                method: "POST",
                url: url,
                data: { name: nameInputPopap.value }
            })
                .done(function (message) {
                    let result = message;

                    if (result.success && result.hasOwnProperty('success')) {
                        nameInputPopap.style.display = 'none';
                        phoneInputPopap.style.display = 'none';
                        submitButton.style.display = 'none';
                        const tittlePopap = document.getElementById('h3');
                        tittlePopap.textContent = "Спасибо, мы свяжемся с вами в ближайшее время!";
                    } else {
                        alert("Некорректные данные");
                    }
                });



            // let url = 'https://testologia.ru/checkout?name=' + nameInput.value;
            // let http = new XMLHttpRequest();
            // http.open('post', url);
            // http.send();

            // http.onreadystatechange = function () {
            //     if (http.readyState === 4 && http.status === 200) {
            //         let result = null;
            //         try {
            //             result = JSON.parse(http.responseText);
            //         } catch (e) { }

            //         if (result && result.success && result.hasOwnProperty('success')) {
            //             nameInputPopap.style.display = 'none';
            //             phoneInputPopap.style.display = 'none';
            //             submitButton.style.display = 'none';
            //             const tittlePopap = document.getElementById('h3');
            //             tittlePopap.textContent = "Спасибо, мы свяжемся с вами в ближайшее время!";
            //         } else {
            //             alert("Некорректные данные");
            //         }
            //     }
            // }



        }
    });










});

