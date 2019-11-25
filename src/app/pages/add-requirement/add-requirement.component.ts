import { Component, OnInit } from '@angular/core';
import { RequirementsService } from '../../requirements.service';
import { Router } from '@angular/router';
import { Requirement } from '../../models/requirement.model';
import { RequirementsViewComponent } from '../requirements-view/requirements-view.component';

@Component({
  selector: 'app-add-requirement',
  templateUrl: './add-requirement.component.html',
  styleUrls: ['./add-requirement.component.scss']
})
export class AddRequirementComponent implements OnInit {

  constructor(private requirementsService: RequirementsService, private router: Router) { }

  ngOnInit() {
  }

  onClickSubmit(data: any) {

    let newRequirement: Requirement = {
      name: data.name,
      status: false
    }

    this.requirementsService.addRequirement(newRequirement).subscribe(() => {
      this.router.navigate(['/main-view']);
    });
  }
}
