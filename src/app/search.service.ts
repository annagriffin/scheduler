import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseURL: string = '/search'

  constructor(private webRequestService: WebRequestService) { }


  search(queryString: string) {
    let url = 'course-listings/search/' + queryString;
    
    return this.webRequestService.get(url);
  
  
  }
}
