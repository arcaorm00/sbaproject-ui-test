import React, { useState, useEffect, useCallback } from 'react'
import { Breadcrumb } from "matx"
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

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
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import InputAdornment from '@material-ui/core/InputAdornment'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { context as c } from '../../../context'

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
    marginBottom: theme.spacing(10),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(10),
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

  const sessionMember = sessionStorage.getItem("sessionMember")
  const history = useHistory()

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
    role: '',
    probability_churn: 0.0,
    exited: 0
  })
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [modalopen, setModalOpen] = useState(false)
  const [credit, setCredit] = useState('')

  const updateBtn = useCallback(async e => {
    alert(credit)
    try{
      if (isPasswordEdit){
        if (newPwd != confirmPwd){
          alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.\n다시 한번 확인해주십시오.')
          return
        }else if(newPwd.length < 4){
          alert('비밀번호는 네 자리 이상이어야 합니다.')
          return
        }else{ member.password = newPwd }
      }
      if (member.age < 18 || member.age > 99){
        alert('입력하신 나이를 확인해주십시오.')
        return
      }

      let re = window.confirm('회원 정보 수정을 요청하셨습니다. 계속해서 진행하시겠습니까?');
      if(re){
        if (credit != ''){
          let max = 850
          const min = 0
          member.has_credit = 1
          member.credit_score = Math.random() * (max - min) + min
          max = 250898
          member.balance = Math.floor(Math.random() * (max - min)) + min
        }
        const req = {
          method: c.put,
          url: `${c.url}/api/member/${sessionMember}`,
          data: member
        }
        const res = await axios(req)
        console.log(res.data)
        setActiveStep(activeStep + 1);  
      }
    }catch(err){
      alert('회원 정보 수정에 실패했습니다.')
      throw(err)
    }
  })

  const clickWithdrawBtn = useCallback(async e => {
    try{
      let re = window.confirm('회원 탈퇴를 요청하셨습니다.\n이후 같은 계정으로 회원가입 및 로그인이 불가능합니다.\n정말로 탈퇴하시겠습니까?')
      if (re){
        member.exited = 1
        const req = {
          method: c.put,
          url: `${c.url}/api/member/${sessionMember}`,
          data: member
        }
        const res = await axios(req)
        console.log(res.data)
        sessionStorage.removeItem('sessionMember')
        alert('탈퇴 처리 되었습니다. 이용해주셔서 감사합니다.')
        history.push('/')
      }
    }catch(err){
      throw(e)
    }
  })

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  }

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

  useEffect(() => {
    if (sessionMember == null){
      alert('로그인 후 이용 가능한 서비스입니다.')
      history.push('/session/signin')
    }else{
      getMember()
    }
  }, [])

  const getMember = useCallback(async e => {
    try{
      const req = {
        method: c.get,
        url:`${c.url}/api/member/${sessionMember}`
      }
      const res = await axios(req)
      setMemberInfo(res.data[0])
    }catch(err){
      throw(e)
    }
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
    e.persist()
    setMemberInfo({
      ...member,
      [e.target.name]: e.target.value
    })
    console.log(member)
  }

  const submitCredit = () => {
    setModalOpen(false)
  }

  const cancelCredit = () => {
    setModalOpen(false)
    setCredit('')

  }

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
      {/* <AppBar color="default" className={classes.appBar}>
        <Toolbar >
          <Typography variant="h6" color="inherit" noWrap>
            {member.name} 회원님 환영합니다.
          </Typography>
        </Toolbar>
      </AppBar> */}
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
                <br/>
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
                      type="password"
                      fullWidth
                      autoComplete="new-password"
                      onChange={e => setNewPwd(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="confirmNewPassword"
                      name="Confirmpassword"
                      label="ConfirmPassword"
                      type="password"
                      fullWidth
                      autoComplete="confirm-new-password"
                      onChange={e => setConfirmPwd(e.target.value)}
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
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="outlined-geography-native-simple">Geography</InputLabel>
                    <Select
                      native
                      value={member.geography}
                      onChange={handleChange}
                      label="Geography"
                      inputProps={{
                        name: 'geography',
                        id: 'geography',
                      }}
                      validators={["required"]} errorMessages={["this field is required"]}
                    >
                      {geography_option.map((row, idx) => (
                        <option value={row.value}>{row.label}</option>
                      ))}
                    </Select>
                  </FormControl>
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
                      type="number"
                      value={member.age}
                      fullWidth
                      autoComplete="age"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="estimated_salary"
                      name="estimated_salary"
                      label="Salary"
                      type="number" 
                      oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                      value={member.estimated_salary}
                      fullWidth
                      autoComplete="salary"
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoneyIcon fontSize="small"/>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                      label="Use this address for payment details"
                    />
                  </Grid> */}
                  {member.has_credit == 0
                  ? 
                  <Grid item xs={12} sm={12}>
                    <Button variant="outlined" color="default" fullWidth onClick={() => {setModalOpen(true)}}>거래 계좌 등록</Button>
                  </Grid>
                  :
                  <Grid item xs={12} sm={12}>
                    <Button variant="outlined" color="default" fullWidth onClick={() => {setModalOpen(true)}}>등록 카드 변경</Button>
                  </Grid>
                  }

                  <Dialog open={modalopen} onClose={() => {setModalOpen(false)}} fullWidth maxWidth='sm' aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">거래 계좌 등록</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        {member.has_credit == 0 ? '카드 정보를 입력해주세요.' : '새로 등록할 카드 정보를 입력해주세요.'}
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="credit_info"
                        label="Credit Card"
                        type="number"
                        value={credit}
                        fullWidth
                        onChange={(e) => setCredit(e.target.value)}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={cancelCredit} color="default">
                        취소
                      </Button>
                      <Button onClick={submitCredit} color="primary">
                        등록
                      </Button>
                    </DialogActions>
                  </Dialog>
                  
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
                    onClick={updateBtn}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? '저장' : '저장'}
                  </Button>
                </div>
                <Button className="border-radius-4 bg-light-error text-white px-8 py-2" onClick={clickWithdrawBtn}>탈퇴하기</Button>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        
      </main>
      
    </React.Fragment>
  );
}

export default AccountSetting
