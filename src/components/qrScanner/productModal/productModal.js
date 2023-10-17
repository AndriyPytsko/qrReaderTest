import React, { useEffect, useState } from "react";
import "./productModal.css";
import { apiProduct } from "../../../api/api.product";
import { MenuItem, Select } from "@mui/material";

export function ProductModal(props) {
  const { code, onClick, onClose } = props;

  const [productInfo, setProductInfo] = useState(null);
  const [errorState, setErrorState] = useState(false);

  useEffect(() => {
    if (code) getProductInfo(code);
  }, [code]);

  const getProductInfo = async (code) => {
    const dataInfo = await apiProduct.getProductInfo(code);
    const dataImage = await apiProduct.getProductImage(code);
    const colors = [...new Set(dataInfo.map((item) => item.productColorName))];
    const defaultProduct = dataInfo.find(
      (item) => item.productColorName === colors[0] && !item.restricted
    );
    setProductInfo({
      images: dataImage.map((item) => item.url),
      info: dataInfo,
      colors,
      activeColor: colors[0],
      activeProducts: defaultProduct ? [defaultProduct] : [],
    });
  };

  const handleChangeColor = (e) => {
    const activeColor = e.target.value;
    setProductInfo((prevState) => ({
      ...prevState,
      activeColor,
      activeProducts: [],
    }));
  };

  const handleChangeSize = (isActive, newProduct) => {
    if (!isActive && newProduct.restricted) {
      setErrorState(true);
      return;
    }
    setProductInfo((prevState) => {
      const activeProducts = isActive
        ? [
            ...prevState.activeProducts.filter(
              (item) => item.productSizeName !== newProduct.productSizeName
            ),
          ]
        : [...prevState.activeProducts, newProduct];
      return {
        ...prevState,
        activeProducts: !activeProducts.length
          ? prevState.activeProducts
          : activeProducts,
      };
    });
  };

  if (!code) return null;

  return (
    <div className="productModalWrapper">
      <div className="productModalContainer">
        {productInfo ? (
          <>
            <img className="productModalImage" src={productInfo.images[0]} />
            <div className="productModalColors">
              <span>Color: </span>
              <Select
                onChange={handleChangeColor}
                id="select"
                value={productInfo.activeColor}
              >
                {productInfo.colors.map((color) => (
                  <MenuItem key={color} value={color}>
                    {color}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="productModalSizes">
              {productInfo.info
                .filter(
                  (item) => item.productColorName === productInfo.activeColor
                )
                .map((item) => {
                  const newSize = item.productSizeName;
                  const isActive = productInfo.activeProducts.find(
                    (product) => product.productSizeName === newSize
                  );
                  return (
                    <span
                      className={`productSizeChip 
                      ${item.quantityInStock ? "inStock" : ""}
                      ${item.quantityInProduction ? "inProd" : ""}
                      ${
                        !item.quantityInProduction && !item.quantityInStock
                          ? "inOrder"
                          : ""
                      }
                      ${isActive ? "productSizeChipActive" : ""} 
                      `}
                      key={newSize}
                      onClick={() => handleChangeSize(isActive, item)}
                    >
                      {newSize}
                    </span>
                  );
                })}
            </div>
            <div className="productModalButtonContainer">
              <button
                disabled={!productInfo.activeProducts.length}
                onClick={() =>
                  onClick(productInfo.activeProducts, productInfo.images[0])
                }
                className="productModalButton"
              >
                Add to basket
              </button>
              <button onClick={onClose} className="productModalButton">
                Close
              </button>
            </div>
          </>
        ) : (
          <div className="loadingModal">Loading...</div>
        )}
        {errorState && (
          <div className="disableProductModalWrapper">
            <div className="disableProductModal">
              <div className="disableProductModalText">
                Please contact the office to be able to order this dress
              </div>
              <button
                onClick={() => setErrorState(false)}
                className="productModalButton"
              >
                Ok
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
