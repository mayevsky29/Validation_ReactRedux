import { useField } from 'formik';
import classNames from 'classnames';

const MyTextInput = ({ label, ...props }) => {
    // useField() повертає [formik.getFieldProps(), formik.getFieldMeta()]
    // який ми можемо поширювати в <input>. Ми можемо використовувати 
    // мета поля, щоб показати повідомлення про помилку, якщо поле недійсне і воно було нажате(i.e. visited)
    const [field, meta] = useField(props);
    //console.log("fields", field);
    return (
      <div className="mb-3">
        <label htmlFor={props.id || props.name} className="form-label">{label}</label>
        <input className={classNames("form-control", 
            {"is-invalid": meta.touched && meta.error},
            {"is-valid": meta.touched && !meta.error},
            )} {...field} {...props} />
        {(meta.touched && meta.error) && <div className="invalid-feedback">{meta.error}</div>}
      </div>
    );
  };

  export default MyTextInput;