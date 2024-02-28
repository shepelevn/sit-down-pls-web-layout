// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(addressMapInit);

function addressMapInit(){

  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [55.769383, 37.638521],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 13,
    controls: [],
    clickable: false,
    scrollZoom: false,
    drag: false,
    routeEditor: false,
    clickableObjects: false,
    behaviors: [],
    interactivityModel: 'disable',
  });

  let myPlacemark = new ymaps.Placemark([55.769383, 37.638521],
    {},
    {
      iconLayout: 'default#image',
      iconImageHref: 'img/contacts/map-dot.svg',
      iconImageSize: [12, 12],
      // iconImageOffset: [-3, -42]
    });

  myMap.geoObjects.add(myPlacemark);
  myMap.behaviors.disable(['drag', 'scrollZoom', 'routeEditor']);
}
