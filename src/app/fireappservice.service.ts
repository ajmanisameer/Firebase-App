import { Injectable } from '@angular/core';
import { Employee } from './Model/Employee';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { observable, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FireappserviceService {
  EmployeeCollection: AngularFirestoreCollection<Employee>;
  data: Observable<Employee[]>;

  constructor(private afs: AngularFirestore) {
    this.EmployeeCollection = this.afs.collection('EmployeeCollection');
    // this.data=this.EmployeeCollection.valueChanges();

    this.data = this.EmployeeCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Employee;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  GetEmployee() {
    return this.data;
  }
  AddEmployee(empdata) {
    this.EmployeeCollection.add(empdata);
  }
  UpdateEmployee(k) {
    this.afs.doc('EmployeeCollection/' + k.id).update(k);
  }
  DeleteEmployee(id){
    this.afs.doc('EmployeeCollection/' +id).delete();
  }
}
