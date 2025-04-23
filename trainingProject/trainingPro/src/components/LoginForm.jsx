import { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../auth/loginComp/InputField';
import PasswordField from '../auth/loginComp/PasswordField';
import CheckboxField from '../auth/loginComp/CheckboxField';
import Button from './Button';
import SocialButton from '../auth/loginComp/SocialButton';
import Divider from '../auth/loginComp/Divider';
// import Button from '../common/Button/Button';
// import InputField from '../common/Input/InputField';
// import SocialButton from '../common/Button/SocialButton';
// import PasswordField from '../common/Input/PasswordField';
// import CheckboxField from '../common/Input/CheckboxField';
// import Divider from '../common/Divider/Divider';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log('Login attempt:', { email, password, rememberMe });
    // Example: dispatch(loginUser({ email, password, rememberMe }));
  };

  return (
    <div className="max-w-md w-full bg-white bg-opacity-95 rounded-lg shadow-xl p-8">
      <div className="flex justify-center mb-6">
        <div className="flex items-center">
          <svg className="w-8 h-8 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
          <h1 className="text-2xl font-bold text-blue-600">ElectroMart</h1>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <InputField
          type="email"
          id="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <PasswordField
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <div className="flex items-center justify-between">
          <CheckboxField
            id="remember-me"
            label="Remember me"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <div className="text-sm">
            <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Forgot password?
            </Link>
          </div>
        </div>
        
        <Button type="submit" fullWidth>
          Sign in
        </Button>
        
        <Divider text="Or continue with" />
        
        <div className="grid grid-cols-3 gap-3">
          <SocialButton provider="google" />
          <SocialButton provider="apple" />
          <SocialButton provider="facebook" />
        </div>
      </form>
      
      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
          Sign up
        </Link>
      </p>
      
      <div className="mt-8 text-center text-xs text-gray-500">
        <p>
          <Link to="/terms" className="hover:text-blue-500 transition-colors">Terms of Service</Link> • 
          <Link to="/privacy" className="hover:text-blue-500 ml-2 transition-colors">Privacy Policy</Link>
        </p>
        <p className="mt-1">© {new Date().getFullYear()} ElectroMart. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LoginForm;