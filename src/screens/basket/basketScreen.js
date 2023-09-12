import React, { useContext, useState } from "react";
import { Header } from "../../components/header/header";
import { basketContext } from "../../providers/basketProvider/basketProvider";
import "./basketScreen.css";
import { SendManagerModal } from "./sendManagerModal/sendManagerModal";

export function BasketScreen() {
  const {
    basket,
    deleteItem,
    incrementItemCount,
    decrementItemCount,
    clearAllBasket,
    setItemCount,
    checkItemCount
  } = useContext(basketContext);

  const [isOpenModal, setOpenModal] = useState(false);

  const handleChangeCount = e => {
    const newCount = +e.target.value;
    const id = e.target.name;
    setItemCount(id, newCount);
  };

  const handleBlurCount = e => {
    const id = e.target.name;
    console.log(id);
    checkItemCount(id);
  };

  return (
    <div>
      <Header />
      <div className="basketPage">
        {Boolean(basket.length) && (
          <div className="basketButtonBlock">
            <button className="clearButton" onClick={clearAllBasket}>
              Clear Basket
            </button>
            <button
              className="sendManagerButton"
              onClick={() => setOpenModal(true)}
            >
              Send To Manager
            </button>
          </div>
        )}
        <p className="basketTitle">
          Your basket {!Boolean(basket.length) && "is empty!!!"}
        </p>
        <div className="basketList">
          {basket.map(item => (
            <div key={item.id} className="basketItem">
              <img src={item.image} className="basketImage" />
              <div className="basketContent">
                <div className="basketTitleBlock">
                  <span>{item.code}</span>
                  <span>size: {item.size}</span>
                  <span>color: {item.color}</span>
                </div>

                <div className="basketButtonBlock">
                  <button
                    className="buttons"
                    onClick={() => decrementItemCount(item.id)}
                  >
                    -
                  </button>
                  <input
                    className="inputField basketItemCount"
                    value={item.count}
                    name={item.id}
                    type="number"
                    onBlur={handleBlurCount}
                    onChange={handleChangeCount}
                  />
                  <button
                    className="buttons"
                    onClick={() => incrementItemCount(item.id)}
                  >
                    +
                  </button>
                  <button
                    className="buttons"
                    onClick={() => deleteItem(item.id)}
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SendManagerModal
        isOpen={isOpenModal}
        onClick={() => setOpenModal(false)}
      />
    </div>
  );
}
