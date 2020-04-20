import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'

import { workouts } from '../constants/routes'
import Button from '../components/Button'
import SignUserAgreementMutation from '../graphql/mutations/SignUserAgreementMutation'
import analytics from '../utils/analytics'

const UserAgreement = () => {
    const [read, setRead] = useState(false)
    const [signUserAgreementMutation] = useMutation(SignUserAgreementMutation)
    const history = useHistory()
    const handleSignUserAgreement = async () => {
        await signUserAgreementMutation()
        history.push(workouts)
        analytics.track('sign user agreement')
    }
    return (
        <Box display="flex" flexDirection="column" flex={1} justifyContent="flex-start" alignItems="flex-start" p={1}>
            <Typography variant="h3">USER AGREEMENT</Typography>
            <Typography>
                Welcome to TrainerViewer.com! Your use of the TrainerViewer.com, (the "Service") will constitute your
                agreement to comply with the rules outlined in this document. These rules may be modified from time to
                time; notice of revisions to this Agreement will be announced on this page. Continued use of the Service
                by you will constitute your acceptance of any changes or revisions to the Agreement. You can access this
                Agreement at any time by reaching out to Trainer Viewer’s web support staff. Your failure to follow the
                Service's rules, whether listed below or in supplemental notices posted at various points in the
                Service, may result in termination of your access to the Service, without notice. If you do not agree
                with the rules contained in this Agreement, please do not use the Service. By signing up to become a
                trainerviewer.com member, you agree that Trainer Viewer, in its sole discretion, may disclose current or
                past information about members when it has a good faith belief that (1) the law requires disclosure; (2)
                a member has violated the law or the terms of this agreement.
            </Typography>
            <Typography variant="h3">MEDICAL STATEMENT</Typography>
            <Typography>
                You should consult your physician or other health care professional before starting this or any other
                fitness program to determine if it is right for your needs. This is particularly true if you (or your
                family) have a history of high blood pressure or heart disease, or if you have ever experienced chest
                pain when exercising or have experienced chest pain in the past month when not engaged in physical
                activity, smoke, have high cholesterol, are obese, or have a bone or joint problem that could be made
                worse by a change in physical activity. Do not start any fitness class if your physician or health care
                provider advises against it. If you experience faintness, dizziness, pain or shortness of breath at any
                time while exercising you should stop immediately. This site offers access to Trainer’s who provide
                health, fitness and nutritional information and is designed for educational purposes only. You should
                not rely on this information as a substitute for, nor does it replace, professional medical advice,
                diagnosis, or treatment. If you have any concerns or questions about your health, you should always
                consult with a physician or other health-care professional. Do not disregard, avoid or delay obtaining
                medical or health related advice from your health-care professional because of something you may have
                read on this site. The use of any information provided on this site is solely at your own risk. If you
                are in the United States and think you are having a medical or health emergency, call your health care
                professional, or 911, immediately. Certain health or medical material on this site may be sexually
                explicit. Please do not use this site if you would find these materials offensive. Developments and
                trends may impact the health, fitness and nutritional advice that appears on Trainer Viewer. No
                assurance can be given that the advice contained in this site will always include the most recent
                findings or developments with respect to the particular material.
            </Typography>
            <Typography variant="h3">PRIVACY POLICY</Typography>
            <Typography>
                We value your trust in providing us your Personal Information, thus we are striving to use commercially
                acceptable means of protecting it. We use a third party service to guarantee user security. If you
                choose to use our Service, then you agree to the collection and use of information in relation with this
                policy. The Personal Information that we collect are used for providing and improving the Service. We
                will not use or share your information with third-parties (besides the authentication service we use for
                security). We want to inform you that whenever you visit our Service, we collect information that your
                browser sends to us that is called Log Data. This Log Data may include information such as your
                computer’s Internet Protocol ("IP") address, browser version, pages of our Service that you visit, the
                time and date of your visit, the time spent on those pages, and other statistics.
            </Typography>
            <Typography variant="h3">CHILDREN’S POLICY</Typography>
            <Typography>
                If you are under 13, please do not register for the trainerviewer.com Services or provide us with any
                contact or other information, including your name, address or email address. If you are between the ages
                of 13 and 18, you must obtain permission from your parent or guardian before registering for the
                trainerviewer.com Services or otherwise sending any contact or other information to Trainer Viewer.
            </Typography>
            <Typography variant="h3">LINKS TO OTHER SITES</Typography>
            <Typography>
                Our Service may contain links to other sites. If you click on a third-party link, you will be directed
                to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you
                to review the Privacy Policy of these websites. We have no control over, and assume no responsibility
                for the content, privacy policies, or practices of any third-party sites or services.
            </Typography>
            <FormControlLabel
                value="start"
                onChange={() => setRead(!read)}
                control={<Checkbox color="primary" />}
                label="I have read the user agreement"
                labelPlacement="start"
            />
            <Button disabled={!read} onClick={handleSignUserAgreement}>
                Sign User Agreement
            </Button>
        </Box>
    )
}

export default UserAgreement
