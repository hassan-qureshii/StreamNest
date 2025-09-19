import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/Feed/Feed'
import { useState } from 'react';
import './Home.css'
import 'antd/dist/reset.css';


const Home = () => {
  const [category, setCategory] = useState(0);
  
  return (
   <div className='home'>
    <Sidebar category={category} setCategory={setCategory} />
    <Feed category={category}/>
   </div>
  )
}

export default Home
