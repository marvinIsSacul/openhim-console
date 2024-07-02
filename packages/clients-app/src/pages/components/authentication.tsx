import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { BasicInfoModel, AuthenticationModel } from "../../interfaces";
import { v4 as uuidv4 } from "uuid";

interface AuthenticationProps {
  basicInfo: BasicInfoModel;
  authType: string;
  authentication: AuthenticationModel;
  setAuthentication: React.Dispatch<React.SetStateAction<AuthenticationModel>>;
  selectAuthenticationType: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onAuthenticationChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  hidden?: boolean;
}

export const Authentication: React.FC<AuthenticationProps> = ({
  authType,
  authentication,
  basicInfo,
  setAuthentication,
  selectAuthenticationType,
  onAuthenticationChange,
  hidden,
}) => {
  return (
    <div hidden={hidden}>
      <>
        <h1>Authentication</h1>
        <p>Configure the authentication settings for the client</p>
        <Divider />
        <p>Select Type</p>
        <Button
          variant="outlined"
          color="success"
          id="jwt"
          onClick={selectAuthenticationType}
        >
          JSON WEB TOKEN
        </Button>
        <Button
          variant="outlined"
          color="success"
          id="customToken"
          onClick={selectAuthenticationType}
        >
          CUSTOM TOKEN
        </Button>
        <Button
          variant="outlined"
          color="success"
          id="mutualTLS"
          onClick={selectAuthenticationType}
        >
          MUTUAL TLS
        </Button>
        <Button
          variant="outlined"
          color="success"
          id="basicAuth"
          onClick={selectAuthenticationType}
        >
          BASIC AUTH
        </Button>
        {authType === "jwt" && (
          <>
            <h1>JSON Web Token (JWT)</h1>
            <p>
              Securely transmit information between a client and server as JSON
              object, signed using a secret or key pair
            </p>
          </>
        )}

        {authType === "customToken" && (
          <>
            <h1>Custom Token</h1>
            <p>
              Set an ID to verify the client. The ID can be any unique string
            </p>
            <TextField
              id="customToken"
              label="Custom Token"
              onChange={onAuthenticationChange}
              value={authentication.customToken.token}
              InputProps={{
                endAdornment: (
                  <a
                    onClick={() => {
                      setAuthentication({
                        ...authentication,
                        customToken: {
                          token: uuidv4(),
                        },
                      });
                    }}
                    style={{ fontSize: 12 }}
                  >
                    Generate UUID
                  </a>
                ),
              }}
            />
          </>
        )}
        {authType === "mutualTLS" && (
          <>
            <h1>Mutual TLS</h1>
            <p>
              Set Up an encrypted channel by providing the client's domain and
              certificate
            </p>
            <Stack spacing={2} direction="row">
              <TextField
                id="domain"
                label="Domain"
                onChange={onAuthenticationChange}
              />
              <FormControl fullWidth>
                <InputLabel id="certificate-label">Certificate</InputLabel>
                <Select labelId="certificate-label" id="certificate"></Select>
              </FormControl>
            </Stack>
          </>
        )}
        {authType === "basicAuth" && (
          <>
            <h1>Basic Auth</h1>
            <p>Requires a username and password. Set the password below</p>
            <Stack spacing={2} direction="row">
              <TextField id="clientID" value={basicInfo.clientID} disabled />
              <TextField
                id="password"
                label="Password"
                type="password"
                onChange={onAuthenticationChange}
              />
            </Stack>
          </>
        )}
      </>
    </div>
  );
};
