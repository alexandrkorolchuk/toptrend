if (!customElements.get('product-form')) {
  customElements.define('product-form', class ProductForm extends HTMLElement {
    constructor() {
      super();

      this.form = this.querySelector('form');
      if(this.form){
        this.form.querySelector('[name=id]').disabled = false;
        this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
      }
    }



    onSubmitHandler(evt) {
      evt.preventDefault();
      const submitButton = this.querySelector('[type="submit"]');

      const config = fetchConfig('javascript');
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      delete config.headers['Content-Type'];
      const formData = new FormData(this.form);
      config.body = formData;


      fetch(`${routes.cart_add_url}`,  config)
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          console.log(response)
          Cart.Update_cart_count();
          this.Update_btn();
          Cart.getCartDrower();
          Cart.cartOpen();
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
        });
    }
    Update_btn(){
      $(this).find($('.add-to-cart .text'))[0].innerHTML="Added To Bag"
      let _this= $(this);
      setTimeout(function (){
        _this.find($('.add-to-cart .text'))[0].innerHTML="Add To Bag"
      }, 2000)

    }
  });
}
