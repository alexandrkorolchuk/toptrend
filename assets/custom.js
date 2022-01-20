function debounce(fn, wait) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}

Cart={
    Update_cart_count(){
        jQuery.getJSON('/cart.js', function(cart) {
            $('#cart-bubble')[0].innerHTML=cart.item_count;
            $('#cart-bubble')[0].removeAttribute("style")
        } );
    },
    getCartDrower() {
        fetch('/cart').then(function (response) {
            return response.text();
        }).then(function (html) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');

            var cart_items = doc.querySelector('#CartDrawer').querySelector('.ajaxcart__inner-content').innerHTML
            var cart_items_count = doc.querySelector('#CartDrawer').querySelector('.js-ajaxcart-count').innerHTML
            var checkout_btn = doc.querySelector('#CartDrawer').querySelector('.ajaxcart__btn-wrap').innerHTML
            var subtotal__money = doc.querySelector('#CartDrawer').querySelector('.ajaxcart-subtotal__money').innerHTML
            if(doc.querySelector('#CartDrawer').querySelector('.ajaxcart-line__content') != undefined) {
                var line_content = doc.querySelector('#CartDrawer').querySelector('.ajaxcart-line__content').innerHTML
            }
            $('.ajaxcart__inner-content')[0].innerHTML=cart_items;
            $('.js-ajaxcart-count')[0].innerHTML=cart_items_count;
            $('.ajaxcart__btn-wrap')[0].innerHTML=checkout_btn;
            $('.ajaxcart-subtotal__money')[0].innerHTML=subtotal__money;
            if(line_content) {
                $('.ajaxcart-line__content')[0].innerHTML = line_content;
            }

        }).catch(function (err) {

            console.error('Something went wrong.', err);
        });
    },
    cartOpen(){
        if(!$('#CartDrawer').hasClass("open")) {
            setTimeout(function () {
                $('body').toggleClass('overflow__hidden');
                $('.wrapper').toggleClass('overflow__layout');
                $(this).toggleClass('open');
                $('#CartDrawer').toggleClass('open')
            }, 300)
        }
    }
}

$(document).ready(function (){
    $(".input-quantity:not(.ajaxcart__qty-num)").on("change",function (){
        $(".product-add-form").find($('[name="quantity"]'))[0].value=this.value;
    });
    $('.button_triger_add-to-cart').on("click",function (){
        $(".product-add-form").find($('.form__succsess')).trigger('click');
        $(this)[0].innerHTML="Added To Bag"
        let _this= $(this);
        setTimeout(function (){
            _this[0].innerHTML="Add To Bag"
        }, 2000)
    });
    $('.js-subscribe-select').select2({dropdownPosition:'below',minimumResultsForSearch:-1})
    $(".js-scrol-to-img").on("click",function (){
        let block_id= $(this).attr('data-id'),
        slide_to=$('.pdp__images').find($(`#${block_id}`)).parent().attr('data-slick-index');
        $('.js-slider-pdp').slick('slickGoTo', slide_to);
    });

    $('.js-custom-input-product-search').on('input focus', function () {
        const $field = $(this),
            $parent = $field.closest('.input-search'),
            $result = $parent.find('.input-search__result'),
            $list = $parent.find('.input-search__list'),
            $empty = $parent.find('.input-search__empty'),
            value = $field.val(),
            count = value.length;
        if (value.length > 0) {
            $(this).addClass('filed');
            $parent.addClass('show');
            $result.addClass('show');
        } else {
            $(this).removeClass('filed');
            $parent.removeClass('show');
            $result.removeClass('show');
            $list.text('').hide();
            $list.hide();
            $empty.hide();
        }
    });

    /*--- Search --*/
    $('.js-input-search').on('input focus', function () {
        setTimeout(function (){
            $('.input-search__list ul li').on('click', function (e){
                let title = $(this).attr('data-title');
                $('.input-search__field input').val(title);
                let button = $('.main-faq__box--body').find($($(`[data-title="${title}"]`)));
                let button_id = button.attr('data-question-qt')
                let text = $('.main-faq__box--body').find($($(`[data-answer-qt="${button_id}"]`)));
                $('.main-faq__box--body').prepend(text);
                $('.main-faq__box--body').prepend(button);
                $('.main-faq__box--body .accordion').removeClass('active');
                $('.main-faq__box--body .panel').removeAttr('style');
                $('.main-faq__box--body .accordion:nth-of-type(6)').nextAll().addClass("hidden");
                $('.main-faq__box--body .accordion:nth-of-type(6)').prevAll().removeClass("hidden");
                $('.main-faq__box--body .panel:nth-of-type(6)').nextAll().addClass("hidden");
                $('.main-faq__box--body .panel:nth-of-type(6)').prevAll().removeClass("hidden");
                button.click();
            });
        },200)

    });

    /*--- Ingredients Search --*/
    $('.js-input-ingredients-search').on('input focus', function () {
        setTimeout(function (){
            $('.input-search__list ul li').on('click', function (e){
                let title = $(this).attr('data-ingredients');
                $('.input-search__field input').val(title);
                let button = $('.main-ingredients__box--body').find($($(`[data-ingredients-title="${title}"]`)));
                let button_id = button.attr('data-ingredients-header-qt')
                let text = $('.main-ingredients__box--body').find($($(`[data-ingredients-body-qt="${button_id}"]`)));
                $('.main-ingredients__box--body').prepend(text);
                $('.main-ingredients__box--body').prepend(button);
                $('.main-ingredients__box--body .accordion').removeClass('active');
                $('.main-ingredients__box--body .panel').removeAttr('style');
                $('.main-ingredients__box--body .accordion:nth-of-type(6)').nextAll().addClass("hidden");
                $('.main-ingredients__box--body .accordion:nth-of-type(6)').prevAll().removeClass("hidden");
                $('.main-ingredients__box--body .panel:nth-of-type(6)').nextAll().addClass("hidden");
                $('.main-ingredients__box--body .panel:nth-of-type(6)').prevAll().removeClass("hidden");
                button.click();
            });
        },200)

    });

    /* --- Sharing --- */

    $('[data-print]').on('click', function (){
        window.print();
    });
    $('[data-copy]').on('click', function (){
        var $copy_field = $("<input>");
        $("body").append($copy_field);
        $copy_field.val(window.location.href).select();
        document.execCommand("copy");
        $copy_field.remove();
    });

    // $('.add-to-cart').click(function (e) {
    //     setTimeout(function (){
    //         $('body').toggleClass('overflow__hidden');
    //         $('.wrapper').toggleClass('overflow__layout');
    //         $(this).toggleClass('open');
    //         $('#CartDrawer').toggleClass('open')
    //     },500)
    // });
});