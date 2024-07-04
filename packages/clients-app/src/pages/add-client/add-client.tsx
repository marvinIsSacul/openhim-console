import {
  Box,
  Button,
  Card,
  Divider,
  Stack,
  Step,
  StepLabel,
  Stepper
} from '@mui/material'
import {FC, useState} from 'react'
import {AuthenticationModel, BasicInfoModel} from '../../interfaces'
import {BasicInfo} from '../components/basic-info'
import {Authentication} from '../components/authentication'

interface AddClientProps {
  returnToClientList: () => void
}

export const AddClient: FC<AddClientProps> = ({returnToClientList}) => {
  //TODO: Make sure that there is a safe guard when incrementing this value to prevent it from going over the number of steps
  const [activeStep, setActiveStep] = useState(0)
  const labelProps: {optional?: React.ReactNode} = {}
  const [basicInfo, setBasicInfo] = useState<BasicInfoModel>({
    clientID: '',
    clientName: '',
    roles: [],
    organization: '',
    softwareName: '',
    description: '',
    location: '',
    contactPerson: '',
    contactPersonEmail: ''
  })
  const [authType, setAuthType] = useState('jwt')
  const [authentication, setAuthentication] = useState<AuthenticationModel>({
    jwt: {
      secret: ''
    },
    customToken: {
      token: ''
    },
    mutualTLS: {
      domain: '',
      certificate: ''
    },
    basicAuth: {
      password: ''
    }
  })

  const onBasicInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBasicInfo({
      ...basicInfo,
      [e.target.id]: e.target.value
    })
  }

  const selectAuthenticationType = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAuthType(e.currentTarget.id)
  }

  const onAuthenticationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAuthentication({
      ...authentication,
      [authType]: {
        ...authentication[authType],
        [e.target.id]: e.target.value
      }
    })
  }

  const onNavigateClicked = (direction: string) => {
    if (direction === 'next') {
      setActiveStep(activeStep + 1)
    }
    if (direction === 'back') {
      setActiveStep(activeStep - 1)
    }
    if (direction === 'cancel') {
      returnToClientList()
    }
    if (direction === 'save') {
      returnToClientList()
    }
  }

  return (
    <Box sx={{maxWidth: '85%', paddingLeft: 20}}>
      <h1>Add Client</h1>

      <p>
        Control client systems and their access roles. Add clients to enable
        their request routing and group them by roles for streamlined channel
        access management
      </p>
      <Divider />
      <br />
      <Card variant="outlined" sx={{margin: 'auto', maxWidth: '50%'}}>
        <Box>
          <Stepper sx={{paddingTop: 2}} activeStep={activeStep}>
            <Step key={'basic-info'}>
              <StepLabel {...labelProps}>Basic Info</StepLabel>
            </Step>
            <Step key={'authentication'}>
              <StepLabel {...labelProps}>Authentication</StepLabel>
            </Step>
          </Stepper>
        </Box>
        <br />
        <Divider />
        <Box>
          {activeStep === 0 ? (
            <BasicInfo
              basicInfo={basicInfo}
              onBasicInfoChange={onBasicInfoChange}
              setBasicInfo={setBasicInfo}
            />
          ) : (
            <Authentication
              authType={authType}
              authentication={authentication}
              basicInfo={basicInfo}
              setAuthentication={setAuthentication}
              selectAuthenticationType={selectAuthenticationType}
              onAuthenticationChange={onAuthenticationChange}
            />
          )}

          <br />
          <Divider />
          <br />
          <Stack spacing={2} direction="row" sx={{marginBottom: 1}}>
            <Button
              variant="outlined"
              id={activeStep === 0 ? 'cancel' : 'back'}
              color="success"
              onClick={e => onNavigateClicked(e.currentTarget.id)}
            >
              {activeStep === 0 ? 'Cancel' : 'Back'}
            </Button>
            <Button
              variant="contained"
              id={activeStep === 0 ? 'next' : 'save'}
              color="success"
              onClick={e => onNavigateClicked(e.currentTarget.id)}
            >
              {activeStep === 0 ? 'Next' : 'Save'}
            </Button>
          </Stack>
        </Box>
      </Card>
    </Box>
  )
}
