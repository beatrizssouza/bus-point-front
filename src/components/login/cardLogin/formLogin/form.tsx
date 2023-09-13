import React from "react";
import { Button, Form, Input } from "antd";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  name?: string;
  password?: string;
};

export default function FormCardLogin() {
  const [form] = Form.useForm();

  const name = Form.useWatch("name", form);
  const password = Form.useWatch("password", form);

  //   function sendNewUser() {
  //     const user: IUserDataPost = {
  //       name: name,
  //       email: email,
  //       password: password,
  //       phone: phone,
  //     };

  //     LoginDataService.create(user).then((response) => {
  //       console.log(response);
  //     });
  //   }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
      style={{ marginRight: "5%" }}
    >
      <Form.Item<FieldType>
        label="Nome"
        name="name"
        rules={[{ required: true, message: "Por favor coloque o seu nome!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Senha"
        name="password"
        rules={[{ required: true, message: "Coloque a sua senha!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            marginTop: "30px",
            background: "#141218",
            width: "100px"
          }}
          href="/cadastro-login"
        >
          Entrar
        </Button>


      </Form.Item>
    </Form>
  );
}
