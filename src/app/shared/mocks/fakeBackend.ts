import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';
import {PRODUCTS} from './mock-products';
import {USERS} from './mock-users';

export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // array in local storage for registered users
    const users = USERS;
    const products = PRODUCTS;


    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {

      // authenticate
      if (request.url.endsWith('/authenticate') && request.method === 'POST') {
        // find if any user matches login credentials
        const filteredUsers = USERS.filter(user => {
          return user.email === request.body.email && user.password === request.body.password;
        });

        if (filteredUsers.length) {
          // if login details are valid return 200 OK with user details and fake jwt token
          const user = filteredUsers[0];
          const body = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };

          return of(new HttpResponse({ status: 200, body: body }));
        } else {
          // else return 400 bad request
          return throwError({ error: { message: 'Username or password is incorrect' } });
        }
      }


      // Get all products
      if (request.url.endsWith('/products') && request.method === 'GET') {
        return of(new HttpResponse({ status: 200, body: PRODUCTS }));
      }

      // Get product by id
      if (request.url.match(/\/product\/\w+$/) && request.method === 'GET') {
        const urlParts = request.url.split('/');
        const SKUcode = urlParts[urlParts.length - 1];
        const filteredEvents = PRODUCTS.filter(product => {
          return product.SKUcode === SKUcode;
        });
        return of(new HttpResponse({ status: 200, body: filteredEvents[0] }));
      }

      // Edit product
      if (request.url.match(/\/product\/\w+$/) && request.method === 'PUT') {
        // if (request.url.endsWith('/events/') && request.method === 'PUT') {
        const newProduct = request.body;
        const urlParts = request.url.split('/');
        const filteredProducts = PRODUCTS.filter(product => {
          return product.SKUcode === SKUcode;
        });
        const SKUcode = urlParts[urlParts.length - 1];
        for (let i = 0; i < PRODUCTS.length; i++) {
          if (PRODUCTS[i].SKUcode === SKUcode) {
            PRODUCTS[i] = newProduct;
            break;
          }
        }
        return of(new HttpResponse({ status: 200, body: newProduct }));
      }

      // Create product
      if (request.url.endsWith('/product/') && request.method === 'POST') {
        // get new product object from post body
        let newProduct = request.body;
        // save new product
        //newProduct.SKUcode = products.length + 1;
        products.push(newProduct);

        // respond 200 OK
        return of(new HttpResponse({ status: 200 }));
      }

      // Delete product
      if (request.url.match(/\/product\/\w+$/) && request.method === 'DELETE') {
        // find product
        let urlParts = request.url.split('/');
        let SKUcode = urlParts[urlParts.length - 1];
        for (let i = 0; i < products.length; i++) {
          let product = products[i];
          if (product.SKUcode === SKUcode) {
            // delete event
            products.splice(i, 1);
            break;
          }
        }
        // respond 200 OK
        return of(new HttpResponse({ status: 200 }));
      }

      // Check product
      if (request.url.match(/\/cashier\/\w+\/\d+$/) && request.method === 'GET') {
        const urlParts = request.url.split('/');
        const quantity = urlParts[urlParts.length - 1];
        const SKUcode = urlParts[urlParts.length - 2];
        const filteredProducts = PRODUCTS.filter(product => {
          if (product.SKUcode === SKUcode && product.quantity >= +quantity) {
            return product.SKUcode === SKUcode;
          }
        });
        return of(new HttpResponse({ status: 200, body: filteredProducts[0] }));
      }











      // Get all users
      if (request.url.endsWith('/users') && request.method === 'GET') {
        // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          return of(new HttpResponse({ status: 200, body: users }));
        } else {
          // return 401 not authorised if token is null or invalid
          return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }
      }

      // get user by id
      if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
        // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          // find user by id in users array
          let urlParts = request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          let matchedUsers = users.filter(user => { return user.id === id; });
          let user = matchedUsers.length ? matchedUsers[0] : null;

          return of(new HttpResponse({ status: 200, body: user }));
        } else {
          // return 401 not authorised if token is null or invalid
          return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }
      }

      // register user
      //if (request.url.endsWith('/users/register') && request.method === 'POST') {
      if (request.url.endsWith('/authenticate/signin') && request.method === 'POST') {
        // get new user object from post body
        let newUser = request.body;

        // validation
        let duplicateUser = users.filter(user => { return user.email === newUser.email; }).length;
        if (duplicateUser) {
          return throwError({ error: { message: 'Username "' + newUser.email + '" is already taken' } });
        }

        // save new user
        newUser.id = users.length + 1;
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // respond 200 OK
        return of(new HttpResponse({ status: 200, body: newUser }));
      }

      // delete user
      if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
        // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          // find user by id in users array
          let urlParts = request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          for (let i = 0; i < users.length; i++) {
            let user = users[i];
            if (user.id === id) {
              // delete user
              users.splice(i, 1);
              localStorage.setItem('users', JSON.stringify(users));
              break;
            }
          }

          // respond 200 OK
          return of(new HttpResponse({ status: 200 }));
        } else {
          // return 401 not authorised if token is null or invalid
          return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }
      }

      // pass through any requests not handled above
      return next.handle(request);

    }))

    // call materialize and dematerialize to ensure delay even if an error is thrown(https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
}
