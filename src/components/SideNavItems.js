import * as React from 'react';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
//import ListSubheader from '@mui/material/ListSubheader';
import HomeIcon from '@mui/icons-material/Home';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CreateListIcon from '@mui/icons-material/PostAdd';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
//import { useNavigate } from 'react-router-dom';

export default function ListItems({setMenuData}) {
  const [open, setOpen] = React.useState(true);
  const [open2, setOpen2] = React.useState(true);
  const handleClick1 = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  }
  //const navigate = useNavigate();

  return (
  <React.Fragment>
    {/*onClick={() => {navigate("/")}}*/}
    <ListItemButton onClick={() => setMenuData("Home")}>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Trang chủ" />
    </ListItemButton>

    <ListItemButton onClick={() => setMenuData("PackageForm")}>
      <ListItemIcon>
        <LocalPostOfficeIcon />
      </ListItemIcon>
      <ListItemText primary="Ghi nhận hàng gửi" />
    </ListItemButton>
    
    <ListItemButton onClick={handleClick1}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Điểm tập kết" />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
          <ListItemButton sx={{ pl: 4 }} onClick={() => setMenuData("TransToTKform")}>
            <ListItemIcon>
              <CreateListIcon />
            </ListItemIcon>
            <ListItemText primary="Tạo đơn chuyển hàng" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => setMenuData("TKconfirm")}>
            <ListItemIcon>
              <ChecklistIcon />
            </ListItemIcon>
            <ListItemText primary="Xác nhận hàng về"/>
          </ListItemButton>
    </Collapse>

    <ListItemButton onClick={handleClick2}>
      <ListItemIcon>
        <LocalShippingIcon />
      </ListItemIcon>
      <ListItemText primary="Giao hàng"/>
      {open2 ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={open2} timeout="auto" unmountOnExit>
          <ListItemButton sx={{ pl: 4 }} onClick={() => setMenuData("ShippingForm")}>
            <ListItemIcon>
              <CreateListIcon />
            </ListItemIcon>
            <ListItemText primary="Tạo đơn giao hàng" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => setMenuData("ShippingConfirm")}>
            <ListItemIcon>
              <ChecklistIcon />
            </ListItemIcon>
            <ListItemText primary="Xác nhận trạng thái"/>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => setMenuData("ShippingStatistics")}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Thống kê" />
          </ListItemButton>
    </Collapse>
    
  </React.Fragment>
  );
}

