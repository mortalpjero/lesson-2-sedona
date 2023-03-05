const navigation = document.querySelector('.nav-wrapper');
const navigationClose = document.querySelector('.site-list--close');
const windowSize = window.matchMedia("(min-width: 768px)");
const navigationToggle = document.querySelector('.site-list--toggle');
const mapClose = document.querySelector('.map__button');
const map = document.querySelector('.map__picture');
const mapframe = document.querySelector('.map__iframe');

navigationClose.addEventListener("click", function(){
  navigation.classList.add("nav__visually-hidden");
});

  if (window.matchMedia("(min-width: 768px)").matches) {
    navigation.classList.remove("nav__visually-hidden");
  };

navigationToggle.addEventListener("click", function(){
  navigation.classList.toggle("nav__visually-hidden");
})

mapClose.addEventListener("click", function(){
  mapframe.classList.add("visually-hidden");
})

map.addEventListener("click", function(){
  mapframe.classList.remove("visually-hidden");
})
