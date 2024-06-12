import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService, User } from '../../services/user.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  id: any;
  private sub: any;
  user: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });

    this.user = this.userService.getUser(this.id);
  }

  hide() {
    this.router.navigate([{ outlets: { middle: ['info'] } }], {
      relativeTo: this.route.parent,
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
