export interface InputProps {
  labelLeft: string;
  labelRight: string;
  iconLeft: string;
  iconRight: string;
  size: string;
  multiline: void;
  fullWidth: void;



  setInputEmail: (inputEmail: string) => void;
  isValidEmail: () => void;
}

const Input = ({ labelLeft, labelRight, iconLeft, iconRight, size, multiline, setInputEmail }: InputProps) => {
return (
  <div className="input-component">
  <div className="input-helper">
    <p>left</p>
    <p>right</p>
  </div>
  <div className="input-container">
    <span className="material-icons">email</span>
    <input
      type="text"
      placeholder="Email"
      size={16}
      autoFocus
      onChange={(e) => {
        setInputEmail(e.target.value);
      }}
    ></input>
  </div>
</div>
)
}

export default Input