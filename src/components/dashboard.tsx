import { Component } from 'react'
import { Navigate } from 'react-router-dom'
import { getUserData, updateUser } from '../service'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'

class Dashboard extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      user: undefined,
      readyToSend: false,
      name: '',
      email: '',
      logout: false,
    }
  }

  async componentDidMount() {
    try {
      const user = await getUserData()
      this.setState({
        user: user,
        name: user.name,
        email: user.email,
      })
    } catch (error) {
      localStorage.removeItem('token')
      alert('Invalid Token')
    }
  }
  handleChange = (event: any) => {
    const { name, value } = event.target
    this.setState({ [name]: value })

    this.checkValidation()
  }

  checkValidation = () => {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    const { name, email } = this.state

    if (name !== '' && expression.test(email)) {
      this.setState({
        readyToSend: true,
      })
    } else {
      this.setState({
        readyToSend: false,
      })
    }
  }

  update = async () => {
    const { name, email } = this.state
    try {
      const updatedUser = await updateUser({ name: name, email: email })
      this.setState({
        user: updatedUser,
      })
    } catch (e) {
      localStorage.removeItem('token')
      alert('Invalid Token')
    }
  }

  render() {
    return (
      <div className={'d-flex justify-content-center'}>
        {!localStorage.getItem('token') ? (
          <Navigate to="/" />
        ) : this.state.user ? (
          <Row style={{ width: '50%' }}>
            <Col className={'d-flex justify-content-center col-12'}>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  defaultValue={this.state.user.email}
                  onChange={(e) => this.handleChange(e)}
                  placeholder="with a placeholder"
                  type="email"
                />
              </FormGroup>
            </Col>
            <Col className={'d-flex justify-content-center col-12'}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  id="name"
                  defaultValue={this.state.user.name}
                  onChange={(e) => this.handleChange(e)}
                  name="name"
                  placeholder="Name"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className={'d-flex justify-content-end col-6'}>
              <FormGroup>
                <Button
                  onClick={this.update}
                  disabled={!this.state.readyToSend}
                  color={'primary'}
                >
                  Save
                </Button>
              </FormGroup>
            </Col>
            <Col className={'d-flex justify-content-start col-6'}>
              <FormGroup>
                <Button
                  onClick={() => {
                    localStorage.removeItem('token')
                    this.setState({
                      logout: true,
                    })
                  }}
                  color={'danger'}
                >
                  Logout
                </Button>
              </FormGroup>
            </Col>
          </Row>
        ) : (
          <div>Loading...</div>
        )}

        {this.state.logout && <Navigate to="/" />}
      </div>
    )
  }
}

export default Dashboard
