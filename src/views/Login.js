import React, { Component } from 'react';
import '../App.css';

import {
  Form, Icon, Input, Button, Checkbox, Row, Col, Modal
} from 'antd';
import loginImage from '../images/stte.png';
import logo from '../images/logo.png';
import API from "../tools/API";
import Notifications from "../tools/Notifications";

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
      render() {
        const {
          visible, onCancel, onCreate, form, loading
        } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title="Restablecer contraseña"
            okText="Enviar"
            onCancel={onCancel}
            okButtonProps={{ disabled: loading, loading:loading }}
            onOk={onCreate}>
            <Form layout="vertical">
              <Form.Item label="Correo electrónico" type="email">
                {getFieldDecorator('correo', {
                  rules: [{ required: true, message: 'Por favor introduce tu correo electrónico' }],
                })(
                  <Input />
                )}
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    }
  );
  

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    visible: false,
      loading: false,
      rememberMe: true
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      this.setState({ loading: true });
      form.resetFields();
      API.call('addTokenAdmin',{email:values.correo},(response)=>{
          if(response.resp === 1){
              Notifications.openNotificationWithIcon("success","Revisa tu correo electronico","")
              this.setState({ visible: false  });
          }else{
              Notifications.openNotificationWithIcon("warning","Error",response.detail)
          }
          this.setState({ loading: false  });

      });
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error) {
          this.setState({ loading: true });
        API.call('boolAdminLogin',{email:values.userName,password:values.password,remember:values.remember ? 1:0},(response) => {
            console.log(response);
            this.setState({ loading: false });
            if (response.resp === 1){
                Notifications.openNotificationWithIcon("success","Inicio de sesión exitoso","");
                API.cookies.set('token',response.data[0][1]);
                window.location = "/dashboard";
            }else{
                Notifications.openNotificationWithIcon("error","Error",response.detail)
            }
        });

      }
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form;

    return (
      <div className="App">
        <Row>
          <Col xs={0} sm={0} md={0} lg={12} xl={14}>
            <div className="login-image-container">
              <img className="login-image" src={loginImage} alt={''}/>
            </div>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={10}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <div className="logo-image-container">
                <img className="logo-image" src={logo} alt={''}/>
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
                <a className="login-form-right" onClick={this.showModal}>¿Olvidaste tu contraseña?</a>
                <br></br>
                <Button type="primary" htmlType="submit" className="login-form-button"
                        loading={this.state.loading} disabled={this.state.loading}>
                  Accesar
                </Button> 
                <br></br>
              </Form.Item>
            </Form>
            <CollectionCreateForm
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.visible}
                loading={this.state.loading}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}/>
          </Col>
        </Row>
      </div>      
    );
  }
}


const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedNormalLoginForm;
