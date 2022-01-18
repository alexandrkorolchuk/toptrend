
function fetchConfig(type = 'json') {
    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': `application/${type}` }
    };
}

async function updateQuantity(line, quantity) {

    const body = JSON.stringify({
        'line': line,
        'quantity': quantity
    });

    fetch(`${routes.cart_change_url}`, {...fetchConfig(), ...{ body }})
      .then((response) => {
            return response.text();
      }).catch(function (err) {
        console.error('Something went wrong.', err);
    });
  }

$('.ajaxcart__inner').on('click','.ajaxremove',function () {
    updateQuantity($(this).attr('data-line'),0).then(setTimeout(function (){
        Cart.getCartDrower();
        Cart.Update_cart_count();
    },400));
})

$('.ajaxcart__inner').on('change','.ajaxcart__qty-num',function () {
    updateQuantity($(this).attr('data-line'),$(this).val()).then(setTimeout(function (){
        Cart.getCartDrower();
        Cart.Update_cart_count();
    },400));
})




