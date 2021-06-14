import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QueryParameter } from './queryParameter';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  
  // private apiBaseUrl = "http://localhost:5051/";
  private apiBaseUrl = environment.WEBSITE_GATEWAY;

  constructor(
    protected httpClient: HttpClient) { }

  public post(endpoint: string, vm?: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (vm)
      return this.httpClient
        .post<any>(this.apiBaseUrl + endpoint, JSON.stringify(vm), { headers });
    else
      return this.httpClient
        .post<any>(this.apiBaseUrl + endpoint, { headers });
  }

  public put(endpoint: string, vm: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient
      .put<any>(this.apiBaseUrl + endpoint, JSON.stringify(vm), { headers });
  }

  public delete(endpoint: string, id?: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    let params = new HttpParams().append('id', id?.toString());


    return this.httpClient
      .delete<any>(this.apiBaseUrl + endpoint, { headers, params });
  }

  public get(endpoint: string, queryParams?: QueryParameter[]): Observable<any> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (queryParams) {

      let params = new HttpParams();

      queryParams.forEach(qp => {
        params = params.append(qp.key, qp.value)
      });

      return this.httpClient
        .get<any>(this.apiBaseUrl + endpoint, { headers, withCredentials: true, params });
    }
    else {
      return this.httpClient
        .get<any>(this.apiBaseUrl + endpoint, { headers, withCredentials: true });
    }
  }

}
