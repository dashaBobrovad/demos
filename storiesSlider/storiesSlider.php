<?php addModuleStyle('containers/swiper.css'); ?>
<?php addModuleStyle('modules/stories/storiesSlider.css') ?>

<?php
$moduleName = $moduleName ? ('-' . $moduleName)  : '';
$list = array(
  array(
    "innerSlides" => array(
      array(
        "title" => "1.1",
        "desc" => "",
        "img" => ""
      ),  
      array(
        "title" => "1.2",
        "desc" => "",
        "img" => ""
      ),
    )
  ),
  array(
    "innerSlides" => array(
      array(
        "title" => "2.1",
        "desc" => "",
        "img" => ""
      ),
      array(
        "title" => "2.2",
        "desc" => "",
        "img" => ""
      ),
    )
  ),
)
?>

<div class="storiesSlider swiper" data-popup-modules="StoriesSlider2">

  <div class="storiesSlider_main swiper-container">
    <div class="storiesSlider_mainWrapper swiper-wrapper">

      <?php foreach ($list as $slide) { ?>
        <div class="storiesSlider_mainSlide swiper-slide">
          <div class="storiesSlider_innerWrapper swiper">
            <div class="swiper-wrapper">
              <?php foreach ($slide['innerSlides'] as $innerSlide) { ?>
                <div class="storiesSlider_innerSlide swiper-slide"><?php echo $innerSlide['title'] ?></div>
              <?php } ?>

            </div>

            <!-- Inner navigation;-->
            <!-- <div class="storiesSlider_innerWrapper__navigation _prev"></div>
            <div class="storiesSlider_innerWrapper__navigation _next"></div> -->
            <!-- <div class="storiesSlider_innerPrev swiper-button-prev"></div>
            <div class="storiesSlider_innerNext swiper-button-next"></div> -->

            <!-- Inner pagination;-->
            <div class="storiesSlider_innerPagination swiper-pagination"></div>
          </div>
        </div>
      <?php } ?>

    </div>

    <!-- Inner navigation;-->

  </div>
  <!-- Main navigation & pagination -->
  <div class="storiesSlider_mainPagination swiper-pagination"></div>

  <div class="storiesSlider_arrows">
    <div class="storiesSlider_arrowsWrapper">
      <!-- <div class="storiesSlider_innerPrev swiper-button-prev"></div>
				<div class="storiesSlider_innerNext swiper-button-next"></div> -->
      <div class="storiesSlider_innerPrev swiper-button-prev"></div>
      <div class="storiesSlider_innerNext swiper-button-next"></div>

      <div class="storiesSlider_mainPrev swiper-button-prev"></div>
      <div class="storiesSlider_mainNext swiper-button-next"></div>
    </div>
  </div>
</div>