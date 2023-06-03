import { useEffect, useState } from "react";
import { useClickOutSide } from "../../hooks/useClickOutside";

function NavbarTab(props) {
  const { list = [], value, setValue } = props;
  const [openDropdown, setOpenDropdown] = useState(false);

  const dropdownEl = useClickOutSide(() => setOpenDropdown(false));

  useEffect(() => setValue(list[0]?.value), []);

  function onChangeTab(value) {
    setValue(value);
  }

  function toggleDropdown() {
    setOpenDropdown((prev) => !prev);
  }

  return (
    <div className="navbar-tab-menu">
      <ul className="list-group">
        {list.map((item) => (
          <li className={`list-item ${value === item.value ? "active" : ""}`} onClick={() => onChangeTab(item.value)}>
            {item?.name}
          </li>
        ))}
      </ul>
      {list.length > 2 ? (
        <ul className="list-group list-group-mobile">
          {list.slice(0, 2).map((item) => (
            <li className={`list-item ${value === item.value ? "active" : ""}`} onClick={() => onChangeTab(item.value)}>
              {item.name}
            </li>
          ))}

          <li className="list-item" onClick={toggleDropdown}>
            ...
            <ul className={`list-dropdown-group ${openDropdown ? "d-block" : "d-none"}`} ref={dropdownEl}>
              {list.slice(2).map((item) => (
                <li
                  className={`dropdown-item ${value === item.value ? "active" : ""}`}
                  onClick={() => onChangeTab(item.value)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}

export default NavbarTab;
