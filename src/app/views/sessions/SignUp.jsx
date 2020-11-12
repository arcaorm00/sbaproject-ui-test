import React, { useCallback, useState, useRef, useEffect } from "react";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import { context as c } from '../../../context'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: '0px 8px 16px 0px',
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

/*
class SignUp extends Component {

  state = {
    name: "",
    email: "",
    password: "",
    geography: "",
    gender: "",
    age: "",
    agreement: ""
  }

  handleChange = e => {
    e.persist();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleFormSubmit = e => {
    e.preventDefault()
    axios.post('http://localhost:8080/api/members/insert', 
    {name: this.state.name, email: this.state.email, password: this.state.password})
    .then(
      
    ).catch()
  };
  render() {
    let { name, email, password, geography, gender, age } = this.state;
    return (
      <div className="signup flex flex-center w-100 h-100vh">
        <div className="p-8">
          <Card className="signup-card position-relative y-center">
            <Grid container>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <div className="p-32 flex flex-center bg-light-gray flex-middle h-100">
                  <img
                    src="/assets/images/illustrations/posting_photo.svg"
                    alt=""
                  />
                </div>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <div className="p-36 h-100">
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                    <TextValidator
                      className="mb-24 w-100"
                      variant="outlined"
                      label="Name"
                      onChange={this.handleChange}
                      type="text"
                      name="name"
                      value={name}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextValidator
                      className="mb-24 w-100"
                      variant="outlined"
                      label="Email"
                      onChange={this.handleChange}
                      type="email"
                      name="email"
                      value={email}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "this field is required",
                        "email is not valid"
                      ]}
                    />
                    <TextValidator
                      className="mb-16 w-100"
                      label="Password"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      value={password}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextValidator
                      className="mb-24 w-100"
                      variant="outlined"
                      label="Geography"
                      onChange={this.handleChange}
                      type="text"
                      name="geography"
                      value={geography}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    
                    <TextValidator
                      className="mb-24 w-100"
                      variant="outlined"
                      label="Gender"
                      onChange={this.handleChange}
                      type="text"
                      name="gender"
                      value={gender}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextValidator
                      className="mb-24 w-100"
                      variant="outlined"
                      label="Age"
                      onChange={this.handleChange}
                      type="number"
                      name="age"
                      value={age}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <FormControlLabel
                      className="mb-16"
                      name="agreement"
                      onChange={this.handleChange}
                      control={<Checkbox />}
                      label="I have read and agree to the terms of service."
                    />
                    <div className="flex flex-middle">
                      <Button
                        className="capitalize"
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Sign up
                      </Button>
                      <span className="ml-16 mr-8">or</span>
                      <Button
                        className="capitalize"
                        onClick={() =>
                          this.props.history.push("/session/signin")
                        }
                      >
                        Sign in
                      </Button>
                    </div>
                  </ValidatorForm>
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
}
*/


const SignUp = () => {

  const refForm = useRef();
  const classes = useStyles();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    geography: 'France',
    gender: 'Etc.',
    age: ''
  })
  const [agreement, setAgreement] = useState(0)
  const [isAlready, setIsAlready] = useState(false)

  const history = useHistory()

  const sessionMember = sessionStorage.getItem('sessionMember')
  useEffect(() => {
    if (sessionMember != null){ history.push('/')}
  })

  const handleChange = e => {
    e.persist();
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
    console.log(form)
  };

  const isExistMember = useCallback(async e => {
    try{
      const req = {
        method: c.get,
        url: `${c.url}/api/member/${form.email}`
      }
      const res = await axios(req)
      console.log(res.data)
      // alert(`isExistMember? ==> ${res.data.length > 0}`)
      if (res.data.length > 0){
        setIsAlready(true)
        return true
      }else{ return false}
    }catch(err){

    }
  })

  const handleFormSubmit = useCallback(async e => {
    try{
      e.preventDefault()

      let exist = false

      const req = {
        method: c.get,
        url: `${c.url}/api/member/${form.email}`
      }
      const res = await axios(req)
      console.log(res)
      // alert(`isExistMember? ==> ${res.data.length > 0}`)
      if (res.data != null){
        exist = true

      }else{ exist = false }

      // alert(isAlready)

      if (form.age < 18 || form.age > 99){
        alert('입력하신 나이를 확인해주세요.')
        return
      }else if(exist){
        alert('이미 존재하는 계정이거나 사용할 수 없는 계정입니다.')
      }else{
        const data = {
          email: form.email, 
          password: form.password, 
          name: form.name, 
          geography: form.geography, 
          gender: form.gender, 
          age: form.age,
          profile: 'noimage.png',
          tenure: 0,
          stock_qty: 0,
          balance: 0,
          has_credit: 0,
          credit_score: 0,
          is_active_member: 1,
          estimated_salary: 0,
          role: 'ROLE_USER',
          probability_churn: -1,
          exited: 0
        }
        const req = {
          method: c.post,
          url: `${c.url}/api/auth`,
          data: data,
          auth: c.auth
        }
        const res = await axios(req)
        alert('WELCOME!')
        history.push('/session/signin')
      } 
    }catch(err){
      alert('회원가입 실패')
      throw(err)
    }
  })

  const gender_option = [
    { label: "Etc.", velue: "Etc." },
    { label: "Male", velue: "Male" },
    { label: "Female", velue: "Female" },
  ]
  const geography_option = [
    { label: "France", velue: "France" },
    { label: "Germany", velue: "Germany" },
    { label: "Spain", velue: "Spain" },
  ]

  return (
    <div className="signup flex flex-center w-100 h-100vh">
      <div className="p-8">
        <Card className="signup-card position-relative y-center">
          <Grid container>
            <Grid item lg={5} md={5} sm={5} xs={12}>
              <div className="p-32 flex flex-center bg-light-gray flex-middle h-100">
                <img
                  src="/assets/images/illustrations/posting_photo.svg"
                  alt=""
                />
              </div>
            </Grid>
            <Grid item lg={7} md={7} sm={7} xs={12}>
              <div className="p-36 h-100">
                <ValidatorForm ref={refForm} onSubmit={handleFormSubmit}>
                  <TextValidator
                    className="mb-24 w-100"
                    variant="outlined"
                    label="Name"
                    onChange={handleChange}
                    type="text"
                    name="name"
                    value={form.name}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <TextValidator
                    className="mb-24 w-100"
                    variant="outlined"
                    label="Email"
                    onChange={handleChange}
                    type="email"
                    name="email"
                    value={form.email}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      "this field is required",
                      "email is not valid"
                    ]}
                  />
                  <TextValidator
                    className="mb-16 w-100"
                    label="Password"
                    variant="outlined"
                    onChange={handleChange}
                    name="password"
                    type="password"
                    value={form.password}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-geography-native-simple">Geography</InputLabel>
                    <Select
                      native
                      value={form.geography}
                      onChange={handleChange}
                      label="Geography"
                      inputProps={{
                        name: 'geography',
                        id: 'outlined-gender-native-simple',
                      }}
                      validators={["required"]} errorMessages={["this field is required"]}
                    >
                      {geography_option.map((row, idx) => (
                        <option value={row.value}>{row.label}</option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">Gender</InputLabel>
                    <Select
                      native
                      value={form.gender}
                      onChange={handleChange}
                      label="Gender"
                      inputProps={{
                        name: 'gender',
                        id: 'outlined-gender-native-simple',
                      }}
                      validators={["required"]} errorMessages={["this field is required"]}
                    >
                      {gender_option.map((row, idx) => (
                        <option value={row.value}>{row.label}</option>
                      ))}
                    </Select>
                  </FormControl>
                  {/* <TextValidator
                    className="mb-24 w-100"
                    variant="outlined"
                    label="Gender"
                    onChange={handleChange}
                    type="text"
                    name="gender"
                    value={form.gender||''}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  /> */}
                  <TextValidator
                    className="mb-24 w-100"
                    variant="outlined"
                    label="Age"
                    onChange={handleChange}
                    type="number"
                    name="age"
                    value={form.age||''}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <FormControlLabel
                    className="mb-16"
                    control={<Checkbox id="agreement" name="agreement" checked disabled onChange={e=>{setAgreement(agreement)}}/>}
                    label="I have read and agree to the terms of service."
                  />
                  <div className="flex flex-middle">
                    <Button
                      className="capitalize"
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Sign up
                    </Button>
                    <span className="ml-16 mr-8">or</span>
                    <Button
                      className="capitalize"
                      onClick={() =>
                        history.push("/session/signin")
                      }
                    >
                      Sign in
                    </Button>
                  </div>
                </ValidatorForm>
              </div>
            </Grid>
          </Grid>
        </Card>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  // setUser: PropTypes.func.isRequired
});

export default connect(
  mapStateToProps,
  {}
)(SignUp);
