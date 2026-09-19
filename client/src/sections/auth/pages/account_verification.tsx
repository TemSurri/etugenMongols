import { accountVerificationContent } from "../content/accountVerificationContent";
import VerificationSection from "../verification/VerificationSection";

function VerificationPage() {
  return (
    <VerificationSection
      endpoint="/verify-token"
      successRedirect="/auth/login"
      errorRedirect="/auth/login"
      redirectDelay={1800}
      english={accountVerificationContent.en}
      mongolian={accountVerificationContent.mn}
    />
  );
}

export default VerificationPage;
