import { useState } from "react";
import axios from "axios";
import { ImCross } from "react-icons/im";

function Shopping() {
  const [shoppingList, setShoppingList] = useState([]);
  const [searchItem, setSearchItem] = useState([]);
  const [selected, setSelected] = useState([]);

  const onChangeHandler = async (e) => {
    if (e.target.value.length >= 2) {
      const list = await axios.get(
        `https://api.frontendeval.com/fake/food/${e.target.value}`
      );
      setSearchItem(list.data);
      console.log(list.data);
      console.log(e.target.value);
    } else {
      setSearchItem([]);
      return;
    }
  };

  const onClickHandler = (e, idx) => {
    let array = [...shoppingList];
    array.push(searchItem[idx]);

    let bool_array = [...selected];
    bool_array.push(false);

    setShoppingList(array);
    setSelected(bool_array);
  };

  const handleCheckboxChange = (e, idx) => {
    let bool_array = [...selected];
    if (e.target.checked) {
      console.log("checked");
      bool_array[idx] = true;
    } else {
      console.log("notChecked");
      bool_array[idx] = false;
    }
    setSelected(bool_array);
  };

  const onCrossHandler = (e, deleteIdx) => {
    setShoppingList((shoppingList) =>
      shoppingList.filter((_, idx) => idx != deleteIdx)
    );
    setSelected((selected) => selected.filter((_, idx) => idx != deleteIdx));

  };

  return (
    <div>
      <input
        type="text"
        onChange={onChangeHandler}
        autoFocus
        className="p-2 font-semibold bg-zinc-200 m-5"
      />
      {searchItem.map((item, idx) => {
        return (
          <div
            key={idx}
            onClick={(e) => onClickHandler(e, idx)}
            className="m-5 hover:cursor-pointer"
          >
            {item}
          </div>
        );
      })}
      {/* <hr /> */}
      {shoppingList.map((item, idx) => {
        return (
          <div className="flex w-[30rem] justify-between items-center px-10" key={idx}>
            <div className="flex items-center gap-5">
              <input
                type="checkbox"
                key={idx}
                onChange={(e) => handleCheckboxChange(e, idx)}
                className="hover:cursor-pointer"
                value={checked[idx]}
              />
              {selected[idx] === false ? (
                <div>{item}</div>
              ) : (
                <div className="text-gray-400 line-through">{item}</div>
              )}
            </div>
            <div
              onClick={(e) => onCrossHandler(e, idx)}
              className="hover:cursor-pointer"
            >
              <ImCross />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Shopping;
