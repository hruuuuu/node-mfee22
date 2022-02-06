import React from 'react';
//import axios from 'axios';
//import { API_URL } from '../utils/config.js';

import { IMAGE_URL } from '../utils/config';
import { useAuth } from '../context/auth';

const About = () => {
  const { member, setMember } = useAuth();
  // const [member, setMember] = useState(null);
  // useEffect(() => {
  //   let getMember = async () => {
  //     let response = await axios.get(`${API_URL}/member`, {
  //       withCredentials: true,
  //     });
  //     console.log(response.data);
  //   };
  //   getMember();
  // }, []);

  return (
    <div className="m-7">
      <h2 className="m-7 text-2xl text-gray-600">這裡是魚股市</h2>
      {member ? (
        <>
          <h3>Hi, {member.name}</h3>
          <img src={`${IMAGE_URL}${member.photo}`} alt="member" />
        </>
      ) : (
        <h3>請先登入</h3>
      )}
    </div>
  );
};

export default About;
