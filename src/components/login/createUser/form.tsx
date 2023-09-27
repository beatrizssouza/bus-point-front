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
  username?: string;
};

export default function FormCadastroLogin() {
  const [form] = Form.useForm();

  const name = Form.useWatch("name", form);
  const email = Form.useWatch("email", form);
  const password = Form.useWatch("password", form);
  const phone = Form.useWatch("phone", form);

  function sendNewUser() {
    console.log("oi")
    // const user: IUserDataPost = {
    //   name: name,
    //   email: email,
    //   password: password,
    //   phone: phone,
    // };

    // LoginDataService.create(user).then((response) => {
    //   console.log(response);
    // });
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, marginTop: "30px" ,margin: "10px"}}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
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

      <Form.Item<FieldType>
        label="username"
        name="username"
        rules={[
          { required: true, message: "Por favor coloque o seu username!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit"  style={{background: "#141218"}}onClick={() => sendNewUser()}>
          Cadastrar
        </Button>
      </Form.Item>
    </Form>
  );
}
