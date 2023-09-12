import React, { useContext, useState } from "react";
import "./sendManagerModal.css";
import { apiProduct } from "../../../api/api.product";
import { basketContext } from "../../../providers/basketProvider/basketProvider";

const INITIAL_STATE = {
  email: "",
  retailer_name: "",
  company_name: "",
};

export function SendManagerModal(props) {
  const { isOpen, onClick } = props;

  const { basket, clearAllBasket } = useContext(basketContext);
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [isSuccess, setSuccess] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  const handleChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    setDisabled(true);
    e.stopPropagation();
    e.preventDefault();
    try {
      const response = await apiProduct.sendBasket({ ...formState, basket });
      if (response) {
        setFormState(INITIAL_STATE);
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
          <p className="basketModalTitle">Enter your info</p>
          <form className="basketForm" onSubmit={onSubmit}>
            <input
              className="inputField"
              placeholder="Your e-mail*"
              name="email"
              pattern="[a-z0-9._%+-.]+@[a-z0-9.-.]+.[a-z]{2,4}$"
              type="email"
              required
              value={formState.email}
              onChange={handleChange}
            />
            <input
              className="inputField"
              placeholder="Your name*"
              name="retailer_name"
              required
              maxLength={50}
              value={formState.retailer_name}
              onChange={handleChange}
            />
            <input
              className="inputField"
              placeholder="Your company name*"
              name="company_name"
              required
              maxLength={50}
              value={formState.company_name}
              onChange={handleChange}
            />
            <div className="basketSubmitBlock">
              <button
                disabled={isDisabled}
                type="submit"
                className="infoModalButton"
              >
                {isDisabled ? "..." : "SEND"}
              </button>
              <button onClick={onClick} className="infoModalButton">
                CLOSE
              </button>
            </div>
          </form>
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
