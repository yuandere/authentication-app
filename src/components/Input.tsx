export interface InputProps {
	placeholder?: string;
	labelText?: string;
	helperText?: string;
	iconLeft?: string;
	iconRight?: string;
	size?: number;
	multiline?: boolean;
	fullWidth?: boolean;
	error?: boolean;
	disabled?: boolean;
	autofocus?: boolean;

	onChangeSetter: any;
  formEmailError?: boolean;
  formPasswordError?: boolean;
  setFormEmailError?: any;
	setFormPasswordError?: any;
}

const Input = ({
	placeholder,
	labelText,
	helperText,
	iconLeft,
	iconRight,
	size,
	multiline,
	fullWidth,
	error,
	disabled,
	autofocus,

	onChangeSetter,
  formEmailError,
  formPasswordError,
  setFormEmailError,
	setFormPasswordError
}: InputProps) => {
	let classString = '';
	if (error) {
		classString = classString + 'error';
	}
	if (disabled) {
		classString = classString + ' disabled';
	}
  if (fullWidth) {
    classString = classString + ' fullWidth'
  }

	return (
		<div className="input-component">
			{labelText ? (
				<div className={error ? 'input-label input-error' : 'input-label'}>
					<p>{labelText}</p>
				</div>
			) : null}
			<div className="input-container">
				{iconLeft ? <span className="material-icons">{iconLeft}</span> : null}
				<input
					type="text"
					className={classString}
					placeholder={placeholder ? placeholder : ''}
					size={size ? size : undefined}
					autoFocus={autofocus ? true : undefined}
					onChange={(e) => {
						onChangeSetter(e.target.value);
            if (formEmailError) {
              setFormEmailError(false);
              return
            } 
            if (formPasswordError) {
              setFormPasswordError(false);
              return
            }
					}}
				></input>
			</div>
			{(formEmailError || formPasswordError) ? (
				<div className='input-helper input-error'>
					<p>{helperText}</p>
				</div>
			) : null}
		</div>
	);
};

export default Input;
