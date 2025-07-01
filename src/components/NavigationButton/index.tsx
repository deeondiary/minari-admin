import styles from './NavigationButton.module.css';
import Image, {type StaticImageData} from 'next/image';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  iconLeft?: StaticImageData;
}

const Button = ({children, iconLeft, ...restProps}: ButtonProps) => {
  return (
    <button className={`${styles.button} label-lg`} {...restProps}>
      {iconLeft != null ? <Image src={iconLeft} alt="icon" width={24} height={24} /> : null}
      <span>{children}</span>
    </button>
  );
};
export default Button;
