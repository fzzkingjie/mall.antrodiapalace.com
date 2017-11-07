import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BgManageInterfaceComponent } from './bg-manage-interface.component';

describe('BgManageInterfaceComponent', () => {
  let component: BgManageInterfaceComponent;
  let fixture: ComponentFixture<BgManageInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BgManageInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgManageInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
