import styles from './Modal.module.css';
import Image from 'next/image';
import X from '@/assets/icon/x.svg';
import {useModalStore} from '@/stores/modalStore';
interface ModalProps {
  title?: string;
  isCloseButton?: boolean;
  children?: React.ReactNode;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
  width?: string;
}

const Modal = ({
  title,
  children,
  leftButton,
  rightButton,
  isCloseButton,
  width = '320px',
}: ModalProps) => {
  const {close} = useModalStore();
  const modalTitleClass = isCloseButton ? styles['modal-title-close'] : styles['modal-title'];
  return (
    <div onClick={(e) => e.stopPropagation()} className={styles.modal} style={{width: width}}>
      <div className={modalTitleClass}>
        {title != null && <span className="title-sm">{title}</span>}
        {isCloseButton && <Image src={X} alt="close" className="cp" onClick={close} />}
      </div>
      {children != null && <span className="body-lg">{children}</span>}
      <div className={styles.buttons}>
        {leftButton != null && leftButton}
        {rightButton != null && rightButton}
      </div>
    </div>
  );
};

export default Modal;
