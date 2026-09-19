import { emailChangeVerificationContent } from "../content/emailChangeVerificationContent";
import VerificationSection from "../verification/VerificationSection";

function EmailChangeVerificationPage() {
  return (
    <VerificationSection
      endpoint="/verify-token"
      successRedirect="/account"
      errorRedirect="/account"
      redirectDelay={1800}
      english={emailChangeVerificationContent.en}
      mongolian={emailChangeVerificationContent.mn}
    />
  );
}

export default EmailChangeVerificationPage;
