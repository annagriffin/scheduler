import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../search.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { empty, of } from "rxjs";



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() courseName: string;
  @Output() newName = new EventEmitter; 

  results: any;
  queryField: FormControl = new FormControl();
  nameField: FormControl = new FormControl();

  constructor(private searchService: SearchService) {}

  ngOnInit() {


    this.queryField.valueChanges.pipe(
      debounceTime(200), 
      distinctUntilChanged(),
      switchMap(query => {
        if (query != "") {
          return this.searchService.search(query);
        } else {
          return of<[]>([]);
        }
      })).subscribe( res => {
        this.results = res;
      });
  }

  onClickMe(item: any) {

    (document.getElementById('courseName') as HTMLInputElement).value = item.name;
    this.newName.emit(item.name);
    (document.getElementById('courseCode')as HTMLInputElement).value = item.courseCode;
    document.getElementById('content').style.display = "none";
    return true

  }
}
 




  




