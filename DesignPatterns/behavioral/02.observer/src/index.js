import PaymentSubject from "./subjects/paymentSubject.js";
import Payment from "./events/payment.js";

import Marketing from "./observers/marketing.js";
import Shipment from "./observers/shipment.js";


const subject = new PaymentSubject();

const marketing = new Marketing();
subject.subscribe(marketing);

const shipment = new Shipment();
subject.subscribe(shipment);

const payment = new Payment(subject);

payment.creditCard({ userName: "Erick Wendel", id: Date.now() });

subject.unsubscribe(marketing);

// so vai disparar para area de shipment
payment.creditCard({ userName: "Mariazinha", id: Date.now() });

