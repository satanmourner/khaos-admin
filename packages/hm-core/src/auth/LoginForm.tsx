import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Card, Form, Input } from 'antd';
import { SimpleButton } from 'hm-components';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { AuthContext } from './AuthContext';

interface FormData {
  username: string;
  password: string;
}

interface LoginFormProps {
  defaultRoute?: string;
  cardClassName?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ defaultRoute = '/', cardClassName }) => {
  const { login, loginRequest } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (data: FormData) => {
    try {
      const creds = await loginRequest(data.username, data.password);
      login(creds);
      navigate(defaultRoute);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={`${cardClassName} d-flex flex-column`} title="ورود به سیستم">
      <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off">
        <Form.Item name="username" rules={[{ required: true, message: 'نام کاربری را لطفا وارد نمایید!' }]}>
          <Input placeholder="نام کاربری" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'رمز عبور را لطفا وارد نمایید!' }]}
          className="my-4"
        >
          <Input.Password
            placeholder="رمز عبور"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item>
          <SimpleButton htmlType="submit" title="ورود" type="primary" block />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginForm;
