import { Injectable } from "@angular/core";
import { endpoints } from "../../environments/webapi";

const paymentsService = endpoints.paymentsService;

@Injectable()
export class ConfigurationService {
  public webApi = {

    payments: {
      baseUrl: `${paymentsService}/api/payments`,
    },
  };

  constructor() {
  }
}
