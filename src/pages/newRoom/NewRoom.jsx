import './newRoom.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/ownnav/Navbar';
import { useState } from 'react';
import { roomInputs } from '../../formSource';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import { REACT_APP_BASE_URL } from "../../URLData";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);

  const { data, loading } = useFetch(`${REACT_APP_BASE_URL}/home`);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(',').map((room) => ({ number: room }));
    try {
      await axios.post(
        `${REACT_APP_BASE_URL}/room/${hotelId}`,
        { ...info, roomNumbers },
        {
          headers: {
            ownerauth: JSON.parse(localStorage.getItem('ownerauth')),
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info);
  return (
    <div className='new'>
      <Sidebar />
      <div className='newContainer'>
        <Navbar />
        <div className='top'>
          <h1>Add New Room</h1>
        </div>
        <div className='bottom'>
          <div className='right'>
            <form>
              {roomInputs.map((input) => (
                <div className='formInput' key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className='formInput'>
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder='give comma between room numbers.'
                />
              </div>
              <div className='formInput'>
                <label>Choose a hotel</label>
                <select
                  id='hotelId'
                  onChange={(e) => setHotelId(e.target.value)}>
                  {loading
                    ? 'loading'
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
