import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorEstacionamentoComponent } from './indicador-estacionamento.component';

describe('IndicadorEstacionamentoComponent', () => {
  let component: IndicadorEstacionamentoComponent;
  let fixture: ComponentFixture<IndicadorEstacionamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicadorEstacionamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndicadorEstacionamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
