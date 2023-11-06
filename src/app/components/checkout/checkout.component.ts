import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoItem } from 'src/app/models/carritoItem';
import { Checkout } from 'src/app/models/checkout';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { SVGICON } from 'src/app/utility/svgIcons';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})

export class CheckoutComponent implements OnInit {
    private name = document.getElementById('name') as HTMLInputElement;
    private cardnumber = document.getElementById('cardnumber') as HTMLInputElement;
    private expirationdate = document.getElementById('expirationdate') as HTMLInputElement;
    private securitycode = document.getElementById('securitycode') as HTMLInputElement;
    private ccicon = document.getElementById('ccicon') as HTMLElement;
    private ccsingle = document.getElementById('ccsingle') as HTMLElement;
    private csssinglecvg= document.querySelector("#ccsingle svg") as HTMLElement;
    private generatecard = document.getElementById('generatecard') as HTMLElement;
    private checkConfirm :boolean = false;

  constructor(
    private userServices: UserService,
    private cartService: CartService,
    private router: Router
    
  ) {}
  randomCard = function () {
    let testCards = [
      '4000056655665556',
      '5200828282828210',
      '371449635398431',
      '6011000990139424',
      '30569309025904',
      '3566002020360505',
      '6200000000000005',
      '6759649826438453',
    ];
    let randomNumber = Math.floor(Math.random() * testCards.length);
    this.cardnumber.value = testCards[randomNumber];
     document.getElementById('svgnumber').textContent = this.cardnumber.value;
     this.changeCard();
  };

  ngOnInit(): void {
     this.name = document.getElementById('name') as HTMLInputElement;
     this.cardnumber = document.getElementById('cardnumber') as HTMLInputElement;
     this.expirationdate = document.getElementById('expirationdate') as HTMLInputElement;
     this.securitycode = document.getElementById('securitycode') as HTMLInputElement;
     this.ccicon = document.getElementById('ccicon') as HTMLElement;
     this.ccsingle = document.getElementById('ccsingle') as HTMLElement;
     this.generatecard = document.getElementById('generatecard') as HTMLElement;
    // CREDIT CARD IMAGE JS
    document.querySelector('.preload')?.classList.remove('preload');
    document.querySelector('.creditcard')?.addEventListener('click', function () {
      if (this.classList.contains('flipped')) {
        this.classList.remove('flipped');
      } else {
        this.classList.add('flipped');
      }
    });

    // On Input Change Events
    this.name.addEventListener('input', function () {
      if (this.value.length == 0) {
        document.getElementById('svgname').innerHTML = 'John Doe';
        document.getElementById('svgnameback').innerHTML = 'John Doe';
      } else {
        document.getElementById('svgname').innerHTML = this.value;
        document.getElementById('svgnameback').innerHTML = this.value;
      }
    });
    this.cardnumber.addEventListener('input', function () {
      let inputValue = this.value;
      let maxLength=16;

      inputValue = inputValue.replace(/\D/g, '');
      if (inputValue.length > maxLength)inputValue = inputValue.slice(0,maxLength)
      this.value = inputValue;
      if (this.value.length == 0) {
        document.getElementById('svgnumber').innerHTML = '4444 4444 4444 4444 ';
      } else {
        document.getElementById('svgnumber').innerHTML = this.value;
      }
    });
    this.name.addEventListener('input', function () {
      if (this.value.length == 0) {
        document.getElementById('svgname').innerHTML = 'John Doe';
        document.getElementById('svgnameback').innerHTML = 'John Doe';
      } else {
        document.getElementById('svgname').innerHTML = this.value;
        document.getElementById('svgnameback').innerHTML = this.value;
      }
    });
    this.expirationdate.addEventListener('input', function () {
      let inputValue = this.value;

      inputValue = inputValue.replace(/\D/g, '');
    
      if (inputValue.length > 4) {
        inputValue = inputValue.slice(0, 4);
      }
 
      if (inputValue.length > 2) {
        const month = inputValue.slice(0, 2);
        const year = inputValue.slice(2, 4);
        inputValue = month + '/' + year;
      }

      this.value = inputValue;
      if (this.value.length == 0) {
        document.getElementById('svgexpire').innerHTML = '12/22';
      } else {
        document.getElementById('svgexpire').innerHTML = this.value;
      }
    }); 
    this.securitycode.addEventListener('input', function () {
      let maxLength=3;
      if (this.value.length > maxLength) this.value = this.value.slice(0,maxLength)
      if (this.value.length == 0) {
        document.getElementById('svgsecurity').innerHTML = '333';
      } else {
        document.getElementById('svgsecurity').innerHTML = this.value;
      }
    });

    
    // On Focus Events
    this.name.addEventListener('focus', function () {
      document.querySelector('.creditcard')?.classList.remove('flipped');
    });

    this.cardnumber.addEventListener('focus', function () {
      document.querySelector('.creditcard')?.classList.remove('flipped');
    });

    this.expirationdate.addEventListener('focus', function () {
      document.querySelector('.creditcard')?.classList.remove('flipped');
    });

    this.securitycode.addEventListener('focus', function () {
      document.querySelector('.creditcard')?.classList.add('flipped');
    });
  }


   swapColor = function (basecolor) {
    document.querySelectorAll('.lightcolor')
      .forEach(function (input: HTMLElement) {
        input.setAttribute('class', '');
        input.setAttribute('class', 'lightcolor ' + basecolor);
      });
    document.querySelectorAll('.darkcolor')
      .forEach(function (input: HTMLElement) {
        input.setAttribute('class', '');
        input.setAttribute('class', 'darkcolor ' + basecolor + 'dark');
      });
  };

  changeCard(){
    let cardNumberValue=this.cardnumber.value;
    if(cardNumberValue.length > 3){
      let cardType=this.getCardType(cardNumberValue)
      switch (cardType) {
        case 'American Express':
          this.ccicon.innerHTML = SVGICON.amex;
          this.ccsingle.innerHTML = SVGICON.amex_single;
          this.swapColor('green');
          break;
        case 'Visa':
          this.ccicon.innerHTML = SVGICON.visa;
          this.ccsingle.innerHTML = SVGICON.visa_single;
          this.swapColor('lightblue');
          break;
        case 'MasterCard':
          this.ccicon.innerHTML =SVGICON.mastercard;
          this.ccsingle.innerHTML = SVGICON.mastercard_single;
          this.swapColor('orange');
          break;
        // Handle other card types here
        default:
          this.ccicon.innerHTML = '';
          this.ccsingle.innerHTML = '';
          this.swapColor('grey');
          break;
      }
      this.csssinglecvg= document.querySelector("#ccsingle svg") as HTMLElement;
      this.csssinglecvg.style.width='100px';
      this.csssinglecvg.style.maxHeight='60px';

    }
  }

  confirmButton(){
    if(this.name.value == ''  || this.expirationdate.value == '' || this.securitycode.value == '' || this.getCardType(this.cardnumber.value) == 'Desconocida'){
      return false;
    }else {
      return true;
    }
  }

  getCardType(cardNumber: string): string {
    const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const mastercardRegex = /^5[1-5][0-9]{14}$/;
    const amexRegex = /^3[47][0-9]{13}$/;
  
    if (visaRegex.test(cardNumber)) {
      return "Visa";
    } else if (mastercardRegex.test(cardNumber)) {
      return "MasterCard";
    } else if (amexRegex.test(cardNumber)) {
      return "American Express";
    } else {
      return "Desconocida";
    }
  }

  clearCart(){
    this.cartService.getCart().listaProductos.forEach(item => {
     this.removeFromCart(item);
    })
     }
   
     removeFromCart(cartProduct:CarritoItem){
       this.cartService.removeFromCart(cartProduct.producto.id);
       }

  confirmarCompra() {
    const usuario = this.userServices.obtenerUsuarioDeLaSesion();
    const carrito = this.cartService.getCartFromLocalStorage();
    const newCheckout: Checkout = {
      idUsuario: usuario?.uid,
      carrito: carrito,
      medioDePago: 'Tarjeta de credito',
    };

    this.cartService.buyCart(newCheckout).subscribe(
      (data) => {
        Swal.fire('Su compra ha sido realizada con exito', data, 'success').then((result)=>{
          if(result.isConfirmed){
           this.clearCart();
           this.router.navigateByUrl("/mi-cuenta");
          }
         });
      },
      (error) => {
        if (error.status == 500) {
          Swal.fire(
            'Error al realizar la compra',
            error.error.mensaje,
            'error'
          );
        } else {
          Swal.fire(
            'Se ha producido un error, por favor intente mas tarde',
            'error'
          );
        }
      }
    );
  }
}
