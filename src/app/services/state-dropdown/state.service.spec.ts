import { TestBed } from '@angular/core/testing';
import { StateService } from './state.service';

describe('StateService', () => {
  let service: StateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update showDetails value true', (done) => {
    service.setShowDetails(true);

    service.showDetails$.subscribe(value => {
      expect(value).toBeTrue();
      done();
    });
  });

  it('should update showDetails value false', (done) => {
    service.setShowDetails(false);

    service.showDetails$.subscribe(value => {
      expect(value).toBeFalse();
      done();
    });
  });
});
