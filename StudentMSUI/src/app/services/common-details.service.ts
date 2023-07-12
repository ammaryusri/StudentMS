import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonDetailsService {
  private urlSD="StudentDetails";
  private urlTS="TeacherSubject";

  constructor(private http:HttpClient) { }

  public getAllocateStudentDetail() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/${this.urlSD}`);
  }

  public getAllocateTeacherSubject() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/${this.urlTS}`);
  }
}
