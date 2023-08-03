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
  allowTouchMove: false,
  effect: "coverflow",
  coverflowEffect: {
    depth: 0,
    modifier: 0,
    rotate: 0,
    scale: 1,
    slideShadows: true,
    stretch: 0,
  },
  breakpoints: {
    // when window width is >= 759px (min-width)
    759: {
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
  allowTouchMove: false,
};

class StoriesSlider {
  constructor(wrapper) {
    if (!window.history) return false;

    this.wrapper = wrapper;
    this.delay = 10000;
    this.initialSlide =
      uPopup.all["storiesSlider"] &&
      uPopup.all["storiesSlider"].param.initialSlide;

    this.sliderMain = false;
    this.sliderItems = [];
    this.setTimeoutList = [];

    this.isMobile = screen.width < 759;

    this.init(wrapper);
  }

  _createSwiper(wrapper) {
    // css переменная с дилеем
    wrapper.style = `--autoplay-delay: ${this.delay}ms`;

    // sliderMain
    // Отдельно задаём навигацию (чтобы настройки слайдеров можно было отдельно от навигации прокидывать в класс)
    sliderMainSettings.initialSlide = this.initialSlide;

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

          this.sliderItems[0].navigation.prevEl.classList.add(
            "swiper-button-disabled"
          );
        });

      if (this.sliderItems[this.sliderMain.activeIndex].slides.length === 1) {
        this._showMainNav("next");
        this._disableFirstArrow("next");
      }
    });

    this.sliderMain.init();


    this._onSliderMainChangeNavigation.bind(this)();


    this.isMobile && this._onSwipeAction.bind(this)();
  }

  _onSwipeAction() {
    const self = this;

    document.addEventListener('touchstart', e => {
      handleTouchStart(e);
    });


    document.addEventListener('touchend', e => {
      handleTouchEnd(e);
    });

    let startX = 0;
    let startY = 0;

    function handleTouchStart(e) {
      startX = e.changedTouches[0].screenX;
      startY = e.changedTouches[0].screenY;
    }

    function handleTouchEnd(e) {
      const diffX = e.changedTouches[0].screenX - startX;
      const diffY = e.changedTouches[0].screenY - startY;
      const ratioX = Math.abs(diffX / diffY);
      const ratioY = Math.abs(diffY / diffX);
      const absDiff = Math.abs(ratioX > ratioY ? diffX : diffY);

      // Ignore small movements (tap)
      if (absDiff < 30) {
        return;
      }

      if (ratioX > ratioY) {
        if (diffX >= 0) {
          self.sliderMain.slidePrev();
        } else {
          self.sliderMain.slideNext();
        }
      }
    }

  }

  _delaySliderItems() {
    // Массив интервалов (чтобы иметь возможность чистить их)
    this.setTimeoutList = [];

    // Рекурсивная функция, которая
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

      this.setTimeoutList.push(timeout, closeTimeout);
    };

    // Функция которая фиксит таймауты
    // Сначала удаляет все setTimeout а потом вызывает slideChangeInterval
    const clearStart = () => {
      this._clearAllTimeouts();
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
      const activeNav =
        this.sliderItems[this.sliderMain.activeIndex].navigation;
      activeNav.update();
      activeNav.init();

      clearStart();

      this._onSliderMainChangeNavigation.bind(this)();

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
        case this.sliderMain.activeIndex === 0 && swiperItem.activeIndex === swiperItem.slides.length - 1:
          this.sliderItems[this.sliderMain.activeIndex].navigation.prevEl.classList.remove(
            "js-disabled"
          );
        case swiperItem.activeIndex === swiperItem.slides.length - 1 &&
          this.sliderMain.activeIndex !== this.sliderMain.slides.length - 1:
          this._showMainNav("next");
          this._hideMainNav("prev");
          break;
        case this.sliderItems[this.sliderMain.activeIndex].activeIndex !== 0:
          this._hideMainNav("prev");
          break;
        case swiperItem.activeIndex === 0 && this.sliderMain.activeIndex !== 0:
          this._showMainNav("prev");
          this._hideMainNav("next");
          break;
        case swiperItem.activeIndex !== swiperItem.slides.length - 1:
          this._hideMainNav("next");
          break;
        default: {
          return;
        }
      }
    };
  }

  _disableFirstArrow(el) {
    this.sliderItems[0].navigation[`${el}El`].classList.add("js-disabled");
  }

  _onSliderMainChangeNavigation = () => {
    const hideInnerNav = (el) => {
      this.sliderItems[this.sliderMain.activeIndex].navigation[
        `${el}El`
      ].style.display = "none";
    };

    const showInnerNav = (el) => {
      this.sliderItems[this.sliderMain.activeIndex].navigation[
        `${el}El`
      ].style.display = "flex";
    };

    if (this.sliderItems[this.sliderMain.activeIndex].slides.length === 1) {
      if (this.sliderMain.activeIndex === this.sliderMain.slides.length - 1) {
        hideInnerNav("next");
      }
      if (this.sliderMain.activeIndex === 0) {
        hideInnerNav("prev");
      }
    } else {
      showInnerNav("next");
      showInnerNav("prev");
    }

    switch (true) {
      case this.sliderItems[this.sliderMain.activeIndex].slides.length === 1 &&
        this.sliderMain.activeIndex === this.sliderMain.slides.length - 1:
        this._showMainNav("prev");
        break;
      case this.sliderItems[this.sliderMain.activeIndex].slides.length === 1: {
        this._showMainNav("next");
        break;
      }
      case this.sliderMain.activeIndex === 0 &&
        this.sliderItems[this.sliderMain.activeIndex].activeIndex === 0:
        this._hideMainNav("prev");
        break;
      case this.sliderItems[this.sliderMain.activeIndex].activeIndex === 0:
        this._hideMainNav("next");
        this._showMainNav("prev");
        break;
      case this.sliderItems[this.sliderMain.activeIndex].activeIndex ===
        this.sliderItems[this.sliderMain.activeIndex].slides.length - 1:
        this._showMainNav("next");
        this._hideMainNav("prev");
        break;
      default: {
        return;
      }
    }

    if (this.sliderMain.activeIndex === 0 && this.sliderItems[this.sliderMain.activeIndex].activeIndex === 0) {
      this.sliderItems[this.sliderMain.activeIndex].navigation.prevEl.classList.add("js-disabled");
    }
  };

  _clearAllTimeouts() {
    for (const timeout of this.setTimeoutList) {
      clearTimeout(timeout);
    }
  }

  _hideMainNav(el) {
    this.sliderMain.navigation[`${el}El`].classList.remove("show");
  }

  _showMainNav(el) {
    this.sliderMain.navigation[`${el}El`].classList.add("show");
  }

  init(wrapper) {
    this._createSwiper(wrapper);
    this._delaySliderItems(this.delay);
  }

  destroy() {
    this.wrapper.style = "";

    this._clearAllTimeouts();

    this.sliderItems.forEach((innerSlider) => innerSlider.destroy(true, true));
    this.sliderMain.destroy(true, true);
  }
}


new StoriesSlider2(
  document.querySelector('[data-popup-modules="StoriesSlider2"]')
);
