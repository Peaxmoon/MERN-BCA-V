import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../auth/loginComp/InputField';
import PasswordField from '../auth/loginComp/PasswordField';
import CheckboxField from '../auth/loginComp/CheckboxField';
import Button from './Button';
import SocialButton from '../auth/loginComp/SocialButton';
import Divider from '../auth/loginComp/Divider';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // Update default credentials to match DummyJSON user
  const defaultCredentials = {
    username: 'elijahs',
    password: 'elijahspass'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Use the username directly without email transformation
      const loginResult = await login(defaultCredentials.username, defaultCredentials.password);
      
      console.log('Login response:', loginResult); // Debug login response

      if (loginResult.success) {
        // Show success message before redirecting
        setError('');
        setLoading(true);
        
        // Store credentials if remember me is checked
        if (rememberMe) {
          localStorage.setItem('rememberedUser', defaultCredentials.username);
        }

        // Navigate after a brief delay to show loading state
        setTimeout(() => {
          navigate('/');
        }, 800);
      } else {
        setError(loginResult.error || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
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
      
      {/* Add default credentials helper text */}
      <div className="mb-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
        <p className="font-medium">Demo Credentials:</p>
        <p>Username: {defaultCredentials.username}</p>
        <p>Password: {defaultCredentials.password}</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <InputField
          type="email"
          id="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        
        <PasswordField
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        
        <div className="flex items-center justify-between">
          <CheckboxField
            id="remember-me"
            label="Remember me"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            disabled={loading}
          />
          <div className="text-sm">
            <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Forgot password?
            </Link>
          </div>
        </div>
        
        <Button 
          type="submit" 
          fullWidth 
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
        
        <Divider text="Or continue with" />
        
        <div className="grid grid-cols-3 gap-3">
          <SocialButton provider="google" disabled={loading} />
          <SocialButton provider="apple" disabled={loading} />
          <SocialButton provider="facebook" disabled={loading} />
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