$('.order_add_to_bag-js').on('click',function (){
    let product_id=$(this).closest('.order-item').find($('.order-modal__table_product')).attr('data-product-id');
    let product_quantity=$(this).closest('.order-item').find($('.order-modal__table_product')).attr('data-product-quantity');
    let formData = {
        'items': [{
            'id': product_id,
            'quantity': product_quantity
        }]
    };
    fetch('/cart/add.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            Cart.Update_cart_count();
            Cart.getCartDrower();
            Cart.cartOpen();

            return response.json();
        })
        .catch((error) => {
            console.error('Error:', error);
            console.error('Error:');
        });
});


$('.order_add_to_bag_all-js').on('click',function (){
    let items=[];
    $( ".order-item" ).each(function( index ) {
        items.push({'id':$(this).find($('.order-modal__table_product')).attr('data-product-id'),"quantity":$(this).find($('.order-modal__table_product')).attr('data-product-quantity')})
    });

    let formData = {
        items
    };

    fetch('/cart/add.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            Cart.Update_cart_count();
            Cart.getCartDrower();
            Cart.cartOpen();

            return response.json();
        })
        .catch((error) => {
            console.error('Error:', error);
            console.error('Error:');
        });
});
$('.order-history-add_to_cart').on('click',function (){
    let items=[];
    $(this).closest('.order-item').find($('.product-list-item')).each(function( index ) {
        items.push({'id':$(this).attr("data-product-id"),"quantity":$(this).attr('data-product-quantity')})
    });
    let formData = {
        items
    };
    fetch('/cart/add.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            Cart.Update_cart_count();
            Cart.getCartDrower();
            Cart.cartOpen();

            return response.json();
        })
        .catch((error) => {
            console.error('Error:', error);
            console.error('Error:');
        });
});