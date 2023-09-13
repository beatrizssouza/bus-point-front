import { Card } from "antd";
import './cardLogin.css'; 
import FormCardLogin from "./formLogin/form";
export default function CardLogin() {
  return (
    <div className="cardLogin">
      <Card className="card" style={{ width: 400, height:400}}>
        <FormCardLogin />
      </Card>
    </div>
  );
}
