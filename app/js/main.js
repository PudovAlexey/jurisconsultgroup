import { switchsupplyItem } from './showSupplyCards'
import {showModalWindow} from './dropDownMenu'
import { switchLog, activeForm } from './register.js'
import {getFormInformation} from './admin'
import {searchInTable, openMobileFilter} from './sortInTable'
import $ from 'jquery'
window.jQuery = $
window.$ = $


$(function () {

  $(".header__menu-link--inpage, .footer__menu-item a, .footer__logo").on("click", function(event) {
    event.preventDefault();
    var id = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({ scrollTop: top }, 1500);
});

  $('.header__slick').slick({
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    customPaging: function (slick, index) {
      let dotsContent = {
        firstDot: {
          title: 'Представление',
          description: ''
        },
        secondDot: {
          title: 'Налоговое и бухгалтерское консультирование',
          description: ''
        },
        thirdDot: {
          title: 'Корпоративное право',
          description: ''
        }
      }
      switch (index) {
        case 0: {
          return '<span class = "header__slick-dot-num">' + '0' + (index + 1) + '</span>' + '<div header__slick-dot-box>' + '<h3 class = "header__slick-dot-title">' + dotsContent.firstDot.title + '</h3>' + '<p class = "header__slick-dot-text">' + dotsContent.firstDot.description + '</p>' + '</div>'
        }
        case 1: {
          return '<span class = "header__slick-dot-num">' + '0' + (index + 1) + '</span>' + '<div header__slick-dot-box>' + '<h3 class = "header__slick-dot-title">' + dotsContent.secondDot.title + '</h3>' + '<p class = "header__slick-dot-text">' + dotsContent.secondDot.description + '</p>' + '</div>'
        }
        case 2: {
          return '<span class = "header__slick-dot-num">' + '0' + (index + 1) + '</span>' + '<div header__slick-dot-box>' + '<h3 class = "header__slick-dot-title">' + dotsContent.thirdDot.title + '</h3>' + '<p class = "header__slick-dot-text">' + dotsContent.thirdDot.description + '</p>' + '</div>'
        }
      }
    }
  });

  $('.about__slick').slick({
    dots: true,
    arrows: true,
    nextArrow: '<button type="button" class="slick-prev"><svg width="20" height="33" viewBox="0 0 20 33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.86523 31.9553L18.701 16.9687L1.86523 1.98212" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
    prevArrow: '<button type="button" class="slick-next"><svg width="20" height="33" viewBox="0 0 20 33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.701 31.9553L1.86523 16.9687L18.701 1.98212" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'
  });

  $('.services__items').slick({
    dots: false,
    arrows: true,
    infinite: false,
    prevArrow: '<button type="button" class="slick-long-arrow slick-long-arrow--left slick-prev"><svg width="28" height="44" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.85956 42.8694L25.6484 21.6767L1.09831 1.40058" stroke="white" stroke-width="2"/></svg></button>',
    nextArrow: '<button type="button" class="slick-long-arrow slick-long-arrow--right slick-next"><svg width="28" height="44" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.85956 42.8694L25.6484 21.6767L1.09831 1.40058" stroke="white" stroke-width="2"/></svg></button>'
  });

  $('.team__items').slick({
    dots: false,
    arrows: true,
    infinite: false,
    prevArrow: '<button type="button" class="slick-long-arrow slick-long-arrow--black slick-long-arrow--left slick-prev"><svg width="28" height="44" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.85956 42.8694L25.6484 21.6767L1.09831 1.40058" stroke="white" stroke-width="2"/></svg></button>',
    nextArrow: '<button type="button" class="slick-long-arrow slick-long-arrow--black slick-long-arrow--right slick-next"><svg width="28" height="44" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.85956 42.8694L25.6484 21.6767L1.09831 1.40058" stroke="white" stroke-width="2"/></svg></button>'
  });

  $('.reviews__box').slick({
    dots: false,
    arrows: true,
    infinite: false,
    prevArrow: '<button type="button" class="slick-long-arrow slick-long-arrow--left slick-prev"><svg width="28" height="44" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.85956 42.8694L25.6484 21.6767L1.09831 1.40058" stroke="white" stroke-width="2"/></svg></button>',
    nextArrow: '<button type="button" class="slick-long-arrow slick-long-arrow--right slick-next"><svg width="28" height="44" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.85956 42.8694L25.6484 21.6767L1.09831 1.40058" stroke="white" stroke-width="2"/></svg></button>'
  });
});


switchLog(document.querySelector('.bread-crumbs__item--current'), document.querySelectorAll('.form-log__item'), document.querySelectorAll('.form-log'))

getFormInformation(document.querySelector('#AdminForm'))

activeForm(document.querySelector('#form-login'))

showModalWindow()

openMobileFilter(document.querySelector('.law__search'))

searchInTable(document.querySelector('.law__filtration'))

// Statistics(JSON.parse(localStorage.getItem('currentStateTable')))

switchsupplyItem()


ymaps.ready(init); 
function init(){
	var myMap = new ymaps.Map("map",{center: [55.661862, 37.546552],zoom: 16});
	myMap.controls.add("zoomControl").add("typeSelector").add("mapTools");
	var myPlacemark = new ymaps.Placemark([55.661862, 37.546552]);
	myMap.geoObjects.add(myPlacemark);	
}