import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../shared/services/sidebar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

// class User {
//   constructor(readonly email: string, readonly password: string) {}
// }

// class NewAccount {
//   constructor(
//     readonly name: string,
//     readonly email: string,
//     readonly password: string,
//     // readonly country: string,
//     readonly birthdate: Date,
//     ) {}
// }

interface FlashCoins {
  idCoin: string;
  changePercent: number;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  activeItemIndex = 0;
  coins: Array<any>;

  flashCoins: FlashCoins;

  loginForm = new FormGroup({
    emailValue: new FormControl('', Validators.required),
    passwordValue: new FormControl('', Validators.required)
  });

  signupForm = new FormGroup({
    emailValue: new FormControl('', Validators.required),
    passwordValue: new FormControl('', Validators.required),
    nameValue: new FormControl('', Validators.required),
    birthdateValue: new FormControl(new TuiDay(2017, 2, 15), Validators.required)
  });


  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sidebarService.fetchSidebarCryptoData('USD', 1, 250).subscribe((r: any) => {
      this.coins = r;
      let counter = 0;
      this.setFlashCoins(r[counter]);

      setInterval(() => {
        if (counter < 249) {
          counter++;
        }  else {
          counter = 0;
        }
        this.setFlashCoins(r[counter]);
      }, 850);
    });
  }

  setFlashCoins(coin: {symbol: string, price_change_percentage_24h: number} ): void {
    this.flashCoins =  {
      idCoin: coin.symbol,
      changePercent: coin.price_change_percentage_24h,
    };
  }

  onLogin(): void {
    this.authService.isAuth = true;
    this.router.navigate(['']);
    // console.log(this.loginForm.valueChanges);
  }

  onSignUp(): void {
    this.authService.isAuth = true;
    this.router.navigate(['']);
    // console.log(this.signupForm.valueChanges);
  }
}
