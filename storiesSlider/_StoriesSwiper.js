class StoriesSwiper {
  constructor(wrapper) {
    this._declare(wrapper);
    this.init();
  }

  _declare(wrapper) {
    this.wrapper = wrapper;
    this.list = this.wrapper.querySelectorAll("[data-StoriesSwiper-item]");

    this.initialSlide;
    this.sliderContent = [];
    this.markup = "";
  }

  _insertMarkup() {
    let innerMarkup = "";
    let inner = "";

    Array.from(this.sliderContent).forEach((item) => {
      item.forEach((item) => {
        inner += `
          <div class="storiesSlider_innerSlide swiper-slide">
            <div class="storiesSlider_poster">
              <div class="storiesSlider_previewCard">
                <picture data-popup-modules='picture' class="storiesSlider_previewPicture picture picture-poster">
                  <template>
                    <source srcset="img/tmp/${item.previewTmp}.webp" type="image/webp" />
                  </template>
                  <img class="picture_image" src="img/bg/px.gif" data-picture="img/tmp/${item.previewTmp}.jpg" alt="" />
                </picture>
                <div class="storiesSlider_previewInfo">
                  <div class="storiesSlider_name">${item.name}</div>
                  <div class="storiesSlider_date">${item.date}</div>
                </div>
              </div>
              <picture data-popup-modules='picture' class="storiesSlider_picture picture">
                <template>
                  <source srcset="img/tmp/${item.tmp}.webp" type="image/webp" />
                </template>
                <img class="picture_image" src="img/bg/px.gif" data-picture="img/tmp/${item.tmp}.jpg" alt="" />
              </picture>
            </div>
            <div class="storiesSlider_info">
              <div class="storiesSlider_title ellipsis-2">${item.title}</div>
              <div class="storiesSlider_desc ellipsis-2">${item.desc}</div>
              <div class="storiesSlider_btnWrapper"><a href=${item.link} class="storiesSlider_btn button-primary-reverse button-large">Читать далее</a></div>
            </div>
          </div>`;
      });

      innerMarkup += `
        <div class="storiesSlider_mainSlide swiper-slide">
          <div class="storiesSlider_innerWrapper swiper">
            <div class="swiper-wrapper">
              ${inner}
            </div>
            <div class="storiesSlider_innerPagination swiper-pagination"></div>
          </div>
        </div>`;

      inner = "";
    });

    this.markup = `
      <div class="popupInner"><div class="storiesSlider swiper" data-popup-modules="StoriesSlider">
        <div class="storiesSlider_main swiper-container">
          <div class="storiesSlider_mainWrapper swiper-wrapper">${innerMarkup}</div>
        </div>
        <div class="storiesSlider_arrows">
          <div class="storiesSlider_arrowsWrapper">
            <div class="storiesSlider_innerPrev swiper-button-prev"></div>
            <div class="storiesSlider_innerNext swiper-button-next"></div>
            <div class="storiesSlider_mainPrev swiper-button-prev"></div>
            <div class="storiesSlider_mainNext swiper-button-next"></div>
          </div>
        </div>
      </div>`;
  }

  _createSlider(e) {
    this.initialSlide = JSON.parse(
      e.currentTarget.getAttribute("data-StoriesSwiper-item")
    ).initialSlide;
    
    this._insertMarkup();

    window.scrollTo(0, 0);

    this.markup && this._showPopup();
  }

  _showPopup() {
    this.popup = uPopup({
      eName: "auto",
      addClass: "popup-storiesSlider",
      name: "storiesSlider",
      content: this.markup,
      initialSlide: this.initialSlide,
      onopen: (wrapper) => {
        this.moduleAll = APP.manager.run(wrapper, "data-popup-modules");
      },
      oncloseBefore: () => {
        APP.manager.destroy(this.moduleAll);
        return true;
      },
    });
  }

  init() {
    this.list.forEach((item) => {
      item.addEventListener("click", this._createSlider.bind(this));

      this.sliderContent.push(
        JSON.parse(item.getAttribute("data-StoriesSwiper-item")).content
      );
    });
  }

  destroy() {
    this.list.forEach((item) => {
      item.removeEventListener("click", this._createSlider.bind(this));
    });

    this.sliderContent = [];
    this.markup = "";
  }
}

export { StoriesSwiper };
