import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { NavFootService } from 'src/app/services/nav-foot.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  errorMsg: string = "";
  errorData: boolean = false;
  dataFlag: boolean = false;
  showDownloadErrors: boolean = false;
  tableData: any = [];
  file = null;

  constructor(public papa: Papa, public cartService: CartService, public productService: ProductService, public nav: NavFootService) { }

  uploadFiles(file: any) {
    this.file = file.files[0];
  }

  uploadData() {
    var config = {
      download: true,
      header: true,
      transformHeader: (h: any) => {
        return h.trim().toLowerCase();
      },
      skipEmptyLines: true,
      complete: (results: any) => {
        this.validateData(results.data);
      },
    }
    if (this.file) {
      this.papa.parse(this.file, config)
      this.file = null;
    }
  }

  validateData(data: any) {
    if (!data.length) {
      this.errorMsg = "The file you have uploaded is empty";
      return;
    }

    for (let i = 0; i < data.length; i++) {
      let prod = this.productService.getProduct(data[i].id);
      if (prod) {
        if (data[i]?.quantity == "") {
          this.errorData = true;
          data[i].errors = "Quantity is a required field.";
        } else {
          if (data[i].quantity <= 0) {
            this.errorData = true;
            data[i].errors = "Quantity should be more than zero";
          }
          if (isNaN(data[i].quantity)) {
            this.errorData = true;
            data[i].errors = "Quantity should be a number more than zero";
          }
        }
      } else {
        if (data[i].id == "") {
          this.errorData = true;
          data[i].errors = "Product ID is a required field";
        } else {
          this.errorData = true;
          data[i].errors = "Product with specified ID doesn't exist";
        }
      }
    }
    if (this.errorData == true) {
      this.errorMsg = "There were errors in uploading CSV file. Check Downloaded File.";
      // this.showDownloadErrors = true; 
      this.downloadErrors(data);
    }
    else {
      this.populateTableData(data);
      this.dataFlag = true;
    }
  }

  populateTableData(data) {
    let i = 0;
    let alreadyPresent = false;
    data.map((data, index) => {
      for (let element of this.tableData) {
        if (element.id == data.id) {
          element.quantity += Number(data.quantity);
          alreadyPresent = true;
        }
      }
      if (!alreadyPresent) {
        this.tableData.push(this.productService.getProduct(data.id));
        this.tableData[i].quantity = Number(data.quantity);
        i++;
      }
      else {
        alreadyPresent = false;
      }
    })
  }

  downloadErrors(data) {
    console.log(data);
    data = data.filter((row) => row.hasOwnProperty('errors'));
    console.log(data);
    //unparsing to csv
    const csv = this.papa.unparse(data, { columns: ["id", "quantity", "errors"] });

    // Creating a Blob for having a csv file format and passing the data with type
    const blob = new Blob([csv], { type: "text/csv" });

    // Creating an object for downloading url
    const url = window.URL.createObjectURL(blob);

    // Creating an anchor(a) tag of HTML
    const a = document.createElement("a");

    // Passing the blob downloading url
    a.setAttribute("href", url);

    //getting datetime of order
    var today = new Date().toLocaleString("en-IN");

    // Setting the anchor tag attribute for downloading and passing the download file name
    a.setAttribute("download", today + " errors.csv");

    //appending the temporary link
    document.body.appendChild(a);

    // Performing a download with click
    a.click();

    //removing the temporary link
    document.body.removeChild(a);
  }

  ngOnInit(): void {
    this.nav.show();
  }

}
