import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';


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


}
