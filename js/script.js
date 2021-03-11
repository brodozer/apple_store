'use strict';

const data = [
    {
        name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
        img: 'img/iPhone-graphite.png',
        memoryRom: 128,
        price: 99990,
    },
    {
        name: 'Смартфон Apple iPhone 12 Pro 128GB Silver',
        img: 'img/iPhone-silver.png',
        memoryRom: 128,
        price: 99990,
    },
    {
        name: 'Смартфон Apple iPhone 12 Pro 256GB Pacific Blue',
        img: 'img/iPhone-blue.png',
        memoryRom: 256,
        price: 109990,
    }
];

const removeClass = (elem, className = 'active') => {
    elem.classList.remove(className);
}
const addClass = (elem, className = 'active') => {
    elem.classList.add(className);
}

const tabs = () => {
    const cardDetailChangeElems = document.querySelectorAll('.card-detail__change');
    const cardDetailsTitleElem = document.querySelector('.card-details__title');
    const cardImagItemElem = document.querySelector('.card__image_item');
    const cardDescriptionMemory = document.querySelector('.description__memory');
    const cardDetailsPrice = document.querySelector('.card-details__price');
    
    const hide = (arr, func) => {
        arr.forEach(el => {
            func(el);
        });
    }

    const injectText = (i) => { 
        cardDetailsTitleElem.textContent = data[i].name;
        cardImagItemElem.src = data[i].img;
        cardImagItemElem.alt = data[i].name;
        cardDescriptionMemory.textContent = `Встроенная память (ROM) ${data[i].memoryRom} ГБ`;
        cardDetailsPrice.textContent = `${data[i].price}₽`;
    }
    
    cardDetailChangeElems.forEach((e, i) => {
        e.addEventListener('click', (event) => {
            hide(cardDetailChangeElems, removeClass);
            addClass(event.target);
            injectText(i);
        })
    })
}

const accordion = () => {
    const characteristicsListElem = document.querySelector('.characteristics__list');
    const characteristicsItemElems = document.querySelectorAll('.characteristics__item');

    const hideAll = (arr, func) => {
        arr.forEach(el => {
            if (el.classList.contains('active')) {
                func(el);
                el.children[1].style.height = '';
            }
        });
    }

    const dropDown = (btn) => {
        let parent = btn.closest('.characteristics__item');
        let child = parent.querySelector('.characteristics__description');
        if (parent.classList.contains('active')) {
            child.style.height = '';
            removeClass(parent);
        } else {
            hideAll(characteristicsItemElems, removeClass);
            child.style.height = `${child.scrollHeight}px`;
            addClass(parent);
        }
    }

    characteristicsListElem.addEventListener('click', e => {
        dropDown(e.target);
    });

}

const modal = () => {
    const cardBtnElems = document.querySelectorAll('.card_btn');
    const modal = document.querySelector('.modal');
    const modalSubtitleElem = document.querySelector('.modal__subtitle');

    cardBtnElems.forEach(elem => {
        elem.addEventListener('click', e => {
            let target = e.target;
            let text = target.textContent;
            modalSubtitleElem.textContent = text;
            addClass(modal, 'open');
        })
    })

    modal.addEventListener('click', e => {
        let target = e.target;
        if (target.classList.contains('modal') || target.classList.contains('modal__close')) {
            removeClass(modal, 'open');
        }
    })

    document.addEventListener("keydown", e => {
        if (modal.classList.contains('open') && e.which == 27) {
            //removeClass(modal, 'open');
            modal.click();
        }
    })
}

tabs();
accordion();
modal();


