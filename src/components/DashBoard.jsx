import React, { useState, useEffect } from 'react';
import { Profile2User, Edit, CommandSquare } from 'iconsax-react';
import { db } from '../firebase/Firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function DashBoard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCommunities, setTotalCommunities] = useState(0);
  const [userData, setUserData] = useState([]);
  const [communityData, setCommunityData] = useState([]);
  const [showTable, setShowTable] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchCollectionData = async (collectionName) => {
          const collectionRef = collection(db, collectionName);
          const snapshot = await getDocs(collectionRef);
          return snapshot.docs.map((doc) => doc.data());
        };

        const usersData = await fetchCollectionData('Users');
        const communitiesData = await fetchCollectionData('Communities');

        setUserData(usersData);
        setCommunityData(communitiesData);
        setTotalUsers(usersData.length);
        setTotalCommunities(communitiesData.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsers();
  }, []);

  const ShowTable = (tableType) => {
    setShowTable(tableType);
    document.getElementById('my_modal_3').showModal();
  };

  return (
    <div className='flex flex-col'>
      <div className='px-10 py-10 flex flex-row space-x-8'>
        <button
          className='flex gap-2 p-4 w-72 h-48 bg-orange-400 rounded-3xl text-xl'
          onClick={() => ShowTable('Users')}
        >
          <span><Profile2User /></span>
          Users
          <p >{totalUsers}</p>
        </button>
        <button className='flex gap-2 p-4 w-72 h-48 bg-amber-400 rounded-3xl text-xl '>
          <span><Edit /></span>
          Posts
        </button>
        <button
          className='flex gap-2 p-4 w-72 h-48 bg-yellow-700 rounded-3xl text-xl'
          onClick={() => ShowTable('Communities')}
        >
          <span><CommandSquare /></span>
          Communities<p >{totalCommunities}</p>
        </button>
      </div>
      <dialog id='my_modal_3' className='modal rounded-2xl' >
        <div className='modal-box'>
          <form method='dialog'>
            {showTable === 'Users' && (
              <div className='px-5 py-5 m-3 '>
                <table>
                  <thead>
                    <tr>
                      <th className='border p-2'>Avatar</th>
                      <th className='border p-2'>Name</th>
                      <th className='border p-2'>Email</th>
                      <th className='border p-2'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((user, index) => (
                      <tr key={index} className='border p-2 '>
                        <td className='border p-2'>
                          {user.Avatar && (
                            <img
                              className='w-12 h-12 rounded-full'
                              src={user.Avatar}
                              alt='Avatar'
                            />
                          )}
                        </td>
                        <td className='border p-2'>{`${user?.['First Name']} ${user?.['Last Name']}`}</td>
                        <td className='border p-2'>{user?.Email}</td>
                        <td className='border p-2'>Enable/Disable</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {showTable === 'Communities' && (
              <div className='px-5 py-5 m-3 '>
                <table>
                  <thead>
                    <tr>
                      <th className='border p-2'>Community Logo</th>
                      <th className='border p-2'>Community Title</th>
                      <th className='border p-2'>Members</th>
                    </tr>
                  </thead>
                  <tbody>
                    {communityData.map((communityData, index) => (
                      <tr key={index} className='border p-2 '>
                        <td className='border p-2'>
                          {communityData?.['Community Logo URL'] && (
                            <img
                              className='w-12 h-12 rounded-full'
                              src={communityData?.['Community Logo URL']}
                              alt='Community Logo'
                            />
                          )}
                        </td>
                        <td className='border p-2'>{communityData?.['Community Name']}</td>
                        <td className='border p-2'>Members Names</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 '>
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
