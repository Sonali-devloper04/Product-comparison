import { Link } from 'react-router-dom';


const Sidebar = () => {
    return (
        <div className="side-menu" style={{ width: '280px', height: '100vh', background: 'rgb(6, 11, 38)', padding: '20px' , marginTop : '4px', color: '#fff'}}>
      <ul>
        <li><Link to="/">Our Products</Link></li>
        <li><Link to="/compare">Compare Products</Link></li>
      </ul>
    </div>
    );

};
export default Sidebar;