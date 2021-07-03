import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { PokedexComponent } from './pokedex.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('PokedexComponent', () => {
  let component: PokedexComponent;
  let fixture: ComponentFixture<PokedexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokedexComponent ],
      imports: [HttpClientModule, RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).to.exist;
  });

  it('should produce an error message on empty', () => {
    if(component.pokemonSearch === '') {
      expect(component.errorMessage).to.be('Error! Input box is empty!')
    }
  });
});
