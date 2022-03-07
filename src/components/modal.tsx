import * as React from 'react';
import { Modal, ModalBody, ModalHeader } from "reactstrap";

interface Props {
    readonly isModalOpen: boolean;
    readonly closeModal: Function;
    readonly modalTitle : string;
    readonly modalBody : JSX.Element;
    readonly modalFooter ? : JSX.Element;
}

export const GenericModal: React.FC<Props> = (props) => {
    const { isModalOpen, closeModal , modalBody, modalTitle , modalFooter} = props;
    return (
        <Modal contentClassName={''} centered isOpen={isModalOpen} toggle={() => closeModal()}>
            <ModalHeader onClose={''} classNames={''} toggle={() => closeModal()}>
               {modalTitle}
            </ModalHeader>
            <ModalBody className={''}>
              {modalBody}
            </ModalBody>
            {modalFooter }
        </Modal>
    )
}

