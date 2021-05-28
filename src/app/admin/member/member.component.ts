import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../user/user';
import {UsersService} from '../../user/service/users.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {


  @Input() user: User;

  @Output() eventEmitter: EventEmitter<any> = new EventEmitter<any>();
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

  blockAUser() {
    return this.userService.blockAUser(this.user.userId).subscribe(value => {
      this.eventEmitter.emit()
      console.log();
    })

  }


  unblockAUser() {
    return this.userService.unBlockAUser(this.user.userId).subscribe(value => {
      this.eventEmitter.emit()
    })
  }
}
