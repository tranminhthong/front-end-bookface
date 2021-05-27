import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  selectedImage: any = null;
  imgSrc: any = null;

  constructor(private storage: AngularFireStorage) {
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '../../../assets/img/Placeholder.jpg';
      this.selectedImage = null;
    }
  }

  async submit() {
    if (this.selectedImage !== null) {
      const filePath = `avatar/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      // this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      //   finalize(() => {
      //     fileRef.getDownloadURL().subscribe(url => {
      //       this.imgSrc = url;
      //     });
      //   })
      // ).subscribe();
      return new Promise<any>((resolve, reject) => {
        const task = this.storage.upload(filePath, this.selectedImage);
        task.snapshotChanges().pipe(
          finalize(() => fileRef.getDownloadURL().subscribe(
            res => resolve(res),
            err => reject(err))
          )
        ).subscribe();
      });
    }
  }
}
