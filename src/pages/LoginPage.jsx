import LoginForm from "../components/LoginForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  
  const handleLogin = async (e, formData) => {
    e.preventDefault();
    const res = await axios.post('/api/auth', formData);
    // console.log(res.data);
    if (res.data.success) {
      navigate('/me');
    }
  };
  return (
    <div className="body">
      <h1 className="page-title">Log In</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}

