$(document).ready(function () {
  $("#carousel-ecommerce").owlCarousel({
    autoplay: true,
    margin: 0,
    items: 4,
    nav: true,
    doops: true,

    responsive: {
      0: {
        items: 1,
        dots: true,
        nav:false,
      },
      480: {
        margin: 80,
        items:1,
        dot: false,
        nav: false,
      },
      768: {
        items: 2,
        nav: true,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  });
});
