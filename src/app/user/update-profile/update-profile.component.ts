import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../user';
import {UsersService} from '../service/users.service';
import {ActivatedRoute} from '@angular/router';
import {UploadFileService} from '../../upload/upload-file.service';
import {LocalStorageService} from 'ngx-webstorage';

declare var $: any;

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  editForm: FormGroup = new FormGroup({
    userId: new FormControl(),
    username: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    hobbies: new FormControl(),
    about: new FormControl(),
    phone: new FormControl(),
    address: new FormControl(),
    birthDay: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
    enabled: new FormControl()
  });
  user: User = {};
  id = -1;

  constructor(private userService: UsersService,
              private activatedRoute: ActivatedRoute,
              private uploadService: UploadFileService,
              private localStorage: LocalStorageService) {
    if (localStorage.retrieve('userId')){
      this.activatedRoute.paramMap.subscribe(paramMap => {
        this.id = +paramMap.get('id');
        this.getUser(this.id);
      });
    }
  }

  ngOnInit(): void {
  }

  getUser(id: number) {
    this.userService.getUserById(id).subscribe(user => {
      this.user = user;
      this.editForm = new FormGroup({
        userId: new FormControl(user.userId),
        username: new FormControl(user.username),
        firstName: new FormControl(user.firstName, Validators.required),
        lastName: new FormControl(user.lastName, Validators.required),
        hobbies: new FormControl(user.hobbies),
        about: new FormControl(user.about),
        phone: new FormControl(user.phone),
        address: new FormControl(user.address),
        birthDay: new FormControl(user.birthDay),
        password: new FormControl(user.password),
        email: new FormControl(user.email, [Validators.required, Validators.email]),
        enabled: new FormControl(user.enabled)
      });
    });
  }

  async update(id) {
    let imgUrl = await this.uploadService.submit();
    const userUpdate: User = this.editForm.value;
    userUpdate.avatar = imgUrl;
    this.userService.updateUserProfile(id, userUpdate).subscribe(user => {
      this.user = user;
      this.getUser(id);
    });
  }

  showPreview(event) {
    this.uploadService.showPreview(event);
  }
}
