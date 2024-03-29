import { useForm } from 'react-hook-form';
import { TLogIn } from '../../types/TLogIn';
import { TAuthorizationForm } from '../../types/TAuthorizationForm';
import './AuthorizationForm.css';

export default function AuthorizationForm({ onSubmit }: { onSubmit: TLogIn }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<TAuthorizationForm>();

    return (
        <form
            className="authorization_box"
            onSubmit={handleSubmit((data) => onSubmit(data))}
        >
            <div className="input_wrapper">
                <input
                    type="text"
                    placeholder={'Username'}
                    {...register('login', { required: true })}
                    className="input"
                />
                {errors.login && <p className="notice">Необходимо заполнить поле</p>}
            </div>
            <div className="input_wrapper">
                <input
                    type="password"
                    placeholder={'Password'}
                    {...register('password', { required: true })}
                    className="input"
                />
                {errors.password && <p className="notice">Необходимо заполнить поле</p>}
            </div>
            <button
                type="submit"
                className="btn_registration"
            >Login</button>
        </form>
    )
}