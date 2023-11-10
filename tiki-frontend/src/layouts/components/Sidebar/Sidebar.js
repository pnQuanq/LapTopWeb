import React from "react";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import Menu, { MenuItem } from "./Menu";
import config from "../../../config";
import { AiOutlineLaptop } from "react-icons/ai";
import { SiYoutubegaming } from "react-icons/si";
import { FaComputer, FaDisplay, FaHeadphonesSimple } from "react-icons/fa6";
import { BsCpu, BsController } from "react-icons/bs";

const cx = classNames.bind(styles);

const Sidebar = () => {
  return (
    <aside className={cx("wrapper")}>
      <Menu>
        <MenuItem
          title="Laptop"
          to={config.routes.laptop}
          icon={<AiOutlineLaptop size="32px" />}
        />
        <MenuItem
          title="Laptop Gaming"
          to={config.routes.laptopgaming}
          icon={<SiYoutubegaming size="32px" />}
        />
        <MenuItem
          title="PC Gaming"
          to={config.routes.pcgaming}
          icon={<FaComputer size="32px" />}
        />
        <MenuItem
          title="PC làm việc"
          to={config.routes.pclamviec}
          icon={<FaComputer size="32px" />}
        />
        <MenuItem
          title="Linh kiện PC"
          to={config.routes.linhkienpc}
          icon={<BsCpu size="32px" />}
        />
        <MenuItem
          title="Màn hình"
          to={config.routes.manhinh}
          icon={<FaDisplay size="32px" />}
        />
        <MenuItem
          title="Tai Nghe - Loa"
          to={config.routes.tainghevloa}
          icon={<FaHeadphonesSimple size="32px" />}
        />
        <MenuItem
          title="Phụ kiện"
          to={config.routes.phukien}
          icon={<BsController size="32px" />}
        />
      </Menu>
    </aside>
  );
};

export default Sidebar;
