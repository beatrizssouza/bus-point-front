import { Card } from "antd";
import "./login.css";
import FormCardLogin from "./formLogin/form";

export default function Login(){
    return (
        <div>
          <div className="cardLogin">
            <Card className="card" style={{ width: 400, height: 400 }}>
              <FormCardLogin />
            </Card>
          </div>
        </div>
      );
}

