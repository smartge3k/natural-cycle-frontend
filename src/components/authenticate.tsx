import { CustomWindow } from '../custom.windows'
import React, { Component } from 'react'
import { saveUser } from '../service'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { authentication } from '../firebase'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { Navigate } from 'react-router-dom'

declare let window: CustomWindow

class Authentication extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      otpSent: false,
      phoneNumber: '',
      otp: '',
    }
  }

  async verifyOtp() {
    let confirmationResult = window.confirmationResult

    try {
      await confirmationResult.confirm(this.state.otp)
      const response = await saveUser(this.state.phoneNumber)
      //TODO add btoa to save token in encryption form
      localStorage.setItem('token', response.token)

      window.location.reload()
    } catch (e) {
      alert('Wrong OTP')
      window.location.reload()
    }
  }

  onSignInSubmit = async () => {
    this.captcha()
    let appVerifier = window.recaptchaVerifier
    try {
      window.confirmationResult = await signInWithPhoneNumber(
        authentication,
        this.state.phoneNumber,
        appVerifier,
      )

      this.setState({
        otpSent: true,
      })
    } catch (e) {
      console.log(e)
    }
  }

  captcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: () => {},
      },
      authentication,
    )
  }

  render() {
    return (
      <div className={'d-flex justify-content-center'}>
        {!localStorage.getItem('token') ? (
          <Row style={{ width: '50%' }}>
            <Col className={'d-flex justify-content-center col-12'}>
              <FormGroup>
                <Label for="phoneNumber">Phone</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter you Phone Number i.e +49123456789"
                  onChange={(e) => {
                    this.setState({ phoneNumber: e.target.value })
                  }}
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col>
              <div id={'recaptcha-container'}> </div>
            </Col>
            {this.state.otpSent && (
              <Col className={'d-flex justify-content-center col-12'}>
                <FormGroup>
                  <Label for="otp">OTP</Label>
                  <Input
                    id="otp"
                    name="otp"
                    onChange={(e) => {
                      this.setState({ otp: e.target.value })
                    }}
                    type="text"
                  />
                </FormGroup>
              </Col>
            )}
            <Col className={'d-flex justify-content-center col-12'}>
              <Button
                onClick={() => {
                  this.state.otpSent ? this.verifyOtp() : this.onSignInSubmit()
                }}
                color="primary"
              >
                Save
              </Button>
            </Col>
          </Row>
        ) : (
          <Navigate to="/dashboard" />
        )}
      </div>
    )
  }
}

export default Authentication
