<?php addModuleStyle('modules/stories/storiesSwiper.css') ?>
<?php addModuleStyle('containers/swiper.css'); ?>
<?php addModuleStyle('modules/stories/storiesSlider.css') ?>

<?php
$parentClass = isset($parentClass) ? $parentClass : '';
$childClass = isset($childClass) ? $childClass : '';

$list = isset($list) ? $list : [
  array(
    'thumb' => true,
    'name' => false,
    'isPosterWrapper' => true,
    'childClass' => 'cardList_item-active',
    'popupContent' => json_encode(array(
      array(
        "img" => ["webp" => "img/tmp/220x314.webp", "jpg" => "img/tmp/220x314.jpg"],
        "name" => "Сквозь время",
        "previewImg" => ["webp" => "img/tmp/20x30.webp", "jpg" => "img/tmp/20x30.jpg"],
        "date" => "01 июня 2023",
      ),
      array(
        "img" => ["webp" => "img/tmp/220x314.webp", "jpg" => "img/tmp/220x314.jpg"],
        "name" => "Сквозь время",
        "previewImg" => null,
        "date" => "01 июня 2023",
      ),
    ), JSON_UNESCAPED_UNICODE),
  ),
  array(
    'thumb' => true,
    'name' => false,
    'isPosterWrapper' => true,
    'childClass' => 'cardList_item-active',
    'popupContent' => json_encode(array(
      array(
        "img" => ["webp" => "img/tmp/220x314.webp", "jpg" => "img/tmp/220x314.jpg"],
        "name" => "Джонни Депп",
        "previewImg" => ["webp" => "img/tmp/20x30.webp", "jpg" => "img/tmp/20x30.jpg"],
        "date" => "22 февраля 2022",
      ),
      array(
        "img" => ["webp" => "img/tmp/220x314.webp", "jpg" => "img/tmp/220x314.jpg"],
        "name" => "Джонни Депп",
        "previewImg" => ["webp" => "img/tmp/20x30.webp", "jpg" => "img/tmp/20x30.jpg"],
        "date" => "22 февраля 2022",
      ),
    ), JSON_UNESCAPED_UNICODE),
  ),
  array(
    'thumb' => true,
    'name' => false,
    'isPosterWrapper' => true,
    'popupContent' => json_encode(array(
      array(
        "img" => ["webp" => "img/tmp/220x314.webp", "jpg" => "img/tmp/220x314.jpg"],
        "name" => "Киллиан Мерфи",
        "previewImg" => ["webp" => "img/tmp/20x30.webp", "jpg" => "img/tmp/20x30.jpg"],
        "date" => "22 февраля 2022",
      ),
      array(
        "img" => ["webp" => "img/tmp/220x314.webp", "jpg" => "img/tmp/220x314.jpg"],
        "name" => "Киллиан Мерфи",
        "previewImg" => ["webp" => "img/tmp/20x30.webp", "jpg" => "img/tmp/20x30.jpg"],
        "date" => "22 февраля 2022",
      ),
      array(
        "img" => ["webp" => "img/tmp/220x314.webp", "jpg" => "img/tmp/220x314.jpg"],
        "name" => "Киллиан Мерфи",
        "previewImg" => ["webp" => "img/tmp/20x30.webp", "jpg" => "img/tmp/20x30.jpg"],
        "date" => "22 февраля 2022",
      ),
    ), JSON_UNESCAPED_UNICODE),
  ),
  array(
    'thumb' => true,
    'name' => false,
    'isPosterWrapper' => true,
    'childClass' => 'cardList_item-active',
    'popupContent' => json_encode(array(
      array(
        "img" => ["webp" => "img/tmp/220x314.webp", "jpg" => "img/tmp/220x314.jpg"],
        "name" => "Сквозь время",
        "previewImg" => ["webp" => "img/tmp/20x30.webp", "jpg" => "img/tmp/20x30.jpg"],
        "date" => "01 июня 2023",
      ),
      array(
        "img" => ["webp" => "img/tmp/220x314.webp", "jpg" => "img/tmp/220x314.jpg"],
        "name" => "Сквозь время",
        "previewImg" => ["webp" => "img/tmp/20x30.webp", "jpg" => "img/tmp/20x30.jpg"],
        "date" => "01 июня 2023",
      ),
    ), JSON_UNESCAPED_UNICODE),
  ),
  array(
    'thumb' => true,
    'name' => false,
    'isPosterWrapper' => true,
    'childClass' => 'cardList_item-active',
    'popupContent' => json_encode(array(
      array(
        "img" => ["webp" => "img/tmp/220x314.webp", "jpg" => "img/tmp/220x314.jpg"],
        "name" => "Джонни Депп",
        "previewImg" => ["webp" => "img/tmp/20x30.webp", "jpg" => "img/tmp/20x30.jpg"],
        "date" => "22 февраля 2022",
      ),
      array(
        "img" => ["webp" => "img/tmp/220x314.webp", "jpg" => "img/tmp/220x314.jpg"],
        "name" => "Джонни Депп",
        "previewImg" => ["webp" => "img/tmp/20x30.webp", "jpg" => "img/tmp/20x30.jpg"],
        "date" => "22 февраля 2022",
      ),
    ), JSON_UNESCAPED_UNICODE),
  ),
  array(
    'thumb' => true,
    'name' => false,
    'isPosterWrapper' => true,
    'childClass' => 'cardList_item-active',
    'popupContent' => json_encode(array(
      array(
        "img" => ["webp" => "img/tmp/220x314.webp", "jpg" => "img/tmp/220x314.jpg"],
        "name" => "Киллиан Мерфи",
        "previewImg" => ["webp" => "img/tmp/20x30.webp", "jpg" => "img/tmp/20x30.jpg"],
        "date" => "22 февраля 2022",
      ),
      array(
        "img" => ["webp" => "img/tmp/220x314.webp", "jpg" => "img/tmp/220x314.jpg"],
        "name" => "Киллиан Мерфи",
        "previewImg" => ["webp" => "img/tmp/20x30.webp", "jpg" => "img/tmp/20x30.jpg"],
        "date" => "22 февраля 2022",
      ),
      array(
        "img" => ["webp" => "img/tmp/220x314.webp", "jpg" => "img/tmp/220x314.jpg"],
        "name" => "Киллиан Мерфи",
        "previewImg" => ["webp" => "img/tmp/20x30.webp", "jpg" => "img/tmp/20x30.jpg"],
        "date" => "22 февраля 2022",
      ),
    ), JSON_UNESCAPED_UNICODE),
  ), array(
    'thumb' => true,
    'name' => false,
    'isPosterWrapper' => true,
    'popupContent' => json_encode(array(
      array(
        "img" => ["webp" => "img/tmp/220x314.webp", "jpg" => "img/tmp/220x314.jpg"],
        "name" => "Сквозь время",
        "previewImg" => ["webp" => "img/tmp/20x30.webp", "jpg" => "img/tmp/20x30.jpg"],
        "date" => "01 июня 2023",
      ),
      array(
        "img" => ["webp" => "img/tmp/220x314.webp", "jpg" => "img/tmp/220x314.jpg"],
        "name" => "Сквозь время",
        "previewImg" => ["webp" => "img/tmp/20x30.webp", "jpg" => "img/tmp/20x30.jpg"],
        "date" => "01 июня 2023",
      ),
    ), JSON_UNESCAPED_UNICODE),
  ),
  array(
    'thumb' => true,
    'name' => false,
    'isPosterWrapper' => true,
    'popupContent' => json_encode(array(
      array(
        "img" => ["webp" => "img/tmp/220x314.webp", "jpg" => "img/tmp/220x314.jpg"],
        "name" => "Джонни Депп",
        "previewImg" => ["webp" => "img/tmp/20x30.webp", "jpg" => "img/tmp/20x30.jpg"],
        "date" => "22 февраля 2022",
      ),
      array(
        "img" => ["webp" => "img/tmp/220x314.webp", "jpg" => "img/tmp/220x314.jpg"],
        "name" => "Джонни Депп",
        "previewImg" => ["webp" => "img/tmp/20x30.webp", "jpg" => "img/tmp/20x30.jpg"],
        "date" => "22 февраля 2022",
      )
    ), JSON_UNESCAPED_UNICODE),
  ),
]
?>

<div class="<?php echo $parentClass; ?> storiesSwiper <?php echo $childClass; ?>" data-modules="StoriesSwiper">
  <?php echo render('modules/slider.php', [
    'content' =>  render('modules/cardList/cardList.php', [
      'childClass' => 'cardList-seasonsSwipe outer-mobile inner-mobile',
      'slider' => true,
      'list' => $list,
      'isStoriesPopup' => true,
    ]),
    'itemsOnSlide' => 6,
    'count' => count($list)
  ]) ?>
</div>