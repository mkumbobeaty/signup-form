import logo from '../asserts/logo.png';
import { Form, Input, Button, Modal } from 'antd';
import { WomanOutlined, ManOutlined, } from '@ant-design/icons';
import { useState } from 'react';

const labelCol = {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 24 },
    xl: { span: 24 },
    xxl: { span: 24 },
};

const wrapperCol = {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 24 },
    xl: { span: 24 },
    xxl: { span: 24 },
};

const SignInForm = () => {

    const [genders, setGenders] = useState([
        { name: 'Male', icon: <ManOutlined />, dataTestId: 'male', id: 1 },
        { name: 'Female', icon: <WomanOutlined />, dataTestId: 'female', id: 2 },
        { name: 'Others', icon: <WomanOutlined />, dataTestId: 'others', id: 3 }
    ]);
    const [genderSelected, setGenderSelected] = useState(null);

    const handleGenderClick = (name) => {
        setGenderSelected(name)
    };

    const onFinish = (values) => {
        const payload = { gender: genderSelected, ...values }
        Modal.success({
            title: 'User created successful',
            content: (
                <div>
                    <p>Email: {payload.email}</p>
                    <p>Password: {payload.password}.</p>
                    <p>Confirmed Password: {payload.confirm}.</p>
                    <p>Gender: {payload.gender} </p>
                </div>
            ),
            onOk() { },
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className="signInForm">
                <img src={logo} className="logo" alt="logo" />
                <h1>Sign Up with email</h1>
                <Form
                    name="signInForm"
                    labelCol={labelCol}
                    wrapperCol={wrapperCol}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Gender"
                        className="gender"
                        data-testid="gender"
                    >
                        {
                            genders.map(({ icon, name, id, dataTestId }) =>
                                <Button
                                    key={id} icon={icon}
                                    data-testid={dataTestId}
                                    onClick={() => handleGenderClick(name)}
                                >
                                    {name}
                                </Button>
                            )
                        }
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            { min: 6, message: 'Username must be minimum 6 characters.' },

                        ]}
                        hasFeedback
                    >
                        <Input.Password data-testid="password" />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={wrapperCol}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </>
    );
}

export default SignInForm;