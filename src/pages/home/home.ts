import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { ImagePicker } from '@ionic-native/image-picker';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  imgsrc: string= '';
  fileTransfer: TransferObject;

  constructor(
    public navCtrl: NavController,
    private imagePicker: ImagePicker,
    public http: Http,
    private transfer: Transfer,
    private file: File
   ) {
     this.fileTransfer = this.transfer.create();
  }




  imgPick(){
    this.imagePicker.getPictures({maximumImagesCount: 1}).then((results) => {
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          this.imgsrc= results[i];
          // this.imgService.upload(this.imgsrc);
          this.upload(this.imgsrc);
      }
    }, (err) => { console.log(err) });
  }


  upload(image: string) {
    let options: FileUploadOptions = {
          fileKey: "file",
          fileName: "image.jpg",
          chunkedMode: false,
          mimeType: "multipart/form-data",
          params : {'fileName': image}
    }

      this.fileTransfer.upload(image, encodeURI('http://192.168.88.12/upload/upload.php'), options)
       .then((data) => {
         // success
         console.log(data);
        //  return data;
       }, (err) => {
         // error
         console.log(err);
       })
}

}
