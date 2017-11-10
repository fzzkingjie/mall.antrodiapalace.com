import { Component, OnInit, AfterViewInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

import { LoginFormComponent } from './login-form/login-form.component';

import { LoadingService } from '../../tutorial/loading.service';

@Component({
  selector: "app-home-view",
  templateUrl: "./home-view.component.html",
  styleUrls: ["./home-view.component.scss"],
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: "0" }),
        animate("200ms", style({ opacity: "1" }))
      ]),
      transition(":leave", [
        style({ opacity: "1" }),
        animate("200ms", style({ opacity: "0" }))
      ])
    ]),
    trigger("slideInR2L", [
      transition(":enter", [
        style({ transform: "translateX(100%)" }),
        animate("0.3s 0s ease-out", style({ transform: "translateX(0)" }))
      ])
    ]),
    trigger("scaleLarge", [
      transition(":enter", [
        style({ transform: "scale(0)" }),
        animate("0.3s 0s ease-out", style({ transform: "scale(1)" }))
      ])
    ]),
    trigger("fadeSlideUp1", [
      transition(":enter", [
        style({ transform: "translateY(48px)", opacity: "0" }),
        animate(
          "0.3s 0s ease-out",
          style({ transform: "translateY(0)", opacity: "1" })
        )
      ])
    ]),
    trigger("fadeSlideUp2", [
      transition(":enter", [
        style({ transform: "translateY(48px)", opacity: "0" }),
        animate(
          "0.3s 0s ease-out",
          style({ transform: "translateY(0)", opacity: "1" })
        )
      ])
    ]),
    trigger("fadeSlideUp3", [
      transition(":enter", [
        style({ transform: "translateY(48px)", opacity: "0" }),
        animate(
          "0.3s 0s ease-out",
          style({ transform: "translateY(0)", opacity: "1" })
        )
      ])
    ])
  ]
})
export class HomeViewComponent implements OnInit, AfterViewInit {
  isRenderingFinished: Boolean = false;
  isLoading: boolean;
  // testParam: object;

  constructor(public loadingService: LoadingService) {}

  ngOnInit(): void {
    this.Navbar2();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isRenderingFinished = true;
    });
  }

  feed(res) {
    console.log(res);
  }

  Navbar2() {
    this.loadingService.isNavbar = true;
  }
}
