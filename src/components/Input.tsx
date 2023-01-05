export interface InputProps {
	placeholder?: string;
	labelText?: string;
	helperText?: string;
	iconLeft?: string;
	iconRight?: string;
	size?: number;
	multiline?: boolean;
	password?: boolean;
	fullWidth?: boolean;
	error?: boolean;
	disabled?: boolean;
	autofocus?: boolean;
	pattern?: string;
	title?: string;
	required?: boolean;
	value?: string | number;
	enterSubmit?: (arg: void) => void;

	onChangeSetter: (unknown: any) => void;
	formEmailError?: boolean;
	formPasswordError?: boolean;
	formPasswordConfirmError?: boolean;
	setFormEmailError?: (formEmailError: boolean) => void;
	setFormPasswordError?: (formPasswordError: boolean) => void;
	setFormPasswordConfirmError?: (formPasswordConfirmError: boolean) => void;
	formNameError?: boolean;
	setFormNameError?: (formNameError: boolean) => void;
}

const Input = ({
	placeholder,
	labelText,
	helperText,
	iconLeft,
	iconRight,
	size,
	multiline,
	password,
	fullWidth,
	error,
	disabled,
	autofocus,
	pattern,
	title,
	required,
	value,
	enterSubmit,

	onChangeSetter,
	formEmailError,
	formPasswordError,
	formPasswordConfirmError,
	setFormEmailError,
	setFormPasswordError,
	setFormPasswordConfirmError,
	formNameError,
	setFormNameError
}: InputProps) => {
	let classString = '';
	if (error) {
		classString = classString + 'error';
	}
	if (disabled) {
		classString = classString + ' disabled';
	}

	return (
		<div className={fullWidth ? 'input-component w100' : 'input-component'}>
			{labelText ? (
				<div className={error ? 'input-label input-error' : 'input-label'}>
					<p>{labelText}</p>
				</div>
			) : null}
			{multiline ? (
				<textarea
				className={classString}
						placeholder={placeholder ? placeholder : ''}
						cols={size ? size : undefined}
						rows={3}
						autoFocus={autofocus ? true : undefined}
						disabled={disabled ? true : undefined}
						title={title ? title : undefined}
						maxLength={256}
						defaultValue={value ? value : ''}
						onLoad={() => onChangeSetter(value)}
						onChange={(e) => onChangeSetter(e.target.value)}
				></textarea>
			) : (
				<div className="input-container">
					{iconLeft ? <span className="material-icons">{iconLeft}</span> : null}
					<input
						type={password ? 'password' : 'text'}
						className={classString}
						placeholder={placeholder ? placeholder : ''}
						size={size ? size : undefined}
						autoFocus={autofocus ? true : undefined}
						required={required ? true : undefined}
						disabled={disabled ? true : undefined}
						pattern={pattern ? pattern : undefined}
						title={title ? title : undefined}
						defaultValue={value ? value : ''}
						onLoad={() => onChangeSetter(value)}
						onChange={(e) => {
							onChangeSetter(e.target.value);
							if (formEmailError && setFormEmailError) {
								setFormEmailError(false);
								return;
							}
							if (formPasswordError && setFormPasswordError) {
								setFormPasswordError(false);
								return;
							}
							if (formPasswordConfirmError && setFormPasswordConfirmError) {
								setFormPasswordConfirmError(false);
								return;
							}
							if (formNameError && setFormNameError) {
								setFormNameError(false);
								return;
							}
						}}
						onKeyDown={enterSubmit ? ((e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								enterSubmit();
							}
						}) : undefined}
					></input>
				</div>
			)}

			{formEmailError || formPasswordError || formPasswordConfirmError || formNameError ? (
				<div className="input-helper input-error">
					<p>{helperText}</p>
				</div>
			) : null}
		</div>
	);
};

export default Input;
