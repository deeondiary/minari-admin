import {SelectOptionProvider, useSelectOption} from '@/contexts/SelectOptionProvider';
import styles from './SelectOption.module.css';
import ChevronDown from '@/assets/icon/chevron-down.svg';
import Check from '@/assets/icon/check.svg';
import Image from 'next/image';

export type OptionType = {id: string | number; option: string};

interface SelectOptionProps {
  label?: React.ReactNode;
  inputField: React.ReactNode;
  options: React.ReactNode;
}

interface LabelProps {
  children: React.ReactNode;
}

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

interface OptionsProps {
  options: OptionType[];
  selectedOption: OptionType;
  handleClick: (option: OptionType) => void;
}

const SelectOption = ({label, inputField, options}: SelectOptionProps) => {
  return (
    <SelectOptionProvider>
      <div className={styles.wrapper}>
        {label != null ? <>{label}</> : null}
        {inputField}
        {options}
      </div>
    </SelectOptionProvider>
  );
};

const Label = ({children}: LabelProps) => {
  return <span className={`${styles.label} label-lg`}>{children}</span>;
};

const InputField = ({...restProps}: InputFieldProps) => {
  const {handleOpen} = useSelectOption();

  return (
    <div className={styles.input_wrapper} onClick={handleOpen}>
      <input readOnly {...restProps} />
      <Image src={ChevronDown} alt="icon" width={24} height={24} />
    </div>
  );
};

/**
 * 옵션으로 받는 props는 추후에 사용시에 사용처에 맞게 수정하셔도 됩니다.
 */
const Options = ({options, selectedOption, handleClick}: OptionsProps) => {
  const {open, handleClose} = useSelectOption();

  const handleItemClick = (option: OptionType) => {
    handleClick(option);
    handleClose();
  };

  return (
    <>
      {open && (
        <ul className={styles.options}>
          {options.map(({id, option}) => (
            <li className={styles.item} key={id} onClick={() => handleItemClick({id, option})}>
              {id === selectedOption.id ? (
                <Image src={Check} alt="icon" width={16} height={24} />
              ) : (
                <div className="spacing" />
              )}
              <span className={`label-lg`}>{option}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

SelectOption.Label = Label;
SelectOption.InputField = InputField;
SelectOption.Options = Options;

export default SelectOption;
