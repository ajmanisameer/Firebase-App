import { Component, OnInit } from '@angular/core';
import { FireappserviceService } from './fireappservice.service';
import { Employee } from './Model/Employee';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'firebaseapp';
  allemp: Employee[];
  id: string;
  name: string;
  add: string;
  con: string;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;


  constructor(private q: FireappserviceService, private afs: AngularFireStorage) { }
  ngOnInit() {
    this.q.GetEmployee().subscribe(data => {
      this.allemp = data;
    });

  }
  addemp(ed) {
    this.q.AddEmployee(ed.value);
  }
  updateemployee(k) {
    this.id = k.id;
    this.name = k.Name;
    this.add = k.Address;
    this.con = k.Contact;
  }
  FinalUpdate(ed) {
    this.q.UpdateEmployee(ed.value);
  }
  deleteemployee(id) {
    this.q.DeleteEmployee(id);
  }
  onfileSelect(event) {
    const file = event.target.files[0];
    const filePath = '/Uploads/';
    const ref = this.afs.ref(filePath + file.name);
    const task = ref.put(file);
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = ref.getDownloadURL())
    ).subscribe();
  }
}

