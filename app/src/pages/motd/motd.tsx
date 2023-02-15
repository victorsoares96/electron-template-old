import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { changeMessage } from "@src/store/home/home.slice";
import {
  writeConfigRequest,
  useConfigInMainRequest,
  // @ts-ignore
} from "secure-electron-store";
import { useAppSelector } from "@src/hooks/useAppSelector";
import { useAppDispatch } from "@src/hooks/useAppDispatch";

function Motd() {
  const dispatch = useAppDispatch();
  const home = useAppSelector(state => state.home);

  const [message, setMessage] = useState("");

  const onChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMessage(value);
  };

  const onSubmitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent navigation
    dispatch(changeMessage(message)); // update redux store
    window.api.store.send(writeConfigRequest, "motd", message); // save message to store (persist)

    // reset
    setMessage('');
  }

  useEffect(() => {
    // Request so that the main process can use the store
    window.api.store.send(useConfigInMainRequest);
  }, []);
  return (
    <React.Fragment>
      <section className="section">
        <div className="container has-text-centered">
          <h1 className="title is-1">{home.message}</h1>

          <div className="subtitle">
            Your message of the day will persist
            <br /> if you close and re-open the app.
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <form className="mb-4" onSubmit={onSubmitMessage}>
            <div className="field is-horizontal">
              <input
                placeholder="New message of the day"
                className="input"
                value={message}
                onChange={onChangeMessage}
              />

              <input
                className="button is-primary"
                type="submit"
                value="Save"
              />
            </div>
          </form>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Motd;
