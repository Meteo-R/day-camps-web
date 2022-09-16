import { Component, OnInit } from '@angular/core';
import {DayCamp} from "../../../model/interfaces/day-camp";
import {SchoolDayCampsService} from "../../../services/school-day-camps.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-my-day-camps',
  templateUrl: './my-day-camps.component.html',
  styleUrls: ['./my-day-camps.component.css']
})
export class MyDayCampsComponent implements OnInit {
  public futureDayCamps?: DayCamp[];
  public ongoingDayCamps?: DayCamp[];
  public pastDayCamps?: DayCamp[];
  public addDayCampForm!: FormGroup;
  public editDayCampForm!: FormGroup;
  public showAddDayCampSnackbar: boolean = false;
  public showEditDayCampSnackbar: boolean = false;

  constructor(
    private schoolDayCampsService: SchoolDayCampsService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.addDayCampForm = new FormGroup({
      "name": new FormControl(null, [Validators.required]),
      "description": new FormControl(null, [Validators.required]),
      "startDate": new FormControl(null, [Validators.required, MyDayCampsComponent.startDateMustBeFutureValidator]),
      "endDate": new FormControl(null, [Validators.required]),
      "price": new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9][0-9]?)?$/)]),
      "capacity": new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    },{validators:MyDayCampsComponent.endDateNotBeforeStartDateValidator});

    this.editDayCampForm = new FormGroup({
      "id": new FormControl(null),
      "name": new FormControl(null, [Validators.required]),
      "description": new FormControl(null, [Validators.required]),
      "startDate": new FormControl(null, [Validators.required, MyDayCampsComponent.startDateMustBeFutureValidator]),
      "endDate": new FormControl(null, [Validators.required]),
      "price": new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9][0-9]?)?$/)]),
      "capacity": new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    },{validators:MyDayCampsComponent.endDateNotBeforeStartDateValidator});

    this.getDayCamps();
  }

  private static startDateMustBeFutureValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = new Date(control.value);
    const today = new Date();

    const isDateValid: boolean = startDate > today;
    return isDateValid ? null : {startDateBeforeTomorrow: control.value}
  }

  private static endDateNotBeforeStartDateValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    const isDateValid = new Date(endDate) >= new Date(startDate);
    return isDateValid ? null : {endDateBeforeStartDate: endDate}
  }

  openAddDayCampModal(modal: any) {
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      result => this.addDayCampForm.reset(),
      reason => this.addDayCampForm.reset()
    )
  }

  onAddDayCampSubmit() {
    this.schoolDayCampsService.addDayCamp(this.addDayCampForm).subscribe({
      next: value => {
        this.getDayCamps();
        this.showAddDayCampSnackbar = true;
        setTimeout(() => this.showAddDayCampSnackbar = false, 2900);
      },
      error: err => {
        console.log(err);
      }
    });
    this.addDayCampForm.reset();
  }

  openEditDayCampModal(modal: any, dayCamp: DayCamp) {
    this.editDayCampForm = new FormGroup({
      "id": new FormControl(dayCamp.id),
      "name": new FormControl(dayCamp.name, [Validators.required]),
      "description": new FormControl(dayCamp.description, [Validators.required]),
      "startDate": new FormControl({
        value: dayCamp.startDate,
        disabled: dayCamp.numberOfEnrolled
      }, [Validators.required, MyDayCampsComponent.startDateMustBeFutureValidator]),
      "endDate": new FormControl({value: dayCamp.endDate, disabled: dayCamp.numberOfEnrolled}, [Validators.required]),
      "price": new FormControl(dayCamp.price, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9][0-9]?)?$/)]),
      "capacity": new FormControl(dayCamp.capacity, [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(dayCamp.numberOfEnrolled)]),
    }, {validators: MyDayCampsComponent.endDateNotBeforeStartDateValidator});

    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      result => this.editDayCampForm.reset(),
      reason => this.editDayCampForm.reset()
    )
  }

  onEditDayCampSubmit() {
    this.schoolDayCampsService.editDayCamp(this.editDayCampForm).subscribe({
      next: value => {
        this.getDayCamps();
        this.showEditDayCampSnackbar = true;
        setTimeout(() => this.showEditDayCampSnackbar = false, 2900);
      },
      error: err => {
        console.log(err);
      }
    });
    this.addDayCampForm.reset();
  }

  private getDayCamps(): void {
    this.schoolDayCampsService.getFutureDayCamps().subscribe({
      next: value => {
        this.futureDayCamps = value.dayCamps;
      },
      error: err => {
        console.log(err);
      }
    })
    this.schoolDayCampsService.getOngoingDayCamps().subscribe({
      next: value => {
        this.ongoingDayCamps = value.dayCamps;
      },
      error: err => {
        console.log(err);
      }
    })
    this.schoolDayCampsService.getPastDayCamps().subscribe({
      next: value => {
        this.pastDayCamps = value.dayCamps;
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
