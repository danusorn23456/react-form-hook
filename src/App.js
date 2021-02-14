import './App.css';
import useForm from './myForm';


function App() {

  let { errors, useSubmit, registerRef ,watch } = useForm();

  function myHandle(){
    alert('this function will run if no any errors . . .')
    console.log('input_a = ',watch('input_a'));
    console.log('input_b = ',watch('input_b'));
  }

  function ifError(key) {
    if(!errors[key])return;
    return errors[key].type;
  }

  return (
    <div className="container-fuild">
      <div className="container">
        <form className="form" onSubmit={useSubmit(myHandle)}>
          <div className="form-field">
            <label>username</label>
            <input tabIndex="0" 
            className={`input ${errors.username && (errors.username.type ? 'input-error' : 'input-no-error')}`} 
            ref={registerRef('username', { min: 4, required: true, max: 9 })} type="text" placeholder="username" />
            {errors.username && errors.username.type === 'required' ? <p className="error-msg">error : required value</p> : null}
            {errors.username && errors.username.type === 'min' ? <p className="error-msg">error : min length 4</p> : null}
            {errors.username && errors.username.typw === 'max' ? <p className="error-msg">error : max length 9</p> : null}
          </div>
          <div className="form-field">
            <label>password</label>
            <input tabIndex="0" 
            className={`input ${errors.password && (errors.password.type ? 'input-error' : 'input-no-error')}`} 
            ref={registerRef('password', { required: true, pattern: "^[0-9]+$" })} type="text" placeholder="password" />
            {errors.password && errors.password.type === 'required' ? <p className="error-msg">error : required value</p> : null}
            {errors.password && errors.password.type === 'pattern' ? <p className="error-msg">error : only number</p> : null}
          </div>
          <button className="btn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
