import { Component, OnInit } from '@angular/core';
import {ChildrenService} from "../../../services/children.service";
import {Child} from "../../../model/interfaces/child";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-my-children',
  templateUrl: './my-children.component.html',
  styleUrls: ['./my-children.component.css']
})
export class MyChildrenComponent implements OnInit {
  public children!: Child[];
  public addChildForm!: FormGroup;
  public editChildForm!: FormGroup;
  public childToDelete?: Child | null;
  public isChildDeletable: boolean = false;
  public showAddChildSnackbar: boolean = false;
  public showDeleteChildSnackbar: boolean = false;
  public showEditChildSnackbar: boolean = false;

  constructor(
    private childrenService: ChildrenService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.addChildForm = new FormGroup({
      "firstName": new FormControl(null, [Validators.required]),
      "lastName": new FormControl(null, [Validators.required]),
    });
    this.editChildForm = new FormGroup({
      "id": new FormControl(null),
      "firstName": new FormControl(null, [Validators.required]),
      "lastName": new FormControl(null, [Validators.required]),
    });

    this.getChildren();
  }

  openAddChildModal(modal: any) {
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      result => this.addChildForm.reset(),
      reason => this.addChildForm.reset()
    )
  }

  openDeleteChildModal(modal: any, child: Child) {
    this.childToDelete = child;
    this.childrenService.isChildEnrolledInAnyDayCamp(child.id).subscribe({
      next: value => {
        this.isChildDeletable = !value.childEnrolledInAnyDayCamp;
        this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then(
          result => this.resetChildToDelete(),
          reason => this.resetChildToDelete()
        )
      },
      error: err => console.log(err)
      })
  }

  openEditChildModal(modal: any, child: Child) {
    this.editChildForm = new FormGroup({
      "id": new FormControl(child.id),
      "firstName": new FormControl(child.firstName, [Validators.required]),
      "lastName": new FormControl(child.lastName, [Validators.required]),
    });

    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      result => this.editChildForm.reset(),
      reason => this.editChildForm.reset()
    )
  }

  onAddChildSubmit(): void {
    this.childrenService.addChild(this.addChildForm).subscribe({
      next: value => {
        this.getChildren();
        this.showAddChildSnackbar = true;
        setTimeout(() => this.showAddChildSnackbar = false, 2900);
      },
      error: err => {
        console.log(err);
      }
    });
    this.addChildForm.reset();
  }

  onDeleteChildSubmit(): void {
    this.childrenService.deleteChild(this.childToDelete!.id).subscribe({
      next: () => {
        this.getChildren();
        this.showDeleteChildSnackbar = true;
        setTimeout(() => this.showDeleteChildSnackbar = false, 2900);
      },
      error: err => {
        console.log(err);
      }
    });
    this.resetChildToDelete();
  }

  onEditChildSubmit(): void {
    this.childrenService.editChild(this.editChildForm).subscribe({
      next: value => {
        this.getChildren();
        this.showEditChildSnackbar = true;
        setTimeout(() => this.showEditChildSnackbar = false, 2900);
      },
      error: err => {
        console.log(err);
      }
    });
    this.editChildForm.reset();
  }

  private resetChildToDelete(): void {
    this.childToDelete = null;
    this.isChildDeletable = false;
  }

  private getChildren(): void {
    this.childrenService.getChildren().subscribe({
      next: value => this.children = value.children,
      error: err => console.log(err)
    })
  }
}
