import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { AdminGuard } from '../admin.guard';
import { UserGuard } from '../user.guard';

class MockAdminGuard extends AdminGuard {
  override canActivate() {
    return true;
  }
}

class MockUserGuard extends UserGuard {
  override canActivate() {
    return true;
  }
}


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture;
  let authService: AuthService;
  let router: Router;

  beforeEach(async(() => {
    const authServiceMock = {
      login: jasmine.createSpy('login').and.returnValue(of({ user: { userName: 'test' }, jwtToken: 'testToken' }))
    };

    const routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: AdminGuard, useClass: MockAdminGuard },
        { provide: UserGuard, useClass: MockUserGuard }
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      authService = TestBed.inject(AuthService);
      router = TestBed.inject(Router);
      fixture.detectChanges();
    });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('loginID field validity', () => {
    let errors: { [key: string]: any } = {};
    let loginID = component.loginForm.controls['loginID'];
    expect(loginID.valid).toBeFalsy();

    // loginID field is required
    errors = loginID.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set loginID to something
    loginID.setValue("test");
    errors = loginID.errors || {};
    expect(errors['required']).toBeFalsy();
});


it('password field validity', () => {
  let errors: { [key: string]: any } = {};
  let password = component.loginForm.controls['password'];
  expect(password.valid).toBeFalsy();

  // password field is required
  errors = password.errors || {};
  expect(errors['required']).toBeTruthy();

  // Set password to something
  password.setValue("test");
  errors = password.errors || {};
  expect(errors['required']).toBeFalsy();
});


  it('submitting a form', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['loginID'].setValue("test");
    component.loginForm.controls['password'].setValue("123456789");
    expect(component.loginForm.valid).toBeTruthy();

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['/user-dashboard']);
  });

  it('login with admin user', () => {
    component.loginForm.controls['loginID'].setValue("admin123");
    component.loginForm.controls['password'].setValue("123456789");

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['/admin-dashboard']);
  });
});
