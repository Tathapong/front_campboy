import { useEffect, useState, memo, useCallback } from "react";
import { useClickOutSide } from "../../hooks/useClickOutside";
import { useSelector } from "react-redux";
import { selectMe } from "../../stores/myUserSlice";

function NavbarTab(props) {
  const { list = [], value, setValue } = props;
  const [openDropdown, setOpenDropdown] = useState(false);

  const myUser = useSelector(selectMe);
  const navList = myUser ? list : list.slice(0, 2);
  const dropdownEl = useClickOutSide(useCallback(() => setOpenDropdown(false), []));

  useEffect(() => {
    setValue(list[0]?.value);
  }, []);

  function handleOnChangeTab(value) {
    setValue(value);
  }

  function handleToggleDropdown() {
    setOpenDropdown((prev) => !prev);
  }

  return (
    <div className="navbar-tab-menu">
      <ul className="list-group">
        {navList.map((item) => (
          <li
            key={item.id}
            className={`list-item ${value === item.value ? "active" : ""}`}
            onClick={() => handleOnChangeTab(item.value)}
          >
            {item?.name}
          </li>
        ))}
      </ul>

      <ul className="list-group list-group-mobile">
        {navList.slice(0, 2).map((item) => (
          <li
            key={item.id}
            className={`list-item ${value === item.value ? "active" : ""}`}
            onClick={() => handleOnChangeTab(item.value)}
          >
            {item.name}
          </li>
        ))}

        {navList.length > 2 ? (
          <li className="list-item" onClick={handleToggleDropdown} ref={dropdownEl}>
            ...
            <ul className={`list-dropdown-group ${openDropdown ? "d-block" : "d-none"}`}>
              {navList.slice(2).map((item) => (
                <li
                  key={item.id}
                  className={`dropdown-item ${value === item.value ? "active" : ""}`}
                  onClick={() => handleOnChangeTab(item.value)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}

export default memo(NavbarTab);
