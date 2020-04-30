import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {



  feedbackForm: FormGroup;
  feedback: Feedback;
  contacttype = ContactType;
  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  }

  validationMessages = {
    'firstname': {
      'required': 'First Name is required',
      'minlength': 'First name must be at least 2 chars long',
      'maxlength': 'First name cannot be more than 25 chars long'
    },
    'lastname': {
      'required': 'Last Name is required',
      'minlength': 'Last name must be at least 2 chars long',
      'maxlength': 'Last name cannot be more than 25 chars long'
    },
    'telnum': {
      'required':'Tel. number is required',
      'pattern':'Tel. num must contain only numbers'
    },
    'email': {
      'required':'Email is required',
      'email':'Email is not in valid format'
    }
  }

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }


  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data))
    this.onValueChanged(); // reset form validation messages
  }

  onValueChanged(data?: any) {
    if(!this.feedbackForm){return;}

    const form = this.feedbackForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty &&!control.valid){
          const messages = this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }

  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }
}
