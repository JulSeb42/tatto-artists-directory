// Imports
import React, { useState } from "react"
import PropTypes from "prop-types"
import {
    Button,
    Modal,
    Alert,
    Font,
    Flexbox,
    Variables,
} from "tsx-library-julseb"

const DangerZone = ({
    textBtnOpen,
    text,
    onClickPrimary,
    textBtnPrimary,
    textBtnCancel = "No, cancel",
}) => {
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

            <Modal isOpen={isOpen}>
                <Alert color="danger" modal>
                    <Font.P>{text}</Font.P>

                    <Flexbox gap={Variables.Spacers.XS}>
                        <Button color="danger" onClick={onClickPrimary}>
                            {textBtnPrimary}
                        </Button>

                        <Button
                            btnStyle="text"
                            onClick={() => setIsOpen(false)}
                        >
                            {textBtnCancel}
                        </Button>
                    </Flexbox>
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
    textBtnCancel: PropTypes.string,
}

export default DangerZone
