import React from "react";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

function AdminPage() {
  return (
    <div>
      AdminPage
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(AdminPage);
