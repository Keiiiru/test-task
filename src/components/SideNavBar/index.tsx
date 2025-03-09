import { Stack } from "@mui/material";
import "./index.sass";
import PlatesIcon from "../../assets/icons/PlatesIcon";
import ArrowDownIcon from "../../assets/icons/ArrowDownIcon";

const SideNavBar = () => {
  return (
    <nav className="side-navigation">
      <div className="top-navigation__item">
        <div className="text">
          <span className="text-header">Название проекта</span>
          <span className="text-subtext">Аббревиатура</span>
        </div>
        <ArrowDownIcon />
      </div>
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <div className="side-navigation__item">
          <PlatesIcon />
          <span>По проекту</span>
        </div>
        <div className="side-navigation__item active">
          <PlatesIcon />
          <span>CMP</span>
        </div>
      </Stack>
    </nav>
  );
};

export default SideNavBar;
