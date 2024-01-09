import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWordComponent } from './SearchWordComponent';

describe('SearchWordComponent', () => {
  let component: SearchWordComponent;
  let fixture: ComponentFixture<SearchWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchWordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
