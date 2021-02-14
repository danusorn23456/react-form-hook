import './App.css';
import { useRef, useState } from 'react';

export default function useForm() {

  const formRef = useRef({})

  const [errors, setErrors] = useState({});

  function registerRef(key, cb) {
    return function (el) {
      formRef.current[key] = {
        element:el,
        ...cb,
      };
      setErrors(Object.assign(errors, { [key]: { type: ""} }))
    }
  }

  function watch(key){
    let targetRef = formRef.current[key] || null;
    if(!targetRef)return;
    return targetRef.element.value;
  }

  function useSubmit(cb) {
    
    return function (event){
      event.preventDefault();
      
      for (let key in formRef.current) {

        let currentInput = formRef.current[key];
        let errorState = Object.assign({}, errors);
        errorState[key].type = '';
  
        if (currentInput.hasOwnProperty('min')) {
          if (currentInput.element.value.length < currentInput.min) {
            errorState[key].type = 'min'
          }
        }
        
        if (currentInput.hasOwnProperty('max')) {
          if (currentInput.element.value.length > currentInput.max) {
            errorState[key].type = 'max'
          }
        }
  
        if (currentInput.hasOwnProperty('pattern')){
          let reg = new RegExp(currentInput.pattern);
          if (!reg.test(currentInput.element.value)) {
            errorState[key].type = 'pattern'
         }
        }
  
        if (currentInput.hasOwnProperty('required') && currentInput.element.value.length <= 0) {
          errorState[key].type = 'required'
        }
  
        setErrors({ ...errors }, errorState)
      }
  
  
      // check if no any error
      for (let key in errors) {
        if(errors[key].type != '')return;
      }
      //clear
      for (let key in formRef.current) {
        formRef.current[key].element.value="";
      }

      setErrors({});

      //use callback
      cb();
  
    }
  }

  return {
      errors,
      registerRef,
      useSubmit,
      watch,
  }
}

