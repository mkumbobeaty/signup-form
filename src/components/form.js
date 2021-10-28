import logo from '../asserts/logo.png';
import { Form, Input, Button, Modal } from 'antd';
import { WomanOutlined, ManOutlined, } from '@ant-design/icons';

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

const genders = [
    { name: 'Male', icon: <ManOutlined />, dataTestId: 'male', id: 1 },
    { name: 'Female', icon: <WomanOutlined />, dataTestId: 'female', id: 2 },
    { name: 'Others', icon: <WomanOutlined />, dataTestId: 'others', id: 3 }
]

const SignInForm = ({ handleSubmit, setGenderSelected, genderSelected }) => {

    const handleGenderClick = (name) => {
        setGenderSelected(name)
    };

    const onFinish = (values) => {
        const payload = { gender: genderSelected, ...values }
        handleSubmit(payload)

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
        <div className="form-conatiner">
            <section className="signInForm">
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
                    data-testid="form"

                >

                  {/* start of gender */}
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
                    {/* end of gender*/}

                    {/* start of gender*/}
                    <Form.Item
                        label="E-mail"
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
                        <Input className="formInput" />
                    </Form.Item>
                     {/* end of email*/}

                    {/* start  password */}
                    <Form.Item
                        name="password"
                        label="Create Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            { min: 6, message: 'Username must be minimum 6 characters.' },

                        ]}
                        hasFeedback
                    >
                        <Input.Password data-testid="password" className="formInput" />
                    </Form.Item>
                    {/* end of password */}

                    {/* start of confirm password */}
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
                        <Input.Password className="formInput" />
                    </Form.Item>
                    {/* end of confirm password */}

                    {/* start of buttom */}
                    <Form.Item
                        wrapperCol={wrapperCol}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            data-testid="submit"
                            className="signUpButton"
                            size="large"
                        >
                            Sign Up
                        </Button>
                    </Form.Item>
                 {/* end of buttom */}

                </Form>
                <div className="formFooter" data-testid="formFooter">
                    <p>Already have an account <a href='/'>Log In</a></p>
                    <p>Review privacy and disclosures <a href="/">here</a></p>
                </div>
            </section>
        </div>
    );
}

export default SignInForm;