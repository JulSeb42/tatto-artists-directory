// Packages
import React, { useState } from "react"
import PropTypes from "prop-types"
import {
    Button,
    Modal,
    Alert,
    ButtonsContainer,
    Font,
} from "tsx-library-julseb"

const DangerZone = ({ textBtnOpen, text, onClickPrimary, textBtnPrimary }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Button
                color="danger"
                justify="start"
                onClick={() => setIsOpen(true)}
            >
                {textBtnOpen}
            </Button>

            <Modal open={isOpen}>
                <Alert color="danger">
                    <Font.P>{text}</Font.P>

                    <ButtonsContainer>
                        <Button color="danger" onClick={onClickPrimary}>
                            {textBtnPrimary}
                        </Button>

                        <Button
                            btnStyle="text"
                            onClick={() => setIsOpen(false)}
                        >
                            No, cancel
                        </Button>
                    </ButtonsContainer>
                </Alert>
            </Modal>
        </>
    )
}

DangerZone.propTypes = {
    textBtnOpen: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClickPrimary: PropTypes.func.isRequired,
    textBtnPrimary: PropTypes.string.isRequired,
}

export default DangerZone
