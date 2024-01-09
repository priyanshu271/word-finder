import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WordData } from '../models/word-info.model';

@Injectable({
  providedIn: 'root'
})
export class SearchWordsInfoService {

  constructor(private http:HttpClient){ }

  public getWordInfo(word:string):Observable<WordData[]> {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    return this.http.get<WordData[]>(url);
  }
}
