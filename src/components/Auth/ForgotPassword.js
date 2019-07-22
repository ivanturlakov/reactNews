import React from "react";
import FirebaseContext from "../../firebase/context";

function ForgotPassword() {
  const { firebase } = React.useContext(FirebaseContext);
  const [resetPasswordEmail, setResetPasswordEmail] = React.useState('');
  const [isPasswordReset, setIsPasswordReset] = React.useState(false);
  const [passwordResetError, setPasswordResetError] = React.useState(false)

  async function handleResetPassword() {
    try {
      await firebase.resetPassword(resetPasswordEmail)
      setIsPasswordReset(true);
      setPasswordResetError(null)
    } catch (err) {
      console.error("Error sending email", err);
      setPasswordResetError(err.message);
      setIsPasswordReset(false)
    }
  }

  return (
    <div>
      <input
        type="email"
        className="input"
        placeholder="Provide your account email"
        onChange={event => setResetPasswordEmail(event.target.value)}
      />
      <div>
        <button className="button" onClick={handleResetPassword}>
          Reset password
        </button>
      </div>
      {isPasswordReset && <p>Check your email to reset password</p>}
      {passwordResetError && <p className="text-error">{passwordResetError}</p>}
    </div>
  )
}

export default ForgotPassword;
