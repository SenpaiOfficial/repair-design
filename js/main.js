$(document).ready(function () {
    var modal = $('.modal'),
        modalBtn = $('[data-toggle=modal]'),
        closeBtn = $('.modal__close');

    modalBtn.on('click', function () {
        modal.toggleClass('modal--visible');
    });
    closeBtn.on('click', function () {
        modal.toggleClass('modal--visible');
    });

    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })

    var next = $('.swiper-button-next');
    var prev = $('.swiper-button-prev');
    var bullets = $('.swiper-pagination');

    next.css('left', prev.width() + 10 + bullets.width() + 10)
    bullets.css('left', prev.width() + 10)

    new WOW().init();

    /* Валидация формы */
    $('.modal__form').validate({
        errorClass: "invalid",
        rules: {
            /* simple rule, converted to {required: true} */
            userName: {
                required: true,
                minlength: 2
            },
            userPhone: "required",
            /* compound rule */
            userEmail: {
                required: true,
                email: true
            }
        },
        messages: {
            userName: {
                required: "Заполните поле",
                minlength: "Имя не короче твоего члена"
            },
            userPhone: "Телефон обязателен",
            userEmail: {
                required: "Обязательно укажите email",
                email: "Введите в формате: name.@mail.ru"
            }
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: "send.php",
                data: $(form).serialize(),
                success: function (response) {
                    console.log('Ajax сработал. Ответ сервера: ' + response);
                    alert("Мы свяжемся с вами через 10 минут, также подпишитесь в аниме-паблик Академия Марко");
                    $(form)[0].reset();
                    modal.removeClass('modal--visible');
                },
                error: function (response) {
                    console.error('Ошибка запроса');
                }
            });
        }
    });

    /* Маска для телефона */
    $('[type=tel]').mask('+7(000) 00-00-000', { placeholder: "+7 (___)__-__-___" });
   /*  var player;
    $('.video__play').on('click', function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '465',
            width: '100%',
            videoId: 'o5_cr1EagFM',
            events: {
                'onReady': videoPlay,
            }
        });
    })
    function videoPlay(event) {
        event.target.playVideo();
    } */

    /* создание yandex карты  */
    ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
            center: [47.244729, 39.723187],
            zoom: 9
        }, {
            searchControlProvider: 'yandex#search'
        }),
            // Создаём макет содержимого.
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),
            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                hintContent: 'Собственный значок метки',
                balloonContent: 'Это красивая метка'
            }, {
                // Своё изображение иконки метки.
                iconImageHref: 'img/location.png',
                // Размеры метки.
                iconImageSize: [32, 32],
            });
        myMap.geoObjects
            .add(myPlacemark)
    });
});
