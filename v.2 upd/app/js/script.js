$(document).ready(function () {
	var SwiperV = new Swiper ('.swiper-container-v', {
		direction: 'vertical',
		mousewheel: {
		    invert: true,
		    forceToAxis: true,
  		},
  		navigation: {
		    nextEl: '.swiper-button-next-v',
		    prevEl: '.swiper-button-prev-v',
		    hideOnClick: true,
	  	},
  	  	pagination: {
	        el: '.swiper-pagination',
	        clickable: true,
	        renderBullet: function (index, className) {
	          return '<span class="' + className + '">' + (index + 1) + '</span>';
	        },
      	},
	})
	var SwiperH = new Swiper ('.swiper-container-h', {
		direction: 'horizontal',
		slidesPerView: 3.5,
  		centeredSlides: false,
		spaceBetween: 10,
  		navigation: {
		    nextEl: '.swiper-button-next-h',
		    prevEl: '.swiper-button-prev-h',
		    hideOnClick: true,
	  	},
	  	breakpoints: {
	  		// 480: {
	  		// 	slidesPerView: 1,	
	  		// },
	        768: {
          		slidesPerView: 1,
	        },
	        1024: {
          		slidesPerView: 2.5,
	        },
      	}
	})
});
