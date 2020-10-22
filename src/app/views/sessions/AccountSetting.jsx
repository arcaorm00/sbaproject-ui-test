import React from 'react'
import { Breadcrumb } from "matx"
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

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
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    let re = window.confirm('회원 정보 수정을 요청하셨습니다. 계속해서 진행하시겠습니까?');
    if (re){
      setActiveStep(activeStep + 1);
    }    
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
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
            OO 회원님 환영합니다.
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
                      fullWidth
                      disabled
                      autoComplete="given-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="password"
                      name="password"
                      label="Password"
                      fullWidth
                      autoComplete="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="newpassword"
                      name="newpassword"
                      label="NewPassword"
                      fullWidth
                      hidden
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="name"
                      name="name"
                      label="Name"
                      fullWidth
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="geography"
                      name="geography"
                      label="Geography"
                      fullWidth
                      autoComplete="geography"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="gender"
                      name="gender"
                      label="Gender"
                      fullWidth
                      autoComplete="gender"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="age"
                      name="age"
                      label="Age"
                      fullWidth
                      autoComplete="age"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="creditScore"
                      name="creditScore"
                      label="CreditScore"
                      fullWidth
                      autoComplete="CreditScore"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="salary"
                      name="salary"
                      label="Salary"
                      fullWidth
                      autoComplete="salary"
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
