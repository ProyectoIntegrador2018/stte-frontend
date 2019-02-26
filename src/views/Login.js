import React, { Component } from 'react';
import '../App.css';

import "antd/dist/antd.css";
import {
  Form, Icon, Input, Button, Checkbox, Row, Col
} from 'antd';
import loginImage from '../images/stte.png';
import logo from '../images/logo.png';

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error) {
        console.log('Valores recibidos ', values);
      }
    });
  }

  render() {

    const { getFieldDecorator } = this.props.form;

    return (
      <div className="App">
        <Row>
          <Col xs={0} sm={0} md={0} lg={12} xl={14}>
            <div className="login-image-container">
              <img className="login-image" src={loginImage}/>
            </div>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={10}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <div className="logo-image-container">
                <img className="logo-image" src={logo}/>
              </div>
              <Form.Item>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Por favor ingresa el usuario' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Usuario" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Por favor ingresa la contraseña' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>Recuérdame</Checkbox>
                )}
                <a className="login-form-right" href="">¿Olvidaste tu contraseña?</a>
                <br></br>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button> 
                <br></br>
                <a className="login-form-right" ref="">Registrarse</a>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>      
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;