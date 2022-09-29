import { Injectable } from '@angular/core';
import { Auth, getAuth } from '@angular/fire/auth';
import { addDoc, collection, doc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private auth: Auth, private store : Firestore) { }

  createInvoice(body:any){
    const invoicesRef = collection(this.store, 'invoices');
    const docRef = doc(invoicesRef, body.idApplication);
    return setDoc(docRef, body);
  }

}
