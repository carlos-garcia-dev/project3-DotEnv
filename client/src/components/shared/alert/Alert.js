import { Toast } from 'react-bootstrap'
import logo from './logo.png'

const Alert = ({ show, toastText, handleToast }) => {
    return (
        <Toast show={show} onClose={() => handleToast(false)} delay={3000} autohide style={{ position: 'fixed', bottom: 30, right: 10, width: 500 }}>
            <Toast.Header>
                <img src={logo}  alt="Logo-" style={{ width: 20, height: 20 }} />
                <strong className="mr-auto">Dot-Env</strong>
            </Toast.Header>
            <Toast.Body>{toastText}</Toast.Body>
        </Toast>
    )
}

export default Alert