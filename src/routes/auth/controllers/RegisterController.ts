import RestRouteController from './../../../../core/rest/controller/RestRouteController';

export default class RegisterController extends RestRouteController {
  public async processRequest(): Promise<void> {
    console.log(this.requestData.req.body);

    this.answer().noContent();
  }
}
