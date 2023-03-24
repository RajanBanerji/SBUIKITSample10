import React, { useEffect } from "react";

import {
  CreateChannelProvider
  // useCreateChannelContext
} from "@sendbird/uikit-react/CreateChannel/context";
// import InviteMembers from "@sendbird/uikit-react/CreateChannel/components/InviteMembers";
import CustomInviteMembers from "./CustomInviteMembers";

const CustomCreateChannelUI = ({ onCancel }) => {
  return <CustomInviteMembers onCancel={onCancel} />;
};

export default function CustomCreateChannelModal({
  onCreateChannel,
  onCancel
}) {
  return (
    <>
      <CreateChannelProvider onCreateChannel={onCreateChannel}>
        <CustomCreateChannelUI onCancel={onCancel} />
      </CreateChannelProvider>
    </>
  );
}
