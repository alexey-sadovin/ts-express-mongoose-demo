import RestRouteController from './../../../../core/rest/controller/RestRouteController';
import UserDataProducer from './../../../dal/data-producer/UserDataProducer';

export default class RegistrationController extends RestRouteController {
  public async processRequest(): Promise<void> {
    const producer: UserDataProducer = new UserDataProducer(
      this.inputData, this.requestData.getServices().getUserPasswordService());

    this.answer().created(await producer.create());
  }
}
