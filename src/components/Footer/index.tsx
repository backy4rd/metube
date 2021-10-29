import React from 'react';
import { Facebook, GitHub, LinkedIn, Twitter } from '@mui/icons-material';

import Logo from '@components/Logo';

import './Footer.css';

function Footer() {
  return (
    <div className="Footer">
      <div className="Footer__Table">
        <div className="Footer__Table__Col1">
          <Logo />
          <p>
            Zoo là một mạng xã hội phát trực tiếp và đăng tải nội dung video. Xem cách những người
            khác thể hiện tài năng của họ và cả cuộc sống của người dùng. Gặp gỡ những người mới,
            trò chuyện, khám phá, xem, đăng tải video. Mục tiêu của Zoo là xây dựng một môi trường
            để mọi người có thể kết nối với nhau qua video.
          </p>
          <div className="Footer__Table__Col1-Contact">
            <a href="https://www.facebook.com/NQK.Endless" target="_blank" rel="noreferrer">
              <Facebook />
            </a>
            <a href="https://github.com/backy4rd" target="_blank" rel="noreferrer">
              <GitHub />
            </a>
            <a
              href="https://www.linkedin.com/in/nguy%E1%BB%85n-kh%E1%BA%A3i-a549191a7"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedIn />
            </a>
            <a href="https://twitter.com/NguynKh34485285" target="_blank" rel="noreferrer">
              <Twitter />
            </a>
          </div>
        </div>
        <div className="Footer__Table__Col2">
          <p>THÔNG TIN LIÊN HỆ:</p>
          <p>Trường Đại học Cần Thơ (Can Tho University)</p>
          <p>Khu II, đường 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. Cần Thơ.</p>
          <p>Điện thoại: +84337407759</p>
          <p>Email: khaib11809136@student.ctu.edu.vn</p>
        </div>
      </div>

      <div className="Footer__Slogan">
        Zoo © 2021 zootube-frontend.herokuapp.com. All rights Reserved.
      </div>
    </div>
  );
}

export default Footer;
