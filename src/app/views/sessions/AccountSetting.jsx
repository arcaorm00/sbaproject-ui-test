import React, { useState, useEffect } from 'react'
import { Breadcrumb } from "matx"
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'

import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'absolute',
    align: 'center'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['회원 정보'];

const AccountSetting = () => {

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false)

  const handleNext = () => {
    let re = window.confirm('회원 정보 수정을 요청하셨습니다. 계속해서 진행하시겠습니까?');
    if (re){
      setActiveStep(activeStep + 1);
    }    
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const sessionMember = sessionStorage.getItem("sessionMember")

  const [member, setMemberInfo] = useState({
    email: '',
    password: '',
    name: '',
    profile: '', 
    geography: '', 
    gender: '', 
    age: 0, 
    tenure: 0, 
    stock_qty: 0, 
    balance: 0.0, 
    has_credit: 0, 
    credit_score: 0, 
    is_active_member: 1, 
    estimated_salary: 0.0, 
    role: ''
  })
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')

  const gender_option = [
    {
      label: "Etc.", velue: "Etc."
    },
    {
      label: "Male", velue: "Male"
    },
    {
      label: "Female", velue: "Female"
    },
  ]

  useEffect(() => {
    axios.get(`http://localhost:8080/api/member/${sessionMember}`)
    .then( res => {
      setMemberInfo(res.data[0])
    })
    .catch( e => {
      alert('BYE')
      throw e
    })
  }, [])
  
  const clickEditPassword = () => {
    if (isPasswordEdit == true) {
      document.getElementById('pwdEditBtn').innerText ='비밀번호 수정'
      setIsPasswordEdit(false)
    }else{
      document.getElementById('pwdEditBtn').innerText ='수정 취소'
      setIsPasswordEdit(true)
    }
  }

  const handleChange = e => {
    e.persist();
    setMemberInfo({
      ...member,
      [e.target.name]: e.target.value
    })
    console.log(member)
  };

  return (
    <React.Fragment>
      <div className="m-sm-30">
          <div  className="mb-sm-30">
            <Breadcrumb
              routeSegments={[
                { name: "계정 관리" }
              ]}
            />
          </div>
      </div>

      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar >
          <Typography variant="h6" color="inherit" noWrap>
            {member.name} 회원님 환영합니다.
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            회원 정보 관리
          </Typography>
          {/* <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper> */}
          <br/>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  회원님의 정보가 수정되었습니다.
                </Typography>
                <Typography variant="subtitle1">
                  입력하신 내용대로 수정이 반영되었습니다.<br/>
                  항상 함께 해주셔서 감사합니다.
                  오늘도 건승하십시오.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {/* AccountForm */}

                <Typography variant="h6" gutterBottom>
                  Account Setting
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Email"
                      value={member.email}
                      fullWidth
                      disabled
                      autoComplete="given-name"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      required
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      value={member.password}
                      fullWidth
                      disabled
                      autoComplete="password"
                      style={{display: 'inline-block'}}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button 
                    id="pwdEditBtn"
                    size="small"
                    fullWidth
                    className="m-0"
                    variant="outlined"
                    color="default"
                    onClick={clickEditPassword}
                    >
                      비밀번호 수정
                    </Button>
                  </Grid>
                  {isPasswordEdit == true 
                  ? <>
                  <Grid item xs={12}>
                    <TextField
                      id="newPassword"
                      name="newpassword"
                      label="NewPassword"
                      fullWidth
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="confirmNewPassword"
                      name="Confirmpassword"
                      label="ConfirmPassword"
                      fullWidth
                      autoComplete="confirm-new-password"
                    />
                  </Grid>
                  </>
                  :
                  null 
                  }
                  
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="name"
                      name="name"
                      label="Name"
                      value={member.name}
                      fullWidth
                      disabled
                      autoComplete="family-name"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="geography"
                      name="geography"
                      label="Geography"
                      value={member.geography}
                      fullWidth
                      autoComplete="geography"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="outlined-age-native-simple">Gender</InputLabel>
                    <Select
                      native
                      value={member.gender}
                      onChange={handleChange}
                      label="Gender"
                      inputProps={{
                        name: 'gender',
                        id: 'gender',
                      }}
                      validators={["required"]} errorMessages={["this field is required"]}
                    >
                      {gender_option.map((row, idx) => (
                        <option value={row.value}>{row.label}</option>
                      ))}
                    </Select>
                    </FormControl>
                    {/* <TextField
                      id="gender"
                      name="gender"
                      label="Gender"
                      value={member.gender}
                      fullWidth
                      autoComplete="gender"
                    /> */}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="age"
                      name="age"
                      label="Age"
                      value={member.age}
                      fullWidth
                      autoComplete="age"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="salary"
                      name="salary"
                      label="Salary"
                      value={member.estimated_salary}
                      fullWidth
                      autoComplete="salary"
                      onChange={handleChange}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                      label="Use this address for payment details"
                    />
                  </Grid> */}
                </Grid>

                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      취소
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? '저장' : '저장'}
                  </Button>
                </div>
                <Button className="border-radius-4 bg-light-error text-white px-8 py-2">탈퇴하기</Button>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        
      </main>
      
    </React.Fragment>
  );
}

export default AccountSetting
