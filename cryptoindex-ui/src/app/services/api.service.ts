import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  public executeRequest<T = any>(
    method: string,
    url: string,
    data: object = {},
    headers: any = {}
  ) {

    return this.http
      .request(method.toUpperCase(), `${environment.apiUrl}${url}`, {
        ...((method === 'post' || method === 'patch') && { body: data }),
      })
      .pipe(
        catchError(error => {
          throw error;
        }),
      );
  }
}
