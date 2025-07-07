import React from 'react'

export type TextfieldProps = {
 label: string;
 helperText?: string;
 error?: string;
 id?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextField = React.forwardRef<HTMLInputElement, TextfieldProps>(
 ({ label, helperText, error, id, ...rest }, ref) => {
   const fieldId = id;
   const describedBy = helperText || error ? `${fieldId}-desc` : undefined;
   return (
     <div className="form-field">
      <label htmlFor={fieldId}>{label}</label>
      <input 
       type="text"
       ref={ref}
       aria-describedby={describedBy}
       aria-invalid={!!error}
       className={`input input-error`}
       {...rest}
      />
      {helperText && !error && <p id={`${fieldId}-desc`}></p>}
      {error && <p className='error'>{error}</p>}
     </div>
   );
 }
);