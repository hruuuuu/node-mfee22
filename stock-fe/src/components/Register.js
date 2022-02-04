import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/config.js';
import { ERR_MSG } from '../utils/error.js';

const Register = () => {
  const [member, setMember] = useState({
    email: 'email@email.com',
    name: 'allie',
    password: 'pass1234',
    confirmPassword: 'pass1234',
    photo: '',
  });
  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      /* 1. 沒有圖片上傳的做法
        let response = await axios.post(`${API_URL}/auth/register`, member);
        console.log(response.data);
        */
      // 2. 有圖片上傳的作法 用formData
      let formData = new FormData();
      formData.append('email', member.email);
      formData.append('name', member.name);
      formData.append('password', member.password);
      formData.append('confirmPassword', member.confirmPassword);
      formData.append('photo', member.photo);
      let response = await axios.post(`${API_URL}/auth/register`, formData);
      console.log(response.data);
    } catch (error) {
      console.error('error', error.response.data);
      console.log('註冊', ERR_MSG[error.response.data.code]);
    }
  };
  return (
    <form className="bg-purple-100 h-screen md:h-full md:my-20 md:mx-16 lg:mx-28 xl:mx-40 py-16 md:py-8 px-24 text-gray-800 md:shadow md:rounded flex flex-col md:justify-center">
      <h2 className="flex justify-center text-3xl mb-6 border-b-2 pb-2 border-gray-300">
        註冊帳戶
      </h2>
      <div className="mb-4 text-2xl">
        <label htmlFor="email" className="flex mb-2 w-32">
          Email
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="text"
          id="email"
          name="email"
          value={member.email}
          onChange={(e) => {
            setMember({ ...member, email: e.target.value });
          }}
        />
      </div>
      <div className="mb-4 text-2xl">
        <label htmlFor="name" className="flex mb-2 w-32">
          姓名
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="text"
          id="name"
          name="name"
          value={member.name}
          onChange={(e) => {
            setMember({ ...member, name: e.target.value });
          }}
        />
      </div>
      <div className="mb-4 text-2xl">
        <label htmlFor="password" className="flex mb-2 w-16">
          密碼
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="password"
          id="password"
          name="password"
          value={member.password}
          onChange={handleChange}
        />
      </div>
      <div className="mb-8 text-2xl">
        <label htmlFor="password" className="flex mb-2 w-32">
          確認密碼
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={member.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <div className="mb-8 text-2xl">
        <label htmlFor="photo" className="flex mb-2 w-32">
          圖片
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="file"
          id="photo"
          name="photo"
          onChange={(e) => {
            //圖片儲存是存在e.target.files
            setMember({ ...member, photo: e.target.files[0] });
          }}
        />
      </div>
      <button
        className="text-xl bg-indigo-300 px-4 py-2.5 rounded hover:bg-indigo-400 transition duration-200 ease-in"
        onClick={handleSubmit}
      >
        註冊
      </button>
    </form>
  );
};

export default Register;
