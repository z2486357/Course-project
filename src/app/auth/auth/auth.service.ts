import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?:boolean;
}


@Injectable({providedIn:'root'})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(email:string,password:string) {
    return this.http.post<AuthResponseData>(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB-4JcEVUbxuvTZyVi3QOe1FJAUbJVDtEA',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(errorRes=>{
        let errorMessage ='An unknown error occured!';
        if(!errorRes.error || !errorRes.error.error){
          return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
          case 'EMAIL_EXISTS':
              errorMessage='This email exists already';
        }
        return throwError(errorMessage);
      }));
  }

  login(email:string,password:string){
    return this.http.post<AuthResponseData>(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB-4JcEVUbxuvTZyVi3QOe1FJAUbJVDtEA',
    {
        email: email,
        password: password,
        returnSecureToken: true,
    })
  }
}
