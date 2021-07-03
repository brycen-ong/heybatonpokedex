import { expect } from 'chai';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).to.exist;
  });

  it('should return data from http', () => {
    const testData = 'bulbasaur';
    service.getPokemonData(testData).subscribe(data => {
      expect(data.length).greaterThan(0);
    })
  })

  it('should not return data when field is blank', () => {
    const testData = '';
    service.getPokemonData(testData).subscribe(data => {
      expect(data).undefined;
    })
  })
});
