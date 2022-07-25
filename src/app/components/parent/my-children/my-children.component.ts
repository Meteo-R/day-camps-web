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
  addChildForm!: FormGroup;
  childToDelete?: Child | null;
  isChildDeletable: boolean = false;

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

  onAddChildSubmit(): void {
    this.childrenService.addChild(this.addChildForm).subscribe({
      next: value => this.getChildren(),
      error: err => {
        console.log(err);
      }
    });
    this.addChildForm.reset();
  }

  onDeleteChildSubmit(): void {
    this.childrenService.deleteChild(this.childToDelete!.id).subscribe({
      next: () => this.getChildren(),
      error: err => {
        console.log(err);
      }
    });
    this.resetChildToDelete();
  }

  private resetChildToDelete() {
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
