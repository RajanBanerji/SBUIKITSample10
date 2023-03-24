import React, { useState } from 'react';
import './App.css';
import "@sendbird/uikit-react/dist/index.css"
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import ChannelList from "@sendbird/uikit-react/ChannelList";
import Channel from "@sendbird/uikit-react/Channel";

import CustomLoader from "./CustomLoader";
import CustomHeader from "./CustomHeader";

function App() {
  const APP_ID = process.env.REACT_APP_APP_ID;
  const USER_ID = process.env.REACT_APP_USER_ID;
  const NICK_NAME = process.env.REACT_APP_NICK_NAME;
  const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

  const [currentChannelUrl, setCurrentChannelUrl] = useState("");

  return (
    <SendbirdProvider
      appId={APP_ID}
      userId={USER_ID}
      nickname={NICK_NAME}
      accessToken={ACCESS_TOKEN}
    >
      <div className="sendbird-app__channellist-wrap">
        <ChannelList
          onChannelSelect={(channel) => {
            if (channel && channel.url) {
              setCurrentChannelUrl(channel.url);
            }
          }}
          renderPlaceholderInvalid={CustomLoader}
          renderPlaceHolderLoading={CustomLoader}
          renderHeader={CustomHeader}
        />
      </div>
      <div className="sendbird-app__conversation-wrap">
        <Channel
          renderPlaceholderInvalid={CustomLoader}
          renderPlaceholderLoader={CustomLoader}
          channelUrl={currentChannelUrl}
        />
      </div>
    </SendbirdProvider>
  );
}

export default App;
