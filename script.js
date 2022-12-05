let best_products = [{"name":"Французкий  Макарун с малиной","description": "1.Две половинки хрустящего миндального печенья с малиновой прослойкой","price": "500тг/шт","img": "./images/img-2.png"},
                     {"name":"Французкий  Макарун с малиной","description": "2.Две половинки хрустящего миндального печенья с малиновой прослойкой","price": "500тг/шт","img": "./images/img-3.jpg"},
                     {"name":"Французкий  Макарун с малиной","description": "3.Две половинки хрустящего миндального печенья с малиновой прослойкой","price": "500тг/шт","img": "./images/img-3.jpg"},
                     {"name":"Французкий  Макарун с малиной","description": "4.Две половинки хрустящего миндального печенья с малиновой прослойкой","price": "500тг/шт","img": "./images/img-2.png"},
                     {"name":"Французкий  Макарун с малиной","description": "5.Две половинки хрустящего миндального печенья с малиновой прослойкой","price": "500тг/шт","img": "./images/img-2.png"},
                     {"name":"Французкий  Макарун с малиной","description": "6.Две половинки хрустящего миндального печенья с малиновой прослойкой","price": "500тг/шт","img": "./images/img-3.jpg"},];

let nav;
let menu_bar;
let  menu_back;

let product_left_img, product_right_img, product_back_img;
let product_next, product_prev;
let products_info_items;
let pagination;
let position = 0;
let nextItem = 1;
let slidesToShow = 2;

let dessert_container, track, dessert_items;
let btnPrev, btnNext;
let p = 0;
let slideToShow = 4;
const slideToScroll = 1;
let itemCount, itemWidth, movePosition, rightHiddenSlides;

let w = window.innerWidth;
if(w <= 750)slideToShow = 3;
if(w <= 600)slideToShow = 2;
if(w <= 450)slideToShow = 1;

function getElement(selector, root = null){
    return (root == null) ? document.querySelector(selector) : root.querySelector(selector);
}
function declare(){
    nav =  getElement("nav");
    menu_bar = getElement(".menu-bar");
    menu_back = getElement(".menu-back");

    products_info_items = document.querySelectorAll(".products__info > div");
    product_left_img = getElement(".product__img1").firstChild;
    product_right_img = getElement(".product__img2").firstChild;
    product_back_img = getElement(".product__back__img > img");
    pagination = getElement(".pagination");
    product_next = getElement(".product__next");
    product_prev = getElement(".product__prev");

    dessert_items = document.querySelectorAll(".slider__item");
    dessert_container = getElement(".slider__container");
    track = getElement(".slider__track");
    btnPrev = getElement(".btn__prev");
    btnNext = getElement(".btn__next");

    itemCount = dessert_items.length;
    itemWidth = dessert_container.clientWidth /  slideToShow;
    movePosition = slideToScroll * itemWidth;
    rightHiddenSlides = (itemCount - slideToShow) * itemWidth;
    dessert_items.forEach((item) => {
        item.style.minWidth = `${itemWidth}px`;
    });

}
declare();

function createObj(){
    //create pagination
    for(let i = 0; i < best_products.length/slidesToShow; i++){
        const div = document.createElement("div");
        pagination.append(div);
    }
}
createObj();

function slider(){
    //set product imgs
    product_left_img.src = best_products[position]['img'];
    product_right_img.src = best_products[nextItem]['img'];
    product_back_img.src = best_products[position]['img'];
    
    //set pagination
    for(let i = 0; i < best_products.length/slidesToShow; i++){
        let bool = pagination.children[i]===pagination.children[Math.floor(position/slidesToShow)];
        pagination.children[i].classList.toggle('active', bool);
    }

    //set inner conten
    setText(0, position);
    setText(1, nextItem);
    function setText(i, index){
        getElement('.product__name', products_info_items[i]).innerText = best_products[index]["name"];
        getElement('.product__description', products_info_items[i]).innerText = best_products[index]["description"];
        getElement('.product__price',  products_info_items[i]).innerText = best_products[index]["price"];
    }
}
slider();

const setPosition = () => {
    track.style.transform = `translateX(${p}px)`;
}

function events(){
    menu_bar.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
    menu_back.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
    product_next.addEventListener("click", () => {
        position+=slidesToShow;
        nextItem = position+1;
        if(nextItem < best_products.length){
            slider();
        } else if(position == best_products.length){
            position=0;
            nextItem = position+1;
            slider();
        }else if(position == best_products.length-1){
            nextItem = 0;
            slider();
            position = -1;
        }
       
    });
    product_prev.addEventListener("click", () => {
        if(position == 0){
            nextItem = best_products.length - 1;
            position = nextItem - 1;
            console.log(position)
            slider();
        }else if(position==1){
            nextItem = 0;
            position = best_products.length - 1;
            slider();
        }else{
            position -= slidesToShow;
            nextItem  = position + 1;
            slider();
        }
    });
    btnNext.addEventListener('click', () => {
        p -= movePosition
        if (p <= -rightHiddenSlides) {
            p = -rightHiddenSlides
        }
        setPosition()
       
    });
    btnPrev.addEventListener('click', () => {
        p += movePosition
        if (p >= 0) {
            p = 0
        }
        setPosition()
      
    });

}
events();


