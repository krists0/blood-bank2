import React from 'react'
import Modal from 'react-modal'
import SVG from 'react-inlinesvg'

import styles from './assets/modal.module.scss'
import X_icon from '../../images/close.svg'
//import { fade } from '../UIComponents'
//import { motion } from 'framer-motion'

Modal.setAppElement('#root');

class ModalPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open || false
        }
    }

    componentDidUpdate(prevState) {
        const { open } = this.props;

        if (prevState.open !== open) {
            this.setState({ open })
        }
    }

    render() {
        const { open } = this.state;
        const { width, height, children, handleClose, style } = this.props;

        return (
            <Modal isOpen={open} onRequestClose={handleClose} className={styles.add_modal}>
                {/*<motion.div initial="fadeOut" animate={open ? 'fadeIn' : 'fadeOut'} variants={fade}>*/}
                    <div style={{ ...{ width: width ?? '', height: height ?? '' }, ...style }} className={styles.modal_content}>
                        {handleClose && <SVG src={X_icon} onClick={handleClose} className={styles.close} />}
                        {children}
                    </div>
                {/*</motion.div>*/}
            </Modal>
        )
    }
}

export default ModalPopup