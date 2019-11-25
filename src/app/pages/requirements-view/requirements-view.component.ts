import { Component, OnInit } from '@angular/core';
import { RequirementsService } from 'src/app/requirements.service';
import { Requirement } from 'src/app/models/requirement.model';


@Component({
  selector: 'app-requirements-view',
  templateUrl: './requirements-view.component.html',
  styleUrls: ['./requirements-view.component.scss']
})
export class RequirementsViewComponent implements OnInit {

  requirements: Requirement[];
  constructor(private requirementsService: RequirementsService) { }


  ngOnInit() {
    this.requirementsService.getRequirements().subscribe((requirements: Requirement[]) => {
      this.requirements = requirements;
    });

  }


  toggle(val: any) {
    val.status?'true':'false';
    this.requirementsService.updateRequirementStatus(val._id, val.status).subscribe(() => {
    });

  };

  onDeleteRequirementClick(requirementId: string) {
    this.requirementsService.deleteRequirement(requirementId).subscribe((requirement:any) => {
      location.reload();
    })
  }


}
