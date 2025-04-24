import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Note {
  id: number;
  title: string;
  description: string;
}

interface ApiResponse<T> {
  code: number;
  message: string;
  response: T;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private apiBaseUrl = `${environment.apiBaseUrl}/notes`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Note[]> {
    return this.http.get<ApiResponse<Note[]>>(this.apiBaseUrl).pipe(
      map((response) => response.response) 
    );
  }

  create(data: Partial<Note>): Observable<Note> {
    return this.http.post<ApiResponse<Note>>(this.apiBaseUrl, data).pipe(
      map((response) => response.response)
    );
  }

  delete(id: number): Observable<Note> {
    return this.http.delete<ApiResponse<Note>>(`${this.apiBaseUrl}/${id}`).pipe(
      map((response) => response.response)
    );
  }
}
