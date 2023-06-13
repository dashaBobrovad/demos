// import 'style.css';
// import 'swiper.js';

// вынести переменные длины наверх
// вынести поиск по дереву в переменную (чтобы каждый раз не проходиться)
// вынести лгические условия в отдельную переменную (типа последний не последний (мб в апишке есть))
// максимально вынести в ф-и повторяющуюся логику
// отключать логику навигации для мобилы 

const sliderMainSettings = {
  pagination: false,
  spaceBetween: 0,
  slidesPerView: 1,
  autoplay: false,
  loop: false,
  runCallbacksOnInit: true,
  watchOverflow: true,
  centeredSlides: true,
  spaceBetween: 0,
  init: false, // init manually
  effect: "coverflow",
  coverflowEffect: {
    depth: 0,
    modifier: 0,
    rotate: 0,
    scale: 1,
    slideShadows: false,
    stretch: 0,
  },
  breakpoints: {
    // when window width is >= 759px (min-width)
    759: {
      allowTouchMove: false,
      slidesPerView: "auto",
      coverflowEffect: {
        depth: 150,
        modifier: 1,
      },
      spaceBetween: 150,
    },
  },
};

const sliderItemsSettings = {
  loop: false,
  nested: true,
  centeredSlides: false,
  slidesPerView: 1,
  spaceBetween: 0,
  autoplay: false,
  breakpoints: {
    // when window width is >= 759px (min-width)
    759: {
      allowTouchMove: false,
    },
  },
};

class StoriesSlider2 {
  constructor(wrapper) {
    if (!window.history) return false;
    
    // this.param =
    //   (wrapper.getAttribute("data-param") &&
    //     JSON.parse(wrapper.getAttribute("data-param"))) ||
    //   {};

    this.wrapper = wrapper;
    this.delay = 99999; // 20000

    this.sliderMain = false;
    this.sliderItems = [];

    this._createSwiper(wrapper);
    this._delaySliderItems(this.delay);
  }

  _createSwiper(wrapper) {
    console.log('StoriesSlider2')
    const self = this;
    // css переменная с дилеем
    wrapper.style = `--autoplay-delay: ${this.delay}ms`;

    // sliderMain
    // Отдельно задаём навигацию (чтобы настройки слайдеров можно было отдельно от навигации прокидывать в класс)
    sliderMainSettings.navigation = {
      nextEl: wrapper.querySelector(
        ".storiesSlider_arrows .storiesSlider_mainNext"
      ),
      prevEl: wrapper.querySelector(
        ".storiesSlider_arrows .storiesSlider_mainPrev"
      ),
    };
    this.sliderMain = new Swiper(
      wrapper.querySelector(".storiesSlider_main"),
      sliderMainSettings
    );

    // TODO: вынести в отдельную ф-ю и переменные
    this.sliderMain.on("init", () => {
      wrapper
        .querySelectorAll(".storiesSlider_innerWrapper")
        .forEach((item, index) => {
          sliderItemsSettings.pagination = {
            el: item.querySelector(".storiesSlider_innerPagination"),
            type: "bullets",
            clickable: true,
          };

          sliderItemsSettings.navigation = {
            nextEl: wrapper.querySelector(
              ".storiesSlider_arrows .storiesSlider_innerNext"
            ),
            prevEl: wrapper.querySelector(
              ".storiesSlider_arrows .storiesSlider_innerPrev"
            ),
          };

          // Пушим маленькие слайдеры в масив, чтобы иметь к ним доступ
          this.sliderItems.push(new Swiper(item, sliderItemsSettings));

          if (this.sliderMain.activeIndex !== index) {
            this.sliderItems[index].navigation.destroy();
          }

          // try to fix this (its about destroy in init main slides)
          this.sliderItems[0].navigation.prevEl.classList.add(
            "swiper-button-disabled"
          );
        });

      if (this.sliderItems[this.sliderMain.activeIndex].slides.length === 1) {
        this.sliderMain.navigation.nextEl.classList.add("show");
        this.sliderItems[0].navigation.nextEl.classList.add(
          "swiper-button-disabled"
        );
      }
    });

    this.sliderMain.init();
  }

  _delaySliderItems() {
    // Массив интервалов (чтобы иметь возможность чистить их)
    const setTimeoutList = [];

    // Рекурсивная функция которая
    // ИЛИ переключает маленький слайдер и вызывает сама себя,
    // ИЛИ переключает большой слайдер
    const slideChangeInterval = () => {
      const timeout = setTimeout(() => {
        if (this.sliderItems[this.sliderMain.activeIndex].isEnd) {
          this.sliderMain.slideNext();
        } else {
          this.sliderItems[this.sliderMain.activeIndex].slideNext();
          slideChangeInterval();
        }
      }, this.delay);

      const closeTimeout = setTimeout(() => {
        if (this.sliderMain.isEnd) {
          uPopup.closeAll();
        }
      }, this.delay);

      setTimeoutList.push(timeout, closeTimeout);
    };

    // Функция которая фиксит таймауты
    // Сначала удаляет все setTimeout а потом вызывает зациклиную функцию slideChangeInterval
    const clearStart = () => {
      for (const timeout of setTimeoutList) {
        clearTimeout(timeout);
      }
      slideChangeInterval();
    };

    slideChangeInterval();

    // Вызываем clearStart при любом переключении слйда (и мальнкого, и большого)
    for (const swiperItem of this.sliderItems) {
      swiperItem.on("slideChange", () => {
        clearStart();

        onSwiperItemChangeNavigation(swiperItem);
      });
    }

    this.sliderMain.on("slideChange", () => {
      this.sliderItems[this.sliderMain.activeIndex].navigation.update();
      this.sliderItems[this.sliderMain.activeIndex].navigation.init();

      clearStart();

      onSliderMainChangeNavigation();

      if (this.sliderMain.activeIndex !== 0) {
        this.sliderItems[this.sliderMain.previousIndex].navigation.destroy();
      } else {
        this.sliderItems.forEach((slide, index) => {
          // re-destroy all slides when scrolling forward-backward-forward
          if (index !== 0) {
            this.sliderItems[index].navigation.destroy();
          }
        });
      }
    });

    const onSwiperItemChangeNavigation = (swiperItem) => {
      switch (true) {
        case swiperItem.activeIndex === swiperItem.slides.length - 1 &&
          this.sliderMain.activeIndex !== this.sliderMain.slides.length - 1:
          this.sliderMain.navigation.nextEl.classList.add("show");
          break;
        case this.sliderItems[this.sliderMain.activeIndex].activeIndex !== 0:
          this.sliderMain.navigation.prevEl.classList.remove("show");
          break;
        case swiperItem.activeIndex === 0 && this.sliderMain.activeIndex !== 0:
          this.sliderMain.navigation.prevEl.classList.add("show");
          break;
        case swiperItem.activeIndex !== swiperItem.slides.length - 1:
          this.sliderMain.navigation.nextEl.classList.remove("show");
          break;
        default: {
          return;F
        }
      }
    };

    const onSliderMainChangeNavigation = () => {
      if (this.sliderItems[this.sliderMain.activeIndex].slides.length === 1) {
        if (this.sliderMain.activeIndex === this.sliderMain.slides.length - 1) {
          this.sliderItems[
            this.sliderMain.activeIndex
          ].navigation.nextEl.style.display = "none";
        }

        if (this.sliderMain.activeIndex === 0) {
          this.sliderItems[
            this.sliderMain.activeIndex
          ].navigation.prevEl.style.display = "none";
        }
      } else {
        this.sliderItems[
          this.sliderMain.activeIndex
        ].navigation.nextEl.style.display = "flex";
        this.sliderItems[
          this.sliderMain.activeIndex
        ].navigation.prevEl.style.display = "flex";
      }

      switch (true) {
        case this.sliderItems[this.sliderMain.activeIndex].slides.length ===
          1 &&
          this.sliderMain.activeIndex === this.sliderMain.slides.length - 1:
          this.sliderMain.navigation.prevEl.classList.add("show");
          break;
        case this.sliderItems[this.sliderMain.activeIndex].slides.length ===
          1: {
          this.sliderMain.navigation.nextEl.classList.add("show");
          break;
        }
        case this.sliderItems[this.sliderMain.activeIndex].activeIndex === 0:
          this.sliderMain.navigation.nextEl.classList.remove("show");
          this.sliderMain.navigation.prevEl.classList.add("show");
          break;
        case this.sliderItems[this.sliderMain.activeIndex].activeIndex ===
          this.sliderItems[this.sliderMain.activeIndex].slides.length - 1:
          this.sliderMain.navigation.nextEl.classList.add("show");
          this.sliderMain.navigation.prevEl.classList.remove("show");
          break;
        default: {
          return;
        }
      }
    };
  }
}


new StoriesSlider2(
  document.querySelector('[data-popup-modules="StoriesSlider2"]')
);
