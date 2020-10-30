import React, { useCallback, useState, useRef } from "react";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  withStyles,
  CircularProgress
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter, useHistory } from "react-router-dom";
import { context as c } from '../../../context'
import axios from 'axios'

import { loginWithEmailAndPassword } from "../../redux/actions/LoginActions";

const styles = theme => ({
  wrapper: {
    position: "relative"
  },

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

const SignIn = (props) => {

  const refForm = useRef();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreement, setAgreement] = useState('')

  const history = useHistory()

  const login = useCallback(async e =>{
    e.preventDefault()
    alert(`${email}, ${password}`)
    try{
      const req = {
        method: c.post,
        url: `${c.url}/api/access`,
        data: {email, password},
        auth: c.auth
      }
      const res = await axios(req)
      alert(`Welcome! ${res.data["name"]}`)
      sessionStorage.setItem("sessionMember", res.data['email'])
      history.push("/") 
    }catch (error){
      alert(`Please check your ID or password!`)
      window.location.reload()
    }
  }, [])

  const handleFormSubmit = event => {
    event.preventDefault()
    alert(`${email}, ${password}`)
    axios.post(`http://localhost:8080/api/access`, {email, password})
    .then(res => {
      alert(`Welcome! ${res.data["name"]}`)
      sessionStorage.setItem("sessionMember", res.data['email'])
      
      history.push("/") 
    })
    .catch(err => {
      alert(`Please check your ID or password!`)
      window.location.reload()
    })
  };

  let { classes } = props;
  return (
    <div className="signup flex flex-center w-100 h-100vh">
      <div className="p-8">
        <Card className="signup-card position-relative y-center">
          <Grid container>
            <Grid item lg={5} md={5} sm={5} xs={12}>
              <div className="p-32 flex flex-center flex-middle h-100">
                <img src="/assets/images/illustrations/dreamer.svg" alt="" />
              </div>
            </Grid>
            <Grid item lg={7} md={7} sm={7} xs={12}>
              <div className="p-36 h-100 bg-light-gray position-relative">
                <ValidatorForm ref={refForm} onSubmit={handleFormSubmit}>
                  <TextValidator
                    className="mb-24 w-100"
                    variant="outlined"
                    label="Email"
                    onChange={e => {setEmail(e.target.value)}}
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
                    onChange={e => {setPassword(e.target.value)}}
                    name="password"
                    type="password"
                    value={password}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <FormControlLabel
                    className="mb-8"
                    name="agreement"
                    onChange={e => {setAgreement(e.target.value)}}
                    control={<Checkbox checked />}
                    label="I have read and agree to the terms of service."
                  />
                  <div className="flex flex-middle mb-8">
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={props.login.loading}
                        type="submit"
                      >
                        Sign in to Enter Dashboard
                      </Button>
                      {props.login.loading && (
                        <CircularProgress
                          size={24}
                          
                        />
                      )}
                    </div>
                    <span className="ml-16 mr-8">or</span>
                    <Button
                      className="capitalize"
                      onClick={() =>
                        history.push("/session/signup")
                      }
                    >
                      Sign up
                    </Button>
                  </div>
                  <Button
                    className="text-primary"
                    onClick={() =>
                      history.push("/session/forgot-password")
                    }
                  >
                    Forgot password?
                  </Button>
                </ValidatorForm>
              </div>
            </Grid>
          </Grid>
        </Card>
      </div>
    </div>
  );
}

// class SignIn extends Component {

//   state = {
//     email: "example@example.com",
//     password: "testpass",
//     agreement: ""
//   };

//   handleChange = event => {
//     event.persist();
//     this.setState({
//       [event.target.name]: event.target.value
//     });
//   };
//   handleFormSubmit = event => {
//     event.preventDefault()
//     // alert(`${this.state.email}, ${this.state.password}`)

//     axios.post('http://localhost:8080/api/member/get-by-email', {email: `${this.state.email}`})
//     .then( res => {
//       console.log(res)
//     })
//     .catch( err => alert(err))
//     // this.props.loginWithEmailAndPassword({ ...this.state });
//   };
//   render() {
//     let { email, password } = this.state;
//     let { classes } = this.props;
//     return (
//       <div className="signup flex flex-center w-100 h-100vh">
//         <div className="p-8">
//           <Card className="signup-card position-relative y-center">
//             <Grid container>
//               <Grid item lg={5} md={5} sm={5} xs={12}>
//                 <div className="p-32 flex flex-center flex-middle h-100">
//                   <img src="/assets/images/illustrations/dreamer.svg" alt="" />
//                 </div>
//               </Grid>
//               <Grid item lg={7} md={7} sm={7} xs={12}>
//                 <div className="p-36 h-100 bg-light-gray position-relative">
//                   <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
//                     <TextValidator
//                       className="mb-24 w-100"
//                       variant="outlined"
//                       label="Email"
//                       onChange={this.handleChange}
//                       type="email"
//                       name="email"
//                       value={email}
//                       validators={["required", "isEmail"]}
//                       errorMessages={[
//                         "this field is required",
//                         "email is not valid"
//                       ]}
//                     />
//                     <TextValidator
//                       className="mb-16 w-100"
//                       label="Password"
//                       variant="outlined"
//                       onChange={this.handleChange}
//                       name="password"
//                       type="password"
//                       value={password}
//                       validators={["required"]}
//                       errorMessages={["this field is required"]}
//                     />
//                     <FormControlLabel
//                       className="mb-8"
//                       name="agreement"
//                       onChange={this.handleChange}
//                       control={<Checkbox checked />}
//                       label="I have read and agree to the terms of service."
//                     />
//                     <div className="flex flex-middle mb-8">
//                       <div className={classes.wrapper}>
//                         <Button
//                           variant="contained"
//                           color="primary"
//                           disabled={this.props.login.loading}
//                           type="submit"
//                         >
//                           Sign in to Enter Dashboard
//                         </Button>
//                         {this.props.login.loading && (
//                           <CircularProgress
//                             size={24}
//                             className={classes.buttonProgress}
//                           />
//                         )}
//                       </div>
//                       <span className="ml-16 mr-8">or</span>
//                       <Button
//                         className="capitalize"
//                         onClick={() =>
//                           this.props.history.push("/session/signup")
//                         }
//                       >
//                         Sign up
//                       </Button>
//                     </div>
//                     <Button
//                       className="text-primary"
//                       onClick={() =>
//                         this.props.history.push("/session/forgot-password")
//                       }
//                     >
//                       Forgot password?
//                     </Button>
//                   </ValidatorForm>
//                 </div>
//               </Grid>
//             </Grid>
//           </Card>
//         </div>
//       </div>
//     );
//   }
// }

const mapStateToProps = state => ({
  loginWithEmailAndPassword: PropTypes.func.isRequired,
  login: state.login
});
export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      { loginWithEmailAndPassword }
    )(SignIn)
  )
);