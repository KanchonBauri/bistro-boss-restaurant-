import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const { signIn, resetPassword } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [isForgotMode, setIsForgotMode] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    // ✅ Login handler
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                Swal.fire({
                    title: "Login Successful!",
                    icon: "success"
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                Swal.fire("Login failed!", error.message, "error");
            });
    };

    // ✅ Forgot password button
    const handleForgotPassword = async () => {
        if (!email) {
            Swal.fire('Please enter your email first!');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();

            if (res.ok) {
                Swal.fire('OTP sent to your email.');
                setIsForgotMode(true);
            } else {
                Swal.fire('Failed to send OTP', data.message || '', 'error');
            }
        } catch (err) {
            Swal.fire('Error', err.message, 'error');
        }
    };

    // ✅ Reset password handler
    const handleResetPassword = async e => {
        e.preventDefault();

        if (!email || !otp || !newPassword) {
            return Swal.fire('All fields are required!');
        }

        try {
            const res = await fetch('http://localhost:5000/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword })
            });

            const data = await res.json();

            if (res.ok) {
                Swal.fire('Password reset successful!');
                setIsForgotMode(false);
            } else {
                Swal.fire('Failed to reset', data.message || '', 'error');
            }
        } catch (err) {
            Swal.fire('Error', err.message, 'error');
        }
    };

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        setDisabled(!validateCaptcha(user_captcha_value));
    };

    return (
        <>
            <Helmet>
                <title>Bistro | Login</title>
            </Helmet>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">{isForgotMode ? 'Reset Password' : 'Login Now!'}</h1>
                        <p className="py-6">Welcome to Bistro Boss! Please log in to continue.</p>
                    </div>

                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        {/* ✅ Reset Password Form */}
                        {isForgotMode ? (
                            <form onSubmit={handleResetPassword} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        placeholder="email"
                                        className="input input-bordered"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">OTP</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={otp}
                                        placeholder="Enter OTP"
                                        className="input input-bordered"
                                        required
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">New Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        placeholder="New Password"
                                        className="input input-bordered"
                                        required
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-primary">Reset Password</button>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsForgotMode(false)}
                                    className="btn btn-link text-blue-600 flex justify-center mt-2"
                                >
                                    ⬅ Back to Login
                                </button>
                            </form>
                        ) : (
                            // ✅ Login Form
                            <form onSubmit={handleLogin} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="email"
                                        className="input input-bordered"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        className="input input-bordered"
                                        required
                                    />
                                    <label className="label">
                                        <button type="button" onClick={handleForgotPassword} className="label-text-alt link link-hover text-blue-500">
                                            Forgot password?
                                        </button>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <LoadCanvasTemplate />
                                    </label>
                                    <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="Type the captcha" className="input input-bordered" />
                                </div>
                                <div className="form-control mt-6">
                                    <input  className="btn btn-primary" type="submit" value="Login" />
                                </div>
                            </form>
                        )}

                        {!isForgotMode && (
                            <>
                                <p className='px-6 text-center'>
                                    <small>New Here? <Link to="/signup" className="text-blue-500">Create an account</Link></small>
                                </p>
                                <SocialLogin />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
