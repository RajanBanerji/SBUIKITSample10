import { useEffect, useState } from "react";

import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import sendBirdSelectors from "@sendbird/uikit-react/sendbirdSelectors";
import Modal from "@sendbird/uikit-react/ui/Modal";
import UserListItem from "@sendbird/uikit-react/ui/UserListItem";

import { useThrottle } from "@react-hook/throttle";

import TextField from "@mui/material/TextField";

export default function CustomInviteMembers({ onCancel }) {
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("my channel");
  const [search, setSearch] = useThrottle("", 500, false);
  const [selected, setSelected] = useState({});

  const store = useSendbirdStateContext();
  console.log('store', store);
  const sdk = store?.stores?.sdkStore?.sdk;
  console.log('sdk', sdk);

  useEffect(() => {
    const applicationUserListQuery = sdk.createApplicationUserListQuery();
    applicationUserListQuery.limit = 5;
    applicationUserListQuery.next((users_) => {
      setUsers(users_);
    });
  }, [sdk]);

  useEffect(() => {
    const applicationUserListQuery = sdk.createApplicationUserListQuery();
    applicationUserListQuery.limit = 5;
    applicationUserListQuery.nicknameStartsWithFilter = search;
    applicationUserListQuery.next((users_) => {
      setUsers(users_);
    });
  }, [search, sdk]);
  return (
    <Modal
      onSubmit={() => {
        const selectedUsers = Object.keys(selected).filter(
          (arg) => selected[arg]
        );
        const params = new sdk.GroupChannelCreateParams();
        params.addUserIds(selectedUsers);
        params.isDistinct = false;
        params.name = title;

        const createChannel = sendBirdSelectors.getCreateChannel(store);
        createChannel(params).finally(() => {
          onCancel();
        });
      }}
      titleText="Create channel"
      className="custom__invite__member"
      onCancel={onCancel}
      submitText="create"
      type="PRIMARY"
    >
      <div>
        <TextField
          fullWidth
          label="channel name"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          variant="standard"
        />
      </div>
      <div>
        <TextField
          fullWidth
          label="search a user"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          variant="standard"
        />
      </div>
      <div className="modal__content" variant="outlined">
        {users.map((user) => (
          <UserListItem
            key={user.userId}
            user={user}
            checkBox
            checked={selected[user.userId]}
            onChange={(event) => {
              setSelected({
                ...selected,
                [event.target.id]: event.target.checked
              });
            }}
          />
        ))}
      </div>
    </Modal>
  );
}
