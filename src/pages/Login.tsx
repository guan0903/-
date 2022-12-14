import {
    AlipayCircleOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
  } from '@ant-design/icons';
  import {
    LoginForm,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
  } from '@ant-design/pro-components';
  import { message, Space, Tabs } from 'antd';
  import type { CSSProperties } from 'react';
  import {useNavigate} from "react-router-dom"
  import { useState } from 'react';
  import {from_login, from_register} from "../api/index"
  import {useDispatch} from "react-redux"
  import {RootDispatch} from "../utils/index"
  import QRcode from "qrcode.react"
  type LoginType = 'phone' | 'login' | 'register'| 'qrcode';
  
  const iconStyles: CSSProperties = {
    marginLeft: '16px',
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };
  
  export default () => {
    const navigate = useNavigate()
    const dispatch:RootDispatch = useDispatch()
    const [loginType, setLoginType] = useState<LoginType>('login');
    const onFinish = async(values:any)=>{
        console.log(values);
        if(loginType === "login"){
            console.log("登录");
            dispatch(from_login(values))
            navigate("/home")
        }else if(loginType === "register"){
            console.log("注册");
            dispatch(from_register(values))
        }
    }
    return (
      <div style={{ backgroundColor: 'white' }}>
        <LoginForm
          logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
          title="Github"
          subTitle="全球最大的代码托管平台"
          onFinish={onFinish}
          actions={
            <Space>
              其他登录方式
              <AlipayCircleOutlined style={iconStyles} />
              <TaobaoCircleOutlined style={iconStyles} />
              <WeiboCircleOutlined style={iconStyles} />
            </Space>
          }
        >
          <Tabs activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey as LoginType)}>
            <Tabs.TabPane key={'login'} tab={'账号密码登录'} />
            <Tabs.TabPane key={'register'} tab={'账号密码注册'} />
            <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
            <Tabs.TabPane key={'qrcode'} tab={'二维码登录'} />
          </Tabs>
          {loginType === 'login' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={'用户名: admin or user'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                placeholder={'密码: ant.design'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </>
          )}
          {loginType === 'register' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={'用户名: admin or user'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText
                name="register"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={'用户名: register'}
                rules={[
                  {
                    required: true,
                    message: '请输入!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                placeholder={'密码: ant.design'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </>
          )}
          {loginType === 'phone' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={'prefixIcon'} />,
                }}
                name="mobile"
                placeholder={'手机号'}
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'获取验证码'}`;
                  }
                  return '获取验证码';
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
                onGetCaptcha={async () => {
                  message.success('获取验证码成功！验证码为：1234');
                }}
              />
            </>
          )}
          {
            loginType === 'qrcode' && (
              <>
              <div>在这展示二维码</div>
              <QRcode imageSettings={{
                src:"https://github.githubassets.com/images/modules/logos_page/Octocat.png",
                width:30,
                height:30,
                excavate:true
              }}
              size = {200}
              fgColor="#eee"
              bgColor='green'
              value='http://www.baidu.com'
              />
              </>
            )
          }
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
    );
  };