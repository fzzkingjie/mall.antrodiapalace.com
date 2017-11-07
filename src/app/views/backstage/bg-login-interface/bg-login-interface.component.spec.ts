import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BgLoginInterfaceComponent } from './bg-login-interface.component';

describe('BgLoginInterfaceComponent', () => {
  let component: BgLoginInterfaceComponent;
  let fixture: ComponentFixture<BgLoginInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BgLoginInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgLoginInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
