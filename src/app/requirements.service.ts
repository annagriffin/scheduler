import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Requirement } from './models/requirement.model';


@Injectable({
  providedIn: 'root'
})
export class RequirementsService {

  constructor(private webRequestService: WebRequestService) { }

  getRequirements() {
    return this.webRequestService.get('requirements');
  }

  updateRequirementStatus(requirementId: string, status: boolean) {
    return this.webRequestService.patch(`requirements/${requirementId}`, { status });
  }

  deleteRequirement(requirementId: string) {
    return this.webRequestService.delete(`requirements/${requirementId}`);
  }

  addRequirement(requirement: Requirement) {
    return this.webRequestService.post('requirements', requirement)
  }


}
