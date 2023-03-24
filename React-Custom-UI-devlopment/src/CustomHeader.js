import { useState } from "react";

import ChannelListHeader from "@sendbird/uikit-react/ChannelList/components/ChannelListHeader";
import IconButton from "@mui/material/IconButton";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

import CustomCreateChannelModal from "./CustomCreateChannelModal";
const CreateChannel = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <IconButton onClick={() => setShowModal(true)}>
        <CreateNewFolderIcon />
      </IconButton>
      {showModal && (
        <CustomCreateChannelModal
          onCancel={() => {
            setShowModal(false);
          }}
          onCreateChannel={() => {
            setShowModal(true);
          }}
        />
      )}
    </>
  );
};

const HeaderContent = () => {
  return (
    <div className="sb__logo">
      <img src="https://sendbird.com/wp-content/themes/sendbird-sb/assets/img/ic-sendbird-symbol.svg" />
    </div>
  );
};
export default function CustomHeader() {
  return (
    <ChannelListHeader
      renderHeader={HeaderContent}
      renderIconButton={CreateChannel}
    />
  );
}
