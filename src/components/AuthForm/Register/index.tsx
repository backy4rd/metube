import React, { useState } from 'react';

import authApi from '@api/authApi';
import { useAuth } from '@contexts/AuthContext';

import './Register.css';

type Props = { onLoginClick: () => void };

const vietnameseCharacters =
  'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ';

const nameRegex = new RegExp(`^(?! )[ a-zA-Z${vietnameseCharacters}]+(?<! )$`);
/* const nameRegex = /./; */

function Register({ onLoginClick }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isFemale, setIsFemale] = useState(true);

  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isRePasswordValid, setIsRePasswordValid] = useState(true);
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);

  const [failMessage, setFailMessage] = useState<string | null>(null);
  const { login } = useAuth();

  async function handleRegister() {
    const _isUsernameValid = /(?=.{5,32}$)^[a-zA-Z0-9._]+$/.test(username);
    const _isPasswordValid = /(?=.{6,32}$)^\S+$/.test(password);
    const _isRePasswordValid = password === rePassword;
    const _isFirstNameValid = nameRegex.test(firstName);
    const _isLastNameValid = nameRegex.test(lastName);

    setIsUsernameValid(_isUsernameValid);
    setIsPasswordValid(_isPasswordValid);
    setIsRePasswordValid(_isRePasswordValid);
    setIsFirstNameValid(_isFirstNameValid);
    setIsLastNameValid(_isLastNameValid);

    if (
      !_isUsernameValid ||
      !_isPasswordValid ||
      !_isRePasswordValid ||
      !_isFirstNameValid ||
      !_isLastNameValid
    ) {
      return;
    }

    try {
      const response = await authApi.register({
        username: username,
        password: password,
        first_name: firstName,
        last_name: lastName,
        female: isFemale ? '1' : '0',
      });

      setFailMessage(null);
      login(response.token);
    } catch (e) {
      if (e?.data?.fail?.message === 'username already exists') {
        setFailMessage('tên tài khoản đã tồn tại');
      } else {
        setFailMessage('lỗi máy chủ');
      }
    } finally {
    }
  }

  return (
    <div className="register">
      <div className="register__wrapper">
        {failMessage && <span>*{failMessage}</span>}
        {!isUsernameValid && <span>*từ 5-32 kí tự, chỉ chứa a-z A-Z 0-9 , và .</span>}
        <input
          className={isUsernameValid ? '' : 'invalid'}
          type="text"
          placeholder="Tên tài khoản"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {!isPasswordValid && <span>*từ 6-32 kí tự, không chứa khoẳng trắng</span>}
        <input
          className={isPasswordValid ? '' : 'invalid'}
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!isRePasswordValid && <span>*mật khẩu nhập lại không chính xác</span>}
        <input
          className={isRePasswordValid ? '' : 'invalid'}
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />

        {!isFirstNameValid && <span>*tên không hợp lệ</span>}
        <input
          className={isFirstNameValid ? '' : 'invalid'}
          type="text"
          placeholder="Họ Lót"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        {!isLastNameValid && <span>*tên không hợp lệ</span>}
        <input
          className={isLastNameValid ? '' : 'invalid'}
          type="text"
          placeholder="Tên"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <div className="gender">
          <input
            type="radio"
            id="male"
            name="gender"
            checked={!isFemale}
            onChange={() => setIsFemale(false)}
          />
          <label htmlFor="male">Nam</label>

          <input
            type="radio"
            id="female"
            name="gender"
            checked={isFemale}
            onChange={() => setIsFemale(true)}
          />
          <label htmlFor="female">Nữ</label>
        </div>

        <button className="submit" onClick={handleRegister}>
          Đăng ký
        </button>

        <p style={{ margin: '10px 0' }}>
          Đã có tài khoản!{' '}
          <span style={{ color: 'blue', cursor: 'pointer' }} onClick={onLoginClick}>
            Đăng nhập
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
