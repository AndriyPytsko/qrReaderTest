import React, { useContext, useState } from "react";
import "./sendManagerModal.css";
import { apiProduct } from "../../../api/api.product";
import { basketContext } from "../../../providers/basketProvider/basketProvider";
import { apiCart } from "../../../api/api.cart";
import {sessionContext} from "../../../providers/sessionProvider/sessionProvider";

export function SendManagerModal(props) {
  const { isOpen, onClick } = props;

  const { session } = useContext(sessionContext);
  const { basket, clearAllBasket } = useContext(basketContext);
  const [isSuccess, setSuccess] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  const transformBasket = (basket) => {
    return {
      basket: basket.map((product) => ({
        id: product.productId,
        size: product.sizeId,
        color: product.colorId,
        count: product.count,
      })),
    };
  };

  const onSubmit = async () => {
    setDisabled(true);
    try {
      const response = await Promise.all([
        apiProduct.sendBasket({ basket, email: session.email }),
        apiCart.sendBasket(transformBasket(basket)),
      ]);
      if (response) {
        clearAllBasket();
        setSuccess(true);
      }
    } catch (e) {
      console.info(e);
    } finally {
      setDisabled(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="infoModalWrapper">
      {!isSuccess ? (
        <div className="infoModalContainer">
          <p className="basketModalTitle">Send all items to your shopping cart on the website?</p>
            <div className="basketSubmitBlock">
              <button
                disabled={isDisabled}
                onClick={onSubmit}
                className="infoModalButton"
              >
                {isDisabled ? "..." : "SEND"}
              </button>
              <button onClick={onClick} className="infoModalButton">
                CLOSE
              </button>
            </div>
        </div>
      ) : (
        <div className="infoModalContainer">
          <p className="basketModalTitle">Order received</p>
          <button onClick={onClick} className="infoModalButton">
            OK
          </button>
        </div>
      )}
    </div>
  );
}
