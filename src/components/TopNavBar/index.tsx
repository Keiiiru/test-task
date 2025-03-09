import "./index.sass";
import MenuIcon from "../../assets/icons/MenuIcon";
import ReplyIcon from "../../assets/icons/ReplyIcon";

const TopNavBar = () => {
  return (
    <nav className="top-navigation">
      <div className="top-navigation__top">
        <button className="top-navigation__buttons">
          <MenuIcon />
        </button>

        <button className="top-navigation__buttons">
          <ReplyIcon />
        </button>

        <button className="top-navigation__switchers switchers-top-active">
          Просмотр
        </button>

        <button className="top-navigation__switchers">Управление</button>
      </div>
    </nav>
  );
};

export default TopNavBar;
